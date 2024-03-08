import React, { useState } from "react";
import "./DetailedEveryData.scss";
import Modals from "../../Modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoodsOrders,
  changePositionFoods,
  changeSumDishes,
  changeSumOrdersFoods,
  delfoodCount,
  discountFoods,
} from "../../../store/reducers/statesSlice";

const DetailedEveryData = (props) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const { allFoodsOrders } = useSelector((state) => state.statesSlice);
  const data = props?.dataEvery;

  const handleCounter = (type) => {
    if (type === "add") {
      dispatch(addFoodsOrders(data));
    } else if (type === "del") {
      ///&& count > 0
      allFoodsOrders?.forEach((food) => {
        if (food.codeid === data?.codeid) {
          dispatch(discountFoods({ codeid: food.codeid }));
          dispatch(delfoodCount({ count: food.count }));
        }
      });
    }
    dispatch(changeSumOrdersFoods());
    dispatch(changePositionFoods());
    dispatch(changeSumDishes());
  };

  // console.log(props?.dataEvery, 'dataEvery');
  // console.log(allFoodsOrders, 'allFoodsOrders');

  React.useEffect(() => {
    allFoodsOrders?.map((koll) => {
      if (koll?.codeid === data?.codeid) {
        setCount(koll?.count);
      }
    });
    return () => setCount(0);
  }, [allFoodsOrders, data]);

  // console.log(data, "data");

  return (
    <Modals
      state={props.state}
      title={data?.product_name}
      changeState={props.changeState}
    >
      <div className="everyProd">
        <div className="everyProd__img">
          {data?.prod_photo ? (
            <img src={data?.prod_photo} alt="еда" />
          ) : (
            // <div
            //   style={{
            //     backgroundImage: `url(${data?.prod_photo})`,
            //     width: "100%",
            //     height: "100%",
            //     backgroundPosition: "center",
            //     backgroundSize: "contain",
            //     backgroundRepeat: "no-repeat",
            //     backgroundColor: "#fff",
            //     borderRadius: "8px",
            //   }}
            // ></div>
            <img src={data?.photo} alt="еда" />
          )}
        </div>
        <div className="everyProd__text">
          <p>{data?.product_price} сом</p>
          <span>
            {data?.v_ves} {data?.ves_name}
          </span>
        </div>
        <div className="everyProd__btns">
          <div>
            <button onClick={() => handleCounter("del")}>-</button>
            <p>{count}</p>
            <button onClick={() => handleCounter("add")}>+</button>
          </div>
          <button onClick={() => handleCounter("add")}>Добавить</button>
        </div>
        <h6>Описание</h6>
        {data?.description === "" ? (
          <b>Описание отсутствует</b>
        ) : (
          <b>{data?.description}</b>
        )}
      </div>
    </Modals>
  );
};

export default DetailedEveryData;
