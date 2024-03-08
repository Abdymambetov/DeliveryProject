import React from "react";
import SliderMain from "../../components/SliderMain/SliderMain";
import styles from "./MainPage.module.scss";
import MainContent from "../../components/MainPage/MainContent/MainContent";
import { useDispatch } from "react-redux";
import { getCategory } from "../../store/reducers/requestFoodSlice";
import NavSearch from "../../components/NavSearch/NavSearch";

const MainPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      getCategory(
        "http://kover-site.333.kg/get_estab_category?category_type=main"
      )
    );
    /// все категории (магазины,рестораны)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.mainBlock}>
      <NavSearch/>
      <SliderMain/>
      <MainContent/>
    </div>
  );
};

export default MainPage;
