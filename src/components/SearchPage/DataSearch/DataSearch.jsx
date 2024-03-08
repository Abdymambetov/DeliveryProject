import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./DataSearch.module.scss";
//// imgs
import foods from "../../../assets/images/noneData/foodsss.png";
import star from "../../../assets/icons/star.svg";
import clock from "../../../assets/icons/clock.svg";
import kitchen from "../../../assets/icons/kitchen.svg";
import transport from "../../../assets/icons/transport.svg";
import check from "../../../assets/icons/check.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoodsOrders,
  changePathCatalog,
  changePositionFoods,
  changeSumDishes,
  changeSumOrdersFoods,
} from "../../../store/reducers/statesSlice";
import { chnageAlertText } from "../../../store/reducers/EditDataUser";
import DetailedEveryData from "../../DetailedPage/DetailedEveryData/DetailedEveryData";

const DataSearch = () => {
  const dispatch = useDispatch();
  const { typeSearch, dataSearchMain } = useSelector(
    (state) => state.requestFoodSlice
  );

  const addBucket = (data) => {
    dispatch(addFoodsOrders(data));
    dispatch(changeSumOrdersFoods());
    dispatch(changePositionFoods());
    dispatch(changeSumDishes());
    alertAddBucket();
    // clickProduct(data);
  };

  const alertAddBucket = () => {
    dispatch(
      chnageAlertText({
        text: "Продук был добавлен в корзину",
        backColor: "#ffc12e",
        state: true,
      })
    );
    setTimeout(() => {
      dispatch(
        chnageAlertText({
          text: "",
          backColor: "transparent",
          state: false,
        })
      );
    }, 1500);
  };

  // console.log(dataSearchMain, "dataSearchMain");

  const clickEstablishment = (name) => {
    dispatch(changePathCatalog(name));
    localStorage.setItem("pathCatalog", name);
  };

  const [everyProd, setEveryProd] = React.useState(false);
  const [idCounter, setIdCounter] = React.useState(1);
  const [dataEvery, setDataEvery] = useState({});

  const clickProduct = (data) => {
    setEveryProd(true);
    setDataEvery(data);
  };

  // console.log(typeSearch, "typeSearch");
  return (
    <div
      className={
        +typeSearch === 1 ? styles.alldataRestorans : styles.alldataFoods
      }
    >
      {dataSearchMain?.length !== 0 && (
        <>
          {typeSearch === 1
            ? dataSearchMain?.map((food) => (
                <NavLink
                  key={food.codeid}
                  // to={`/product/${food?.codeid}/${food?.establishment_name}/${food?.code_establishment}/${food?.code_category}`}
                  className={styles.everyData}
                  // onClick={() => clickEstablishment("Рестораны")}
                >
                  <div className={styles.imgs}>
                    {food?.photo ? (
                      <>
                        {food?.photo === "null" ? (
                          <img src={foods} alt="food" />
                        ) : (
                          <img src={food?.photo} alt="food" />
                        )}
                      </>
                    ) : (
                      // <img src={food.photo} alt="food" />
                      <img src={foods} alt="food" />
                    )}
                    {food?.logo && (
                      <img src={food?.logo} className={styles.logo} alt="" />
                    )}
                  </div>
                  <div className={styles.everyData__inner}>
                    <div className={styles.everyData__inner__mainBlock}>
                      <h4>{food.establishment_name}</h4>

                      <NavLink
                        to={`/product/${food?.codeid}/${food?.establishment_name}/${food?.code_establishment}/${food?.code_category}`}
                        onClick={() => clickEstablishment("Рестораны")}
                      >
                        Перейти
                      </NavLink>
                    </div>
                    <div className={styles.checkList}>
                      <div>
                        <img src={star} alt="*" />
                        <span>{food.rating || "4.5"}</span>
                        {/* <p>{food.quantity}</p> */}
                      </div>
                      <div className={styles.rating}>
                        <img src={clock} alt="time" />
                        <p>{`${food?.time?.[0]?.from_time_formatted} - ${food?.time?.[0]?.to_time_formatted}`}</p>
                      </div>
                    </div>
                    <div className={styles.checkList}>
                      <div>
                        <img src={kitchen} alt="kitchen" />
                        <p>{food.category_name}</p>
                      </div>
                      <div>
                        <img src={transport} alt="transport" />
                        <p>{food.price_dostavka} сом</p>
                      </div>
                    </div>
                    <div className={styles.checkList}>
                      <div>
                        <img src={check} alt="check" />
                        <p>{food.percent_stavka} сом</p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))
            : dataSearchMain?.map((food) => (
                <li key={food.codeid} onClick={() => setIdCounter(food.codeid)}>
                  {food?.status && (
                    <p
                      className={styles.types}
                      onClick={() => clickProduct(food)}
                    >
                      {food?.status}
                    </p>
                  )}
                  <div
                    className={styles.imgFood}
                    onClick={() => clickProduct(food)}
                  >
                    {food?.prod_photo ? (
                      <img src={food?.prod_photo} alt="временно" />
                    ) : (
                      <img src={foods} alt="временно" />
                    )}
                    {/* {food?.prod_photo ? (
                      // <img src={food?.prod_photo} alt="временно" />
                      // <div
                      //   style={{
                      //     backgroundImage: `url(${food?.prod_photo})`,
                      //     width: "100%",
                      //     height: "100%",
                      //     backgroundPosition: "center",
                      //     backgroundSize: "contain",
                      //     backgroundRepeat: "no-repeat",
                      //     backgroundColor: "#fff",
                      //     borderRadius: "8px 8px 0 0",
                      //   }}
                      // ></div>
                    ) : (
                      // <div
                      //   style={{
                      //     backgroundImage: `url(${food?.prod_photo})`,
                      //     width: "100%",
                      //     height: "100%",
                      //     backgroundPosition: "center",
                      //     backgroundSize: "contain",
                      //     backgroundRepeat: "no-repeat",
                      //     backgroundColor: "#fff",
                      //     borderRadius: "8px 8px 0 0",
                      //   }}
                      // ></div>
                    )} */}
                  </div>
                  <h6 onClick={() => clickProduct(food)}>
                    {food.product_name}
                  </h6>
                  <i>{food?.establishment_name}</i>
                  {/* <div style={{ padding: "0 5px" }}></div> */}
                  <div onClick={() => clickProduct(food)}>
                    <p>{food.product_price} сом</p>
                    <span>
                      {food.v_ves} {food.ves_name}
                    </span>
                  </div>
                  <button onClick={() => addBucket(food)}>Добавить</button>
                </li>
              ))}
        </>
      )}
      <>
        {/* ///// для детального просмотра каждого продукта */}
        <DetailedEveryData
          state={everyProd}
          changeState={setEveryProd}
          idCounter={idCounter}
          dataEvery={dataEvery}
        />
      </>
    </div>
  );
};

export default DataSearch;
