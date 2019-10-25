import React from 'react';

import logo from '../../assets/facebook.png'
import user from '../../assets/userdefault.png'


import './style.css'

function Header(){
  return(
    <div className="containerHeader">
      <img src={logo} alt="logo facebook" className="logoFaceHeader"/>
      <div className="profileContainerHeader"><span>Meu perfil</span> <img src={user} alt="user img" className="logoUserHeader"/></div>
    </div>
    )
}

export default Header;