import React from "react";
import "./EditNumber.scss";
import Modals from "../../Modals/Modals";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInputNum,
  chnageAlertText,
  editNumUser,
} from "../../../store/reducers/EditDataUser";

const EditNumber = (props) => {
  const dispatch = useDispatch();
  const { dataUser, tokenNum } = useSelector((state) => state.accountSlice);
  const { inputNum } = useSelector((state) => state.EditDataUser);

  const sendData = (e) => {
    e.preventDefault();
    const phoneNumberPattern = /^\+\d{3}\(\d{3}\)\d{2}-\d{2}-\d{2}$/;

    if (phoneNumberPattern.test(inputNum)) {
      dispatch(editNumUser({ inputNum, dataUser, tokenNum }));
      props.changeState(false);
      setTimeout(() => {
        props.more(true);
      }, 400);
    } else {
      dispatch(
        chnageAlertText({
          text: "Некорректный номер!",
          backColor: "#ffc12e",
          state: true,
        })
      );
    }
  };

  return (
    <Modals
      state={props.state}
      title={"Смена номера"}
      changeState={props.changeState}
    >
      <div className="editNumber">
        <form>
          <InputMask
            mask="+999(999)99-99-99"
            placeholder="+996(___)__-__-__"
            value={inputNum}
            onChange={(e) => dispatch(changeInputNum(e.target.value))}
            required
          />
          <button type="submit" className="standartBtn" onClick={sendData}>
            Отправить код
          </button>
          <label>Мы вышлем код подтверждения в SMS на ваш мобильный.</label>
        </form>
      </div>
    </Modals>
  );
};

export default EditNumber;
