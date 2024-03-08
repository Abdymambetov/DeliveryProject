import React from "react";
import styles from "./CategoriesPage.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/reducers/requestFoodSlice";
import Preloader from "../../components/Preloader/Preloader";
import ordering from "../../assets/images/Main/ordering.svg";
import delivery from "../../assets/images/Main/delivery.svg";
import {
  changeActiveType,
  changePathCatalog,
} from "../../store/reducers/statesSlice";
import SliderMain from "../../components/SliderMain/SliderMain";
import NavSearch from "../../components/NavSearch/NavSearch";
// imgs
import restorans from "../../assets/images/categories/everyFood.svg";
import flowers from "../../assets/images/categories/Rectangle8.svg";
import apteka from "../../assets/images/categories/Rectangle7.svg";
import products from "../../assets/images/categories/Rectangle3.svg";
import myloMoika from "../../assets/images/categories/Rectangle9.svg";
import zootovar from "../../assets/images/categories/Rectangle10.svg";
import drinkAlc from "../../assets/images/categories/drinkSpirt.png";
///

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { allCategory } = useSelector((state) => state.requestFoodSlice);

  const arrImg = [
    apteka,
    flowers,
    products,
    myloMoika,
    zootovar,
    drinkAlc,
    apteka,
  ];

  React.useEffect(() => {
    dispatch(
      getCategory(
        "http://kover-site.333.kg/get_estab_category?category_type=main"
      )
    );
    window.scrollTo(0, 0);
  }, []);

  const clickEstablishment = (name) => {
    dispatch(changePathCatalog(name));
    localStorage.setItem("pathCatalog", name);
    dispatch(changeActiveType(0));
  };

  // console.log(allCategory, "allCategory");

  return (
    <>
      <div className={styles.caregoryBlock}>
        <NavSearch />
        <SliderMain />
        <div className="container">
          <div className={styles.caregoryBlock__inner}>
            <NavLink
              to={`/detailed/${"0"}/${"Рестораны"}`}
              className={styles.everyCategory}
              onClick={() => clickEstablishment("Рестораны")}
            >
              <h4>Рестораны</h4>
              <img src={restorans} alt="Рестораны" />
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
                >
                  <h4>{i.category_name}</h4>
                  <img src={arrImg[ind]} alt="категория" />
                </NavLink>
              ))
            )}
            <NavLink
              to={`/delivery`}
              className={styles.everyCategory}
              onClick={() => clickEstablishment("Курьерская доставка")}
            >
              <h4>Курьерская доставка</h4>
              <img src={delivery} alt="delivery" />
            </NavLink>
            <NavLink
              to={`/listorder`}
              className={styles.everyCategory}
              onClick={() => clickEstablishment("Доставка с гипермаркетов")}
            >
              <h4>Доставка с гипермаркетов</h4>
              <img src={ordering} alt="ordering" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
