import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
/////////////img//////////////
import foods from "../../assets/images/noneData/foodsss.png";
import star from "../../assets/icons/star.svg";
import clock from "../../assets/icons/clock.svg";
import kitchen from "../../assets/icons/kitchen.svg";
import transport from "../../assets/icons/transport.svg";
import check from "../../assets/icons/check.svg";

import SliderMain from "../../components/SliderMain/SliderMain";
import RecomFoods from "../../components/DetailedPage/RecomFoods/RecomFoods";
import { useDispatch, useSelector } from "react-redux";
import PathToFiles from "../../components/PathToFiles/PathToFiles";
import {
  getEveryData,
  getEveryInnerData,
  getEveryInnerTypes,
} from "../../store/reducers/requestFoodSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id, name, estab, categ } = useParams();
  const { everyData } = useSelector((state) => state.requestFoodSlice);
  const { pathCatalog } = useSelector((state) => state.statesSlice);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getEveryInnerTypes(
        `http://kover-site.333.kg/get_product_categ_estab?estab_code=${id}`
      )
    );
    dispatch(getEveryData(`http://kover-site.333.kg/get_establishments/${id}`));
    dispatch(
      getEveryInnerData(
        `http://kover-site.333.kg/products?code_establishment=${estab}&code_category=${"0"}`
      )
    );
  }, []);

  // console.log(everyData, 'everyData');
  // console.log(pathCatalog, "pathCatalog");

  return (
    <div className={styles.producblock}>
      <div className={styles.producblock__path}>
        <PathToFiles estab={pathCatalog} name={name} />
      </div>

      <div className={styles.producblock__inner}>
        <div className={styles.mainContent}>
          <div className={styles.mainImg}>
            {everyData.photo !== "null" ? (
              <img src={everyData.photo} alt="food" />
            ) : (
              <img src={foods} alt="food" />
            )}
          </div>
          <div className={styles.mainText}>
            <div className="container">
              <div className={styles.mainContent__up}>
                <h4>{everyData.establishment_name}</h4>
                <img src={everyData?.logo} alt="logo" />
              </div>
              <div className={styles.mainContent__down}>
                <div className={styles.mainContent__downThree}>
                  <div>
                    <img src={star} alt="*" />
                    <p>{everyData.product_percent}4.1</p>
                    {/* <span>{everyData.quantity}</span> */}
                  </div>
                  <div className={styles.rating}>
                    <img src={clock} alt="time" />
                    <p>{`${everyData?.time?.[0]?.from_time_formatted} - ${everyData?.time?.[0]?.to_time_formatted}`}</p>
                  </div>
                  <div>
                    <img src={transport} alt="transport" />
                    <p>
                      {everyData.price_dostavka ? everyData.price_dostavka : 0}{" "}
                      сом
                    </p>
                  </div>
                </div>
                <div className={styles.mainContent__downTwo}>
                  <div>
                    <img src={check} alt="check" />
                    <p>
                      ~{everyData.percent_stavka ? everyData.percent_stavka : 0}
                      сом
                    </p>
                  </div>
                  <div>
                    <img src={kitchen} alt="kitchen" />
                    <p>{everyData.category_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.producblock__moreData}>
        <div className="container">
          <p>
            Фотографии товаров в приложении могут не соответствовать их виду в
            действительности
          </p>
          <b>
            ВНИМАНИЕ! Цена за услуги может варьироваться в зависимости от работы
            курьера, также существует доплата за пределы города.
          </b>
        </div>
      </div>
      <SliderMain />
      <RecomFoods estab={estab} categ={categ} />
    </div>
  );
};

export default ProductPage;
