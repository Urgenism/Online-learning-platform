import React from "react";
import logo from "assets/img/logo.svg";
import profile from "assets/img/profile.png";
import "./Header.css";

const Header = () => {
  return (
    <div className='header'>
      <div className='header__logo'>
        <img src={logo} alt='logo' />
        <div className='header__brand-name img-fluid'>Classroom</div>
      </div>
      <div className='header__profile'>
        <img
          src={profile}
          alt='logo'
          className='header__profile-img img-fluid'
        />
      </div>
    </div>
  );
};

export default Header;
