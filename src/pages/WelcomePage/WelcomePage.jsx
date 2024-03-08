import React, { useEffect, useState } from 'react';
import styles from './WelcomePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataUser } from '../../store/reducers/accountSlice';
import AddUserPlace from '../../components/LoginPage/AddUserPlace/AddUserPlace';

const WelcomePage = () => {
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState(false);
  const { dataUser } = useSelector((state) => state.accountSlice);
  const [stageLogin, setStageLogin] = useState(1);

  useEffect(() => {
    setStageLogin(1);
  }, []);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(changeDataUser({ ...dataUser, [e.target.name]: e.target.value }));
  };

  const sendNameUser = (e) => {
    e.preventDefault();
    if (dataUser?.name !== '') {
      setStageLogin(2);
    }
  };

  // console.log(dataUser);
  return (
    <div className={styles.welcome}>
      <div className="container">
        {stageLogin === 1 ? (
          <form onSubmit={sendNameUser} className={styles.welcome__inner}>
            <h2>Добро пожаловать!</h2>
            <p>Укажите своё имя, чтобы мы знали как к вам обращаться!</p>
            <input
              className={styles.name}
              type="text"
              name="name"
              placeholder="Ваше ФИО"
              value={dataUser.name}
              onChange={changeInput}
              required
            />
            <div className={styles.agreement}>
              <span>
                Фотографии товаров в приложении могут не соответствовать их виду
                в действительности
              </span>
              <b>
                ВНИМАНИЕ! Цена за услуги может варьироваться в зависимости от
                работы курьера, также существует доплата за пределы города.
              </b>
              <div className={styles.checkbox}>
                <input
                  id="good"
                  type="checkbox"
                  checked={checkout}
                  onChange={() => setCheckout(!checkout)}
                />
                <label htmlFor="good">Согласен (на)</label>
              </div>
              <button
                type="submit"
                disabled={!checkout}
                style={checkout ? {} : { opacity: 0.5 }}
              >
                Указать адрес
              </button>
            </div>
          </form>
        ) : (
          <AddUserPlace />
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
