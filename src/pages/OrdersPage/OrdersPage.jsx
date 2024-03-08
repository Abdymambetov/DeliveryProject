import React, { useState } from "react";
import styles from "./OrdersPage.module.scss";
import { useNavigate } from "react-router-dom";
import backBtn from "../../assets/icons/backBtn.svg";
import EveryOrdersPage from "../../components/OrdersPage/EveryOrdersPage/EveryOrdersPage";
import TotalOrder from "../../components/OrdersPage/TotalOrder/TotalOrder";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const [totalOrder, setTotalOrder] = useState(false);
  const navigate = useNavigate();
  const { allFoodsOrders, positionFoods, sumOrdersFoods } = useSelector(
    (state) => state.statesSlice
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clickBtnOrder = () => {
    allFoodsOrders.length === 0 ? navigate("/categories") : setTotalOrder(true);
  };

  // console.log(allFoodsOrders, "allFoodsOrders");

  return (
    <>
      <div className={styles.orderBlock}>
        {/* <NavSearch /> */}
        <div className="container">
          <div className={styles.orderBlock__inner}>
            <button onClick={() => navigate(-1)} className={styles.prevBacket}>
              <img src={backBtn} alt="<" />
              <p>Ваша корзина</p>
            </button>
            <div className={styles.pay}>
              <p>{positionFoods} позиций</p>
              <span>{sumOrdersFoods} сом</span>
            </div>
            {allFoodsOrders.length === 0 ? (
              <div className={styles.noneFoods}>
                <p>Ваша корзина пустая!</p>
              </div>
            ) : (
              allFoodsOrders?.map((item, ind) => (
                <EveryOrdersPage key={ind} item={item} />
              ))
            )}
            <div className={styles.addOrder}>
              <button className="standartBtn" onClick={clickBtnOrder}>
                Оформить заказ
              </button>
            </div>
            <TotalOrder state={totalOrder} changeState={setTotalOrder} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
