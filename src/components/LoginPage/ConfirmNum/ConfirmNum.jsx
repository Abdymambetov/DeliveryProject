import React, { useRef } from "react";
import styles from "./ConfirmNum.module.scss";
import { checkNum } from "../../../store/reducers/postRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { chnageAlertText } from "../../../store/reducers/EditDataUser";

const ConfirmNum = ({
  setEndTime,
  endTime,
  time,
  setTime,
  sendNum,
  setStateSendNum,
}) => {
  const [seconds, setSeconds] = React.useState(0);
  const { dataUser } = useSelector((state) => state.accountSlice);
  const { checkAuth } = useSelector((state) => state.postRequestSlice);
  const [code, setCode] = React.useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  React.useEffect(() => {
    setSeconds(179);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
      setTime(formatTime(seconds)); // Оставшееся время

      if (seconds === 0) {
        // Таймер завершен.
        clearInterval(intervalId);
        setTime("00:00");
        setEndTime(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
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
    if (+checkAuth === 1) {
      navigate("/welcome");
      setStateSendNum(1);
    }
    // console.log(checkAuth, 'checkAuth');
  }, [checkAuth]);

  const confirmNum = (e) => {
    e.preventDefault();
    if (code?.join("")?.length === 4) {
      dispatch(checkNum({ code, dataUser }));
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

  // console.log(endTime, "endTime");

  const sendNumAgain = (e) => {
    sendNum(e);
    setSeconds(179);
    setTime("03:00");
    setEndTime(true);
  };

  return (
    <div>
      <form className={styles.formConfirm} onSubmit={confirmNum}>
        <div className={styles.inputs}>
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
        {endTime ? (
          <button type="submit" className="standartBtn">
            Подтвердить
          </button>
        ) : (
          <div className={styles.btnSend} onClick={sendNumAgain}>
            Отправить код еще раз
          </div>
        )}
        <label>
          Код отправлен на ваш номер. Повторная отправка через
          <span>{time}</span>
        </label>
      </form>
    </div>
  );
};

export default ConfirmNum;
