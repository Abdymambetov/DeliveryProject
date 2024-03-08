import React, { useEffect } from "react";
import "./TotalOrder.scss";
import Modals from "../../Modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import {
  changeError,
  changeGoodSent,
  changeLoading,
  changeOrderUser,
  changeTypeOrder,
  sendOrderFoods,
} from "../../../store/reducers/postRequestSlice";
import { sortOrders } from "../../../helpers/sortOrders";
import { useNavigate } from "react-router-dom";
import { chnageAlertText } from "../../../store/reducers/EditDataUser";
import { transformNumber } from "../../../helpers/transformNumber";

const TotalOrder = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderUser } = useSelector((state) => state.postRequestSlice);
  const { dataUser } = useSelector((state) => state.accountSlice);

  const { sumOrdersFoods, sumDishes, allFoodsOrders, countDishes } =
    useSelector((state) => state.statesSlice);
  const allSum = +sumDishes + +sumOrdersFoods + 200;

  const sendData = (e) => {
    e.preventDefault();
    dispatch(
      sendOrderFoods({
        ...orderUser,
        summ: +allSum,
        product_list: sortOrders(allFoodsOrders),
        // phone: orderUser?.phone?.replace(/[-()]/g, "")?.slice(-9), transformNumber(info?.numberPhone)
        phone: transformNumber(orderUser?.phone),
      })
    );
    props.changeState(false);
    // console.log(orderUser, 'orderUser');

    setTimeout(() => {
      dispatch(changeError(false));
      dispatch(changeLoading(false));
      dispatch(changeGoodSent(false));
      navigate("/main");
    }, 4000);
  };

  // console.log(orderUser);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(
      changeOrderUser({ ...orderUser, [e.target.name]: e.target.value })
    );
  };

  React.useEffect(() => {
    dispatch(
      changeOrderUser({
        ...orderUser,
        fio: dataUser?.name,
        phone: dataUser?.numberPhone,
      })
    );
  }, []);

  // const counterDishes = (type) => {
  //   if (type === "+") {
  //     dispatch(changeCountDishes(countDishes + 1));
  //   } else if (type === "-") {
  //     countDishes > 1 ? dispatch(changeCountDishes(countDishes - 1)) : "";
  //   }
  // };

  const warnPay = () => {
    dispatch(
      chnageAlertText({
        text: "С вами свяжется оператор для уточнения оплаты картой",
        backColor: "#ffc12e",
        state: true,
      })
    );
  };

  // console.log(allSum, "allSum");
  // console.log(sumDishes, "sumDishes");
  // console.log(allFoodsOrders, "allFoodsOrders");
  // console.log(orderUser, "orderUser");

  return (
    <Modals state={props.state} title={"Итого"} changeState={props.changeState}>
      <form className="totalOrder" onSubmit={sendData}>
        <h5>Покупатель</h5>
        <input
          onChange={changeInput}
          type="text"
          name="phone"
          required
          placeholder="Телефон"
          value={orderUser?.phone}
        />
        <input
          onChange={changeInput}
          type="text"
          name="fio"
          required
          placeholder="ФИО"
          value={orderUser?.fio}
        />
        <h5>Доставка</h5>
        <input
          onChange={changeInput}
          type="text"
          name="address"
          required
          placeholder="Киевская улица, 71"
          value={orderUser?.address}
        />
        <input
          onChange={changeInput}
          type="text"
          name="kvartira"
          required
          placeholder="Квартира и этаж"
          value={orderUser?.kvartira}
        />
        <input
          onChange={changeInput}
          type="text"
          name="hourDeliver"
          placeholder="Время доставки"
          value={orderUser?.hourDeliver}
        />
        <input
          onChange={changeInput}
          type="text"
          name="zakazDopInfo"
          required
          placeholder="Доп. информация (код двери, домофон и т.п.)"
          value={orderUser?.zakazDopInfo}
        />
        <h5>Оплата</h5>
        {/* ////type_oplata */}
        <div className="inputBtn">
          <div
            onClick={() => {
              dispatch(changeTypeOrder(1));
              warnPay();
            }}
          >
            <div
              className={orderUser.type_oplata === 1 ? "activeBtn" : ""}
            ></div>
            <p>Картой</p>
          </div>
          <div onClick={() => dispatch(changeTypeOrder(2))}>
            <div
              className={orderUser.type_oplata === 2 ? "activeBtn" : ""}
            ></div>
            <p>Наличные</p>
          </div>
        </div>
        {orderUser.type_oplata === 2 ? (
          <input
            onChange={changeInput}
            type="text"
            name="sdacha"
            required
            placeholder="Нужна сдача с..."
            value={orderUser?.sdacha}
          />
        ) : (
          ""
        )}

        <h5>Дополнительно</h5>
        {/* <div className="dishes">
          <h6>Посуда</h6>
          <div className="counter">
            <p onClick={() => counterDishes("-")}>-</p>
            <p>{countDishes}</p>
            <p onClick={() => counterDishes("+")}>+</p>
          </div>
        </div> */}
        <input
          onChange={changeInput}
          type="text"
          name="comment_zakaz"
          placeholder="Комментарий к заказу"
          value={orderUser?.comment_zakaz}
        />
        <div className="line"></div>
        <div className="itog">
          <h6>Стоимость товаров</h6>
          <p>{sumOrdersFoods} сом</p>
        </div>
        <div className="itog">
          <h6>Посуда</h6>
          <p>{sumDishes} сом</p>
        </div>
        <div className="itog">
          <h6>Доставка от</h6>
          <p>200 сом</p>
        </div>
        <div className="allItog">
          <h5>Итого</h5>
          <h5>{allSum} сом</h5>
        </div>
        <button className="standartBtn" type="submit">
          Оформить заказ
        </button>
      </form>
    </Modals>
  );
};

export default TotalOrder;
