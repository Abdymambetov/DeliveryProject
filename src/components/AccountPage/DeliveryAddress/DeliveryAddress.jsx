import React, { useState } from 'react';
import './DeliveryAddress.scss';
import Modals from '../../Modals/Modals';
import { useDispatch, useSelector } from 'react-redux';
import { editPlaceUser } from '../../../store/reducers/EditDataUser';
import mapImg from '../../../assets/images/noneData/Map.png';

const DeliveryAddress = (props) => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.accountSlice);
  const [placeUser, setPlaceUser] = useState({
    mainAdres: dataUser?.contacts?.[0],
    noMainAdres: dataUser?.contacts?.[1],
    infoDop: dataUser?.contacts?.[2],
  });

  const changeInput = (e) => {
    e.preventDefault();
    setPlaceUser({ ...placeUser, [e.target.name]: e.target.value });
  };

  const sendData = (e) => {
    e.preventDefault();
    dispatch(editPlaceUser({ placeUser, dataUser }));
    props.changeState(false);
    //// надо создать в localeStotage ключ для адреса пользователя и innput num перекинуть в redux
  };

  return (
    <Modals
      state={props.state}
      title={'Контакты'}
      changeState={props.changeState}
    >
      <div className="delivery">
        <form onSubmit={sendData}>
          <input
            type="text"
            name="mainAdres"
            required
            value={placeUser?.mainAdres}
            placeholder="Киевская улица, 71"
            onChange={changeInput}
          />
          <input
            type="text"
            name="noMainAdres"
            value={placeUser?.noMainAdres}
            required
            placeholder="Квартира и этаж"
            onChange={changeInput}
          />
          <input
            type="text"
            required
            name="infoDop"
            value={placeUser?.infoDop}
            placeholder="Доп. информация (код двери, домофон и т.п.)"
            onChange={changeInput}
          />
          <button type="submit" className="standartBtn">
            Подтвердить
          </button>
        </form>
        <img src={mapImg} alt="" />
      </div>
    </Modals>
  );
};

export default DeliveryAddress;
