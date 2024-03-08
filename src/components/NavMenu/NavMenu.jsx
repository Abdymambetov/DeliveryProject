import React from "react";
import styles from "./NavMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { changePaginationCount } from "../../store/reducers/dataAllSlice";
import { useDispatch } from "react-redux";
///// menuImg
import main from "../../assets/icons/main.svg";
import search from "../../assets/icons/search.svg";
import categories from "../../assets/icons/categories.svg";
import order from "../../assets/icons/order.svg";
import account from "../../assets/icons/account.svg";
/// alt menuImg
import main1 from "../../assets/icons/menu/main.svg";
import search1 from "../../assets/icons/menu/search.svg";
import categories1 from "../../assets/icons/menu/categories.svg";
import order1 from "../../assets/icons/menu/order.svg";
import account1 from "../../assets/icons/menu/account.svg";

const NavMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [pages, setPages] = React.useState([
    {
      id: 1,
      title: "main",
      link: "/main",
      bool: false,
      img: main,
      imgAlt: main1,
    },
    {
      id: 2,
      title: "search",
      link: "/search",
      bool: false,
      img: search,
      imgAlt: search1,
    },
    {
      id: 3,
      title: "categories",
      link: "/categories",
      bool: false,
      img: categories,
      imgAlt: categories1,
    },
    {
      id: 4,
      title: "orders",
      link: "/orders",
      bool: false,
      img: order,
      imgAlt: order1,
    },
    {
      id: 5,
      title: "account",
      link: "/account",
      bool: false,
      img: account,
      imgAlt: account1,
    },
  ]);

  React.useEffect(() => {
    const newPage = pages.map((i) => {
      if (i.link === location.pathname) {
        return {
          ...i,
          bool: true,
        };
      } else {
        return {
          ...i,
          bool: false,
        };
      }
    });
    setPages(newPage);
  }, [location.pathname]);

  const trasition = () => {
    localStorage.setItem("paginationMain", 1);
    dispatch(changePaginationCount(1));
  };

  return (
    <ul className={styles.menu}>
      {pages?.map((i) => (
        <li key={i.id}>
          <NavLink to={i.link} onClick={trasition}>
            {i.bool ? (
              <img src={i.imgAlt} alt={"page"} />
            ) : (
              <img src={i.img} alt={"page"} />
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
