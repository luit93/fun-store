import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
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
    { icon: <LogoutRoundedIcon />, name: "Logout", func: logoutUser },
    { icon: <ListAltRoundedIcon />, name: "Orders", func: orders },
    { icon: <Person4RoundedIcon />, name: "Profile", func: account },
    
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
    navigate("/account")
}
function logoutUser(){
    dispatch(accountLogout())
    // alert.success("Logout successful !!!")
}

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="speed dial example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            className="speedDial-icon"
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
