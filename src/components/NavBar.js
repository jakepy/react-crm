import React from "react";
import logo from '../images/crm-logo-png.png'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="logo"/>
      </div>
      <div className="logo-container">
        <div className="icon" onClick={() => navigate('/ticket')}>Ticket</div>
        <div className="icon" onClick={() => navigate('/')}>🢨</div>
      </div>
    </nav>
  );
};

export default NavBar;
