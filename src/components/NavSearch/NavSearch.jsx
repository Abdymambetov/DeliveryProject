import React from "react";
import "./NavSearch.scss";
import searchImg from "../../assets/images/Main/searchBtn.svg";
import { useNavigate } from "react-router-dom";
import Contacts from "../AccountPage/Contacts/Contacts";

const NavSearch = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = React.useState(false);

  return (
    <>
      <div className="navSearch">
        <div className="container">
          <div className="navSearch__inner">
            <div className="navSearch__contacts">
              <button onClick={() => setContacts(true)}>Контакты</button>
            </div>
            {/* <div className="navSearch__logo">
            <img src={logo} alt="logo" />
          </div> */}
            <div
              className="navSearch__main"
              onClick={() => navigate("/search")}
            >
              <img src={searchImg} alt="searchImg" />
            </div>
          </div>
        </div>
      </div>
      <Contacts state={contacts} changeState={setContacts} />
    </>
  );
};

export default NavSearch;
