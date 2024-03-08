import React from "react";
import "./Preloader.scss";
import logo from "../../assets/images/Logo.png";
import loader from "../../assets/images/Main/loader.png";

const Preloader = () => {
  return (
    <div className="preloader__container">
      <div>
        <div className="logoPreloader">
          <img src={logo} alt="Лого" />
        </div>
        <div className="preloader">
          <img src={loader} alt="loader" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
