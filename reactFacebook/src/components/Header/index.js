import React from 'react';
import { IconContext } from "react-icons";
import {FaUserCircle} from 'react-icons/fa';
import logo from '../../assets/facebook.png'
// import user from '../../assets/userdefault.png'


import './style.css'

function Header(){
  return(
    <div className="containerHeader">
      <img src={logo} alt="logo facebook" className="logoFaceHeader"/>
      <div className="profileContainerHeader">
        <span>Meu perfil</span> 
        <IconContext.Provider value={{ size: "1.5em" }}>
          <FaUserCircle />
        </IconContext.Provider>
      </div>
    </div>
    )
}

export default Header;