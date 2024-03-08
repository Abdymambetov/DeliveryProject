import React from "react";
import ordering from "../../../assets/images/Main/ordering.svg";
import delivery from "../../../assets/images/Main/delivery.svg";
import styles from "./MainContent.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../Preloader/Preloader";
import {
  changeActiveType,
  changePathCatalog,
} from "../../../store/reducers/statesSlice";

// imgs
import products from "../../../assets/images/categories/Rectangle6.svg";
import myloMoika from "../../../assets/images/categories/Rectangle9.svg";
import zootovar from "../../../assets/images/categories/Rectangle10.svg";
import drinkAlc from "../../../assets/images/categories/alkogol.jpg";
import flowers from "../../../assets/images/categories/Rectangle11.svg";
import apteka from "../../../assets/images/categories/Rectangle14.svg";
import restorans from "../../../assets/images/categories/Rectangle15.svg";
import eighteen from "../../../assets/images/categories/Rectangle7.svg";
///

const MainContent = () => {
  const { allCategory } = useSelector((state) => state.requestFoodSlice);
  const dispatch = useDispatch();

  const clickEstablishment = (name) => {
    dispatch(changePathCatalog(name));
    localStorage.setItem("pathCatalog", name);
    dispatch(changeActiveType(0));
  };

  const arrImg = [
    apteka,
    flowers,
    products,
    myloMoika,
    zootovar,
    drinkAlc,
    eighteen,
  ];

  // console.log(allCategory, "allCategory");

  return (
    <div className={styles.mainContent}>
      <div className="container">
        <div className={styles.mainContent__inner}>
          <NavLink
            to={`/detailed/${"0"}/${"Рестораны"}`}
            className={styles.everyCategory}
            onClick={() => clickEstablishment("Рестораны")}
            style={{ backgroundImage: `url(${restorans})` }}
          >
            <h4>Рестораны</h4>
          </NavLink>
          {allCategory?.length === 0 ? (
            <Preloader />
          ) : (
            allCategory?.slice(1, 20)?.map((i, ind) => (
              <NavLink
                to={`/detailed/${i.codeid}/${i.category_name}`}
                key={i.codeid}
                className={styles.everyCategory}
                onClick={() => clickEstablishment(i?.category_name)}
                style={{ backgroundImage: `url(${arrImg[ind]})` }}
              >
                {/* <img src={arrImg[ind]} alt="категория" /> */}
                <h4>{i.category_name}</h4>
              </NavLink>
            ))
          )}
          <NavLink
            to={`/delivery`}
            className={styles.everyCategory}
            onClick={() => clickEstablishment("Курьерская доставка")}
          >
            <img src={delivery} alt="delivery" />
            <h4>Курьерская доставка</h4>
          </NavLink>
          <NavLink
            to={`/listorder`}
            className={styles.everyCategory}
            onClick={() => clickEstablishment("Доставка с гипермаркетов")}
          >
            <img src={ordering} alt="ordering" />
            <h4>Доставка с гипермаркетов</h4>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
