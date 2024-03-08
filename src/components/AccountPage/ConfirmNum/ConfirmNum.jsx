import React, { useRef } from "react";
import "./ConfirmNum.scss";
import Modals from "../../Modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import {
  checkNumUser,
  chnageAlertText,
  editNumUser,
} from "../../../store/reducers/EditDataUser";

const ConfirmNum = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  const [time, setTime] = React.useState("03:00");
  const [code, setCode] = React.useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const { dataUser, tokenNum } = useSelector((state) => state.accountSlice);
  const { inputNum, errorEdit } = useSelector((state) => state.EditDataUser);

  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1].current.focus();
    }
  };
  const handleInputChange = (index, value) => {
    const sanitizedValue = value.replace(/\D/g, "");
  
    if (sanitizedValue.length === 1 && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }
  
    const updatedCode = [...code];
    updatedCode[index] = sanitizedValue;
    setCode(updatedCode);
  };

  React.useEffect(() => {
    setSeconds(179);
  }, [props.state]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
      setTime(formatTime(seconds)); // Оставшееся время

      if (seconds === 0) {
        // Таймер завершен.
        clearInterval(intervalId);
        setTime("00:00");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const sendAgainData = (e) => {
    e.preventDefault();
    dispatch(editNumUser({ inputNum, dataUser, tokenNum }));
    setTime("03:00");
    setSeconds(179);
  };

  const sendData = (e) => {
    e.preventDefault();
    if (code?.join("")?.length === 4) {
      dispatch(checkNumUser({ code, inputNum, dataUser }));
      props.changeState(false);
      setCode(["", "", "", ""]);
    } else {
      dispatch(
        chnageAlertText({
          text: "Введите все четыре символа!",
          backColor: "#ffc12e",
          state: true,
        })
      );
    }
  };

  // React.useEffect(() => {
  //   if (errorEdit === "ошибка") {
  //     props.changeState(false);
  //   }
  // }, [errorEdit]);
  /// надо обязательно это сделать!!!

  // console.log(code);
  // console.log(time, "setTime");
  // console.log(errorEdit, "errorEdit");
  // console.log(props, "props");

  return (
    <Modals
      state={props.state}
      title={"Подтверждение номера телефона"}
      changeState={props.changeState}
    >
      <div className="confirmNum">
        <form onSubmit={sendData}>
          {/* <CheckNums /> */}
          <div className="inputsCode">
            {code.map((text, index) => (
              <input
                key={index}
                type="text"
                placeholder="0"
                value={text}
                maxLength={1}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs.current[index]}
              />
            ))}
          </div>
          {time !== "00:00" ? (
            <button type="submit" className="standartBtn">
              Подтвердить
            </button>
          ) : (
            <div className="btnSendNums" onClick={sendAgainData}>
              Отправить еще раз
            </div>
          )}
          <label>
            Код отправлен на ваш номер. Повторная отправка через
            <span>{time}</span>
          </label>
        </form>
      </div>
    </Modals>
  );
};

export default ConfirmNum;
