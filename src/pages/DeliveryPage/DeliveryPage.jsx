import React from "react";
import styles from "./DeliveryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDeliveryOrders,
  sendCourier,
} from "../../store/reducers/ordersListSlice";
import InputMask from "react-input-mask";
import { chnageAlertText } from "../../store/reducers/EditDataUser";
import PathToFiles from "../../components/PathToFiles/PathToFiles";
import { transformNumber } from "../../helpers/transformNumber";

const DeliveryPage = () => {
  const dispatch = useDispatch();

  const { deliveryOrders } = useSelector((state) => state.ordersListSlice);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(
      changeDeliveryOrders({
        ...deliveryOrders,
        [e.target.name]: e.target.value,
      })
    );
  };

  const clickPay = (num) => {
    dispatch(
      changeDeliveryOrders({
        ...deliveryOrders,
        oplata_type: num,
      })
    );
  };

  const clickUrgently = (num) => {
    dispatch(
      changeDeliveryOrders({
        ...deliveryOrders,
        dostavka_type: num,
      })
    );
  };

  const clickCargo = () => {
    if (deliveryOrders?.gab_gruz === 1) {
      dispatch(changeDeliveryOrders({ ...deliveryOrders, gab_gruz: 0 }));
    } else if (deliveryOrders?.gab_gruz === 0) {
      dispatch(changeDeliveryOrders({ ...deliveryOrders, gab_gruz: 1 }));
    }
  };

  // console.log(deliveryOrders);
  const sendData = (e) => {
    e.preventDefault();
    const phoneNumberPattern = /^\+\d{3}\(\d{3}\)\d{2}-\d{2}-\d{2}$/;

    if (phoneNumberPattern.test(deliveryOrders?.phone)) {
      dispatch(
        sendCourier({
          ...deliveryOrders,
          // phone: deliveryOrders?.phone?.replace(/[-()]/g, "")?.slice(-9),
          phone: transformNumber(deliveryOrders?.phone),
        })
      );
    } else {
      dispatch(
        chnageAlertText({
          text: "Введите правильный номер!",
          backColor: "#ffc12e",
          state: true,
        })
      );
    }
  };

  const warnPay = () => {
    dispatch(
      chnageAlertText({
        text: "С вами свяжется оператор для уточнения оплаты картой",
        backColor: "#ffc12e",
        state: true,
      })
    );
  };

  return (
    <div className={styles.deliveryMain}>
      <div className="container">
        <div className={styles.path}>
          <PathToFiles estab={"Курьерская доставка"} />
        </div>

        <div className={styles.deliveryMain__inner}>
          <div className={styles.deliveryMain__texts}>
            <h4>
              Личный <i>курьер</i>
            </h4>
            <h5>
              Отправьте нам список покупок и мы доставим всё к вам домой через 3
              часа!
            </h5>
            <p>
              Основной принцип нашей работы — доставка «из рук в руки». Услуга
              личный курьер – это гарантия того, что заказчик получит свою
              доставку вовремя. Мы несем ответственность за перевозимые товары.
              Во всех случаях один ответ – "Служба Доставки".{" "}
            </p>
            <p>
              Вот решение, которое Вы искали. И которое мы с удовольствием можем
              Вам предложить. Сделайте заказ и наш сотрудник в минимальный срок,
              быстро и надежно, будет стоять у Вашей двери с доставкой.
            </p>
            <h6>Доставка от 200 сом</h6>
          </div>
          <form onSubmit={sendData}>
            <label>Отправитель</label>
            <InputMask
              mask="+999(999)99-99-99"
              required
              placeholder="Номер телефона"
              name="phone"
              onChange={changeInput}
              value={deliveryOrders?.phone}
            />
            <input
              type="text"
              required
              placeholder="ФИО"
              name="fio"
              onChange={changeInput}
              value={deliveryOrders?.fio}
            />
            <label>Откуда забрать</label>
            <input
              type="text"
              required
              placeholder="Адрес"
              name="adress_from"
              onChange={changeInput}
              value={deliveryOrders?.adress_from}
            />
            <input
              type="text"
              required
              placeholder="Квартира и этаж"
              name="apartment_address_from"
              onChange={changeInput}
              value={deliveryOrders?.apartment_address_from}
            />
            <input
              type="text"
              required
              placeholder="Время"
              name="time_from"
              onChange={changeInput}
              value={deliveryOrders?.time_from}
            />
            <label>Куда доставить</label>
            <input
              type="text"
              required
              placeholder="Адрес"
              name="adress_to"
              onChange={changeInput}
              value={deliveryOrders?.adress_to}
            />
            <input
              type="text"
              required
              placeholder="Квартира и этаж"
              name="apartment_address_to"
              onChange={changeInput}
              value={deliveryOrders?.apartment_address_to}
            />
            <input
              type="text"
              required
              placeholder="Время"
              name="time_to"
              onChange={changeInput}
              value={deliveryOrders?.time_to}
            />

            <label>Описание груза</label>
            <input
              type="text"
              required
              placeholder="Комментарий к заказу"
              name="descr_delivery"
              onChange={changeInput}
              value={deliveryOrders?.descr_delivery}
            />

            <div className={styles.gruz} onClick={clickCargo}>
              <div
                className={
                  deliveryOrders?.gab_gruz === 1 ? styles.activeBtn : ""
                }
              ></div>
              <p>Габаритный груз свыше 20 кг или больше 1х1х1м</p>
            </div>

            <label>Оплата</label>
            <div className={styles.inputBtn} style={{ display: "flex" }}>
              <div
                onClick={() => {
                  clickPay(1);
                  warnPay();
                }}
                className={styles.innerTypesClick}
              >
                <div
                  className={
                    deliveryOrders?.oplata_type === 1 ? styles.activeBtn : ""
                  }
                ></div>
                <p>Картой</p>
              </div>
              <div
                onClick={() => clickPay(2)}
                className={styles.innerTypesClick}
              >
                <div
                  className={
                    deliveryOrders?.oplata_type === 2 ? styles.activeBtn : ""
                  }
                ></div>
                <p>Наличные</p>
              </div>
            </div>

            {deliveryOrders?.oplata_type === 2 ? (
              <input
                type="text"
                required
                placeholder="Нужна сдача с..."
                name="sdacha"
                onChange={changeInput}
                value={deliveryOrders?.sdacha}
              />
            ) : (
              ""
            )}

            <label>Комментарий к заказу</label>
            <input
              type="text"
              required
              placeholder="Комментарий к заказу"
              name="comment_zakaz"
              onChange={changeInput}
              value={deliveryOrders?.comment_zakaz}
            />

            <div className={styles.inputBtn}>
              <div className={styles.innerTypes}>
                <div
                  onClick={() => clickUrgently(1)}
                  className={styles.innerTypesClick}
                >
                  <div
                    className={
                      deliveryOrders?.dostavka_type === 1
                        ? styles.activeBtn
                        : ""
                    }
                  ></div>
                  <p>Срочно</p>
                </div>
                <div
                  onClick={() => clickUrgently(2)}
                  className={styles.innerTypesClick}
                >
                  <div
                    className={
                      deliveryOrders?.dostavka_type === 2
                        ? styles.activeBtn
                        : ""
                    }
                  ></div>
                  <p>Не срочно</p>
                </div>
              </div>
              <div
                onClick={() => clickUrgently(3)}
                className={styles.innerTypesClick}
              >
                <div
                  className={
                    deliveryOrders?.dostavka_type === 3 ? styles.activeBtn : ""
                  }
                ></div>
                <p>В течение дня</p>
              </div>
            </div>

            <div className="line"></div>

            <button type="submit" className="standartBtn">
              Оформить заказ
            </button>
            <p>
              После оформления заказа наши менеджеры свяжутся с вами для
              уточнения деталей!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
