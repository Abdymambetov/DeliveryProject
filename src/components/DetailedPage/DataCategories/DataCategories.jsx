import React from "react";
import styles from "./DataCategories.module.scss";
import { NavLink } from "react-router-dom";
import foods from "../../../assets/images/noneData/foodsss.png";
import star from "../../../assets/icons/star.svg";
import clock from "../../../assets/icons/clock.svg";
import kitchen from "../../../assets/icons/kitchen.svg";
import transport from "../../../assets/icons/transport.svg";
import check from "../../../assets/icons/check.svg";

const DataCategories = ({ allDataFood }) => {
  // console.log(allDataFood, 'allDataFood');
  return (
    <>
      <div className={styles.category}>
        {allDataFood?.length === 0 ? (
          <p className="noneData">Данных пока что нет</p>
        ) : (
          allDataFood?.map((food) => (
            <NavLink
              key={food.codeid}
              to={`/product/${food.codeid}/${food?.establishment_name}/${food?.code_establishment}/${food?.code_category}`}
              className={styles.everyData}
            >
              <div className={styles.imgs}>
                {food?.photo === "null" ? (
                  <img src={foods} alt="food" />
                ) : (
                  <img src={food.photo} alt="food" />
                )}
                <img src={food?.logo} className={styles.logo} alt="" />
                {food?.status && <p className={styles.types}>{food?.status}</p>}
              </div>
              <div className={styles.everyData__inner}>
                <h4>{food.establishment_name}</h4>
                <div>
                  <img src={star} alt="*" />
                  <span>{food.rating}</span>
                  <p>({food.count_rating})</p>
                </div>
                <div className={styles.rating}>
                  <img src={clock} alt="time" />
                  <p>{`${food?.time?.[0]?.from_time_formatted} - ${food?.time?.[0]?.to_time_formatted}`}</p>
                </div>
                <div>
                  <img src={kitchen} alt="kitchen" />
                  <p>{food.category_name}</p>
                </div>
                <div className={styles.checkList}>
                  <div>
                    <img src={transport} alt="transport" />
                    <p>{food.price_dostavka} сом</p>
                  </div>
                  <div>
                    <img src={check} alt="check" />
                    <p>{food.percent_stavka} сом</p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </>
  );
};

export default DataCategories;
