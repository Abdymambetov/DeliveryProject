import React from "react";
import goods from "../../../assets/images/noneData/foodsss.png";
import Modals from "../../Modals/Modals";
import "./EveryOrder.scss";
import { useDispatch, useSelector } from "react-redux";
import { takeDetailedHistory } from "../../../store/reducers/requestFoodSlice";

const EveryOrder = (props) => {
  const dispatch = useDispatch();

  const { detailedHistory } = useSelector((state) => state.requestFoodSlice);

  React.useEffect(() => {
    if (props.idCounter !== 0) {
      dispatch(takeDetailedHistory(props.idCounter));
    }
  }, [props?.idCounter]);

  // const calculateTotalPrice = () => {
  //   if (detailedHistory && detailedHistory.length > 0) {
  //     const totalPrice = detailedHistory.reduce(
  //       (accumulator, currentItem) => accumulator + +currentItem.price,
  //       0
  //     );
  //     return totalPrice;
  //   } else {
  //     return 0;
  //   }
  // };
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString(); // Форматирую дату
    const time = dateTime.toLocaleTimeString(); // Форматирую время
    return `${date} в ${time}` || "дата не указана";
  };

  // console.log(detailedHistory, "detailedHistory");

  return (
    <Modals
      state={props.state}
      title={formatDateTime(detailedHistory?.[0]?.zakaz_date || "")}
      changeState={props.changeState}
    >
      <div className="historyModal">
        {detailedHistory?.length !== 0 && <p>Заказ создан</p>}
        <div>
          {detailedHistory?.length !== 0 && (
            <>
              <span>{detailedHistory?.[0]?.total_sum} сом</span>
              <div>
                <i>{detailedHistory?.length} позиции</i>
              </div>
            </>
          )}
        </div>
        <ul>
          {detailedHistory?.length === 0 ? (
            <h6>Заказов нет</h6>
          ) : (
            <>
              {detailedHistory?.map((i, ind) => (
                <li key={ind}>
                  <div className="food">
                    <img src={i.photo} alt="food" />
                  </div>
                  <div className="mainContent">
                    <p>{i.product_name}</p>
                    <span>{+i.price} сом</span>
                  </div>
                  <p>{i.price} сом</p>
                </li>
              ))}
            </>
          )}
        </ul>
        {/* <div className="delivery">
          <h5>Доставка</h5>
        </div> */}
        {detailedHistory?.length !== 0 && (
          <div className="delivery">
            <h5>Посуда</h5>
          </div>
        )}
        <button onClick={() => props.changeState(false)}>Закрыть</button>
      </div>
    </Modals>
  );
};

export default EveryOrder;
