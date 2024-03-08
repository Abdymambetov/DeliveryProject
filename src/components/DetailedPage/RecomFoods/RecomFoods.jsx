import React, { useState } from "react";
import { debounce } from "lodash";
import styles from "./RecomFoods.module.scss";
import OrderMenu from "../OrderMenu/OrderMenu";
import { useDispatch, useSelector } from "react-redux";
import TypesInnerData from "../TypesInnerData/TypesInnerData";
import {
  addFoodsOrders,
  changePositionFoods,
  changeSumDishes,
  changeSumOrdersFoods,
} from "../../../store/reducers/statesSlice";
import {
  getEveryInnerData,
  openMiniLoader,
  searchInnerFood,
} from "../../../store/reducers/requestFoodSlice";
import MiniPreloader from "../../MiniPreloader/MiniPreloader";
import DetailedEveryData from "../DetailedEveryData/DetailedEveryData";
import { chnageAlertText } from "../../../store/reducers/EditDataUser";

const RecomFoods = ({ estab, categ }) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [everyProd, setEveryProd] = React.useState(false);
  const [idCounter, setIdCounter] = React.useState(1);
  const { innerData } = useSelector((state) => state.requestFoodSlice);
  const { miniLoader } = useSelector((state) => state.accountSlice);

  const addBucket = (data) => {
    dispatch(addFoodsOrders(data));
    dispatch(changeSumOrdersFoods());
    dispatch(changePositionFoods());
    dispatch(changeSumDishes());
    alertAddBucket();
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
    }, 800);
  };

  const searchInput = debounce((text) => {
    dispatch(openMiniLoader());
    if (text === "") {
      dispatch(
        getEveryInnerData(
          `http://kover-site.333.kg/products?code_establishment=${estab}&code_category=0`
        )
      );
    } else {
      dispatch(searchInnerFood({ text: text?.toLocaleLowerCase(), estab }));
    }
  }, 800);

  const formRef = React.useRef(null);

  const searchInputBtn = (e) => {
    e.preventDefault();
    const inputValue = formRef.current.querySelector(
      'input[type="search"]'
    ).value;

    dispatch(openMiniLoader());
    if (inputValue === "") {
      dispatch(
        getEveryInnerData(
          `http://kover-site.333.kg/products?code_establishment=${estab}&code_category=0`
        )
      );
    } else {
      dispatch(
        searchInnerFood({ text: inputValue?.toLocaleLowerCase(), estab })
      );
    }
  };

  const [dataEvery, setDataEvery] = useState({});

  const clickProduct = (data) => {
    setEveryProd(true);
    setDataEvery(data);
  };

  // console.log(innerData, "innerData");
  return (
    <div className={styles.recomBLock}>
      <div className="container">
        <div className={styles.recomBLock__inner}>
          <h5>Меню</h5>
          <form ref={formRef} onSubmit={(e) => searchInputBtn(e)}>
            <input
              type="search"
              placeholder="Поиск блюд"
              onChange={(e) => {
                searchInput(e.target.value);
                setActiveType(0);
              }}
            />
            <button type="submit"></button>
          </form>
          <div>
            <TypesInnerData
              estab={estab}
              activeType={activeType}
              setActiveType={setActiveType}
            />
          </div>
          <ul>
            {miniLoader ? (
              <MiniPreloader />
            ) : (
              <>
                {innerData?.length === 0 ? (
                  <li className={styles.noneData}>Данных пока что нету</li>
                ) : (
                  innerData?.map((food) => (
                    <li
                      key={food.codeid}
                      onClick={() => setIdCounter(food.codeid)}
                    >
                      {food?.status && (
                        <p
                          className={styles.types}
                          onClick={() => clickProduct(food)}
                        >
                          {food?.status}
                        </p>
                      )}
                      <div className={styles.imgMain}>
                        <img
                          src={food?.photo}
                          alt="Еда"
                          onClick={() => clickProduct(food)}
                        />
                        {/* <div
                          style={{
                            backgroundImage: `url(${food?.photo})`,
                            width: "100%",
                            height: "100%",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: "#fff",
                            borderRadius: "8px 8px 0 0",
                            padding: "0px",
                          }}
                          onClick={() => clickProduct(food)}
                        ></div> */}
                      </div>
                      <h6 onClick={() => clickProduct(food)}>
                        {food.product_name}
                      </h6>
                      <div onClick={() => clickProduct(food)}>
                        <p>{food.product_price} сом</p>
                        <span>
                          {food.v_ves} {food.ves_name}
                        </span>
                      </div>
                      <button onClick={() => addBucket(food)}>Добавить</button>
                    </li>
                  ))
                )}
              </>
            )}
          </ul>
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
      </div>
      <OrderMenu />
    </div>
  );
};

export default RecomFoods;
