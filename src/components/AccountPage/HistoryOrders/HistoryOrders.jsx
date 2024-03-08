import React from "react";
import styles from "./HistoryOrders.module.scss";
import goods from "../../../assets/images/noneData/foodsss.png";
import { useDispatch, useSelector } from "react-redux";
import { historyOrders } from "../../../store/reducers/requestFoodSlice";
import {
  changeError,
  changeGoodSent,
  sendOrderFoodsRepeat,
} from "../../../store/reducers/postRequestSlice";
import { transformNumber } from "../../../helpers/transformNumber";
import { useNavigate } from "react-router-dom";
import { styleModal } from "../../../helpers/localData";
import { Box, Modal } from "@mui/material";

export const HistoryOrders = ({ setStateModal, setIdCounter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataUser } = useSelector((state) => state.accountSlice);
  const { dataHistory } = useSelector((state) => state.requestFoodSlice);
  const [open, setOpen] = React.useState(false);
  const [idRepeatOrder, setIdRepeatOrder] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    dispatch(historyOrders(dataUser?.idUser));
  }, []);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString(); // Форматирую дату
    const time = dateTime.toLocaleTimeString(); // Форматирую время
    return `${date} в ${time}`;
  };

  const repeatOrders = () => {
    dispatch(
      sendOrderFoodsRepeat({
        client_phone: transformNumber(dataUser?.numberPhone),
        client_fio: dataUser?.name,
        client_address: [
          dataUser?.contacts?.[0] || "",
          dataUser?.contacts?.[1] || "",
          dataUser?.contacts?.[2] || "",
        ],
        codeid: +idRepeatOrder,
      })
    );

    setTimeout(() => {
      dispatch(changeError(false));
      dispatch(changeGoodSent(false));
      navigate("/main");
    }, 4000);
    handleClose();
  };

  // console.log(dataHistory, "dataHistory");

  return (
    <>
      <ul className={styles.history}>
        <li style={{ background: "#f4f4f4", paddingLeft: "0px" }}>
          <h5>История заказов</h5>
        </li>
        {dataHistory?.length === 0 ? (
          <li className={styles.noneData} style={{ background: "#f4f4f4" }}>
            Список пуст
          </li>
        ) : (
          dataHistory?.map((food, ind) => (
            <li key={ind}>
              <div className={styles.viewFood}>
                {/* <img src={food?.foto || goods} alt="заведение" /> */}
                <img src={goods} alt="заведение" />
                <div>
                  <span>{food.zakaz_status}</span>
                  <p>Заказ {formatDateTime(food.zakaz_date)}</p>
                  <b>{food.establishment_name}</b>
                </div>
              </div>
              <div className={styles.moreInfo}>
                <p>{food.zakaz_summ} сом</p>
                <div>
                  <button
                    className="standartBtn"
                    onClick={() => {
                      handleOpen();
                      setIdRepeatOrder(food.codeid);
                    }}
                  >
                    Повторить заказ
                  </button>
                  <button
                    className="standartBtn"
                    onClick={() => {
                      setIdCounter(food.codeid);
                      setStateModal(true);
                    }}
                  >
                    Подробно
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className={styles.confirmRepearOrder}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <div className="modalLogOut">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Вы хотите повторить заказ ?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  padding: "40px 0 0 0",
                }}
              >
                <button
                  onClick={() => repeatOrders()}
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#ffc12e",
                    padding: "8px 35px",
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                >
                  Да
                </button>
                <button
                  onClick={handleClose}
                  style={{
                    fontSize: "20px",
                    backgroundColor: "transparent",
                    border: "1px solid #ffc12e",
                    padding: "8px 35px",
                    borderRadius: "5px",
                    color: "#ffc12e",
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
