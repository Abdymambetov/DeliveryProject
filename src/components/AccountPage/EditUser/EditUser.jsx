import React, { useState } from "react";
import Modals from "../../Modals/Modals";
import "./EditUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { editNameUser } from "../../../store/reducers/EditDataUser";

const EditUser = (props) => {
  const { dataUser, tokenNum } = useSelector((state) => state.accountSlice);
  const [inputName, setInput] = useState(dataUser?.name);
  const dispatch = useDispatch();

  const editNumber = () => {
    props.changeState(false);
    setTimeout(() => {
      props.more(true);
    }, 400);
  };

  const editData = (e) => {
    e.preventDefault();
    dispatch(editNameUser({ inputName, dataUser }));
    props.changeState(false);
  };

  return (
    <Modals
      state={props.state}
      title={"Редактирование профиля"}
      changeState={props.changeState}
    >
      <form className="editUser" onSubmit={editData}>
        <input
          type="text"
          placeholder="Нурдин Джумабеков"
          required
          onChange={(e) => setInput(e.target.value)}
          value={inputName}
        />
        <div>
          <p>{tokenNum}</p>
          <div onClick={editNumber} className="btnNum">
            Сменить
          </div>
        </div>
        <button className="standartBtn" type="submit">
          Сохранить изменения
        </button>
      </form>
    </Modals>
  );
};

export default EditUser;
