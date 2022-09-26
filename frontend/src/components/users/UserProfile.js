import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UserProfile.css";
import Loader from "../layout/loader/Loader";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  accountLogin,
  accountRegister,
  clearAccountErrors,
} from "../../actions/accountAction";
import { NavLink, useNavigate } from "react-router-dom";
const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isLoading, isAuth } = useSelector((state) => state.account);
  const loginTab = useRef(null);
  const switcherTab = useRef(null);
  const registerTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("/Profile.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(accountLogin(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.set("name", name);
    newForm.set("email", email);
    newForm.set("password", password);
    newForm.set("avatar", avatar);
    dispatch(accountRegister(newForm));
  };

  const handleRegisterChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearAccountErrors());
    }
    if (isAuth) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuth, navigate]);
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shift-neutral");
      switcherTab.current.classList.remove("shift-right");

      registerTab.current.classList.remove("shift-neutral-form");
      loginTab.current.classList.remove("shift-left");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shift-right");
      switcherTab.current.classList.remove("shift-neutral");

      registerTab.current.classList.add("shift-neutral-form");
      loginTab.current.classList.add("shift-left");
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profile-container">
            <div className="profile-box">
              <div className="toggle-box">
                <div className="toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Log In</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="login-form"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="login-email">
                  <EmailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="login-password">
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <NavLink to="/password/forgot">Forgot Password?</NavLink>
                <input type="submit" value="Log In" className="login-btn" />
              </form>
              <form
                className="register-form"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="register-name">
                  <FaceOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="register-email">
                  <EmailOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="register-password">
                  <LockOpenOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div id="register-img">
                  <img src={avatarPreview} alt="avatar" />

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleRegisterChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="register-btn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserProfile;
