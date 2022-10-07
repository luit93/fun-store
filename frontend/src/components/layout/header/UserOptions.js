import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction,Backdrop } from "@mui/material";

// import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { accountLogout,getUserDetails } from "../../../actions/accountAction";
const UserOptions = ({ user }) => {
    const navigate=useNavigate()
    const alert = useAlert()
    const dispatch= useDispatch()
  const [open, setOpen] = useState(false);
  const speedDialOptions = [

    { icon: <ListAltRoundedIcon />, name: "Orders", func: orders },
    { icon: <Person4RoundedIcon />, name: "Profile", func: account },
    { icon: <LogoutRoundedIcon />, name: "Logout", func: logoutUser },
    
  ];

  if (user.user.role === "admin") {
    speedDialOptions.unshift({
      icon: <DashboardRoundedIcon />,
      name: "Dahboard",
      func: dashboard,
    });
  }
function dashboard(){
    navigate("/dashboard")
}
function orders(){
    navigate("/orders")
}
function account(){
    navigate("/profile")
}
function logoutUser(){
    dispatch(accountLogout())
    alert.success("Logout successful !!!")
}

  return (
    <Fragment>
      <Backdrop open={open}  style={{ zIndex: "10" }}/>
      <SpeedDial
        ariaLabel="speed dial example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction="down"
        style={{ zIndex: "11" }}
        className="speed-dial"
        open={open}
        icon={
          <img
            className="speed-dial-icon"
            src={user.user.avatar.url ? user.user.avatar.url : "./Profile.png"}
            alt="Profile"
          />
        }
      >
        {speedDialOptions.map(item =>(
            <SpeedDialAction
          icon={item.icon}
          key={item.name}
          tooltipTitle={item.name}
          onClick={item.func}
        />
        ))}
        
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
