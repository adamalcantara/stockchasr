import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
// import Login from "../LoginForm";
import AuthButton from "../AuthButton";
import { UserContext } from "../../utils/UserContext";
import Logo from "../../assets/logoblue.png"
import Ticker from '../Ticker'
//I want to add some basic inline styling here, even though we are bringing in styles
const buttonStyle = {
  marginRight: 10
};

function Nav() {

  const [user] = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    if (open && width > 991) {
      setOpen(false);
    }
    setWidth(window.innerWidth)
  };

  // const toggleNav = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    }
  }, [])


  return (
    <><Ticker />
    <nav className="navbar navbar-expand-lg mb-2">
      
      <div  id="navbarNav">
        {user.username ? <span className="userText text-white ml-3 pt-1" to="#">Hi {user.username} !</span> : ""}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ">
            {user.username ? "" :
              <Link style={buttonStyle} className="btn signBtn" to="/register">Sign Up</Link>
            }
            <AuthButton />
          </li>

        </ul>
      </div>
      <Link className="navbar-brand ml-auto" to="/" id="navbarlogo">
        <img src={Logo} id="logo" alt="navbar logo"/>
        </Link>
    </nav>
    </>
  );
}

export default Nav;
