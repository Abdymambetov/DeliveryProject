import React from 'react';
import './Contacts.scss';
import Modals from '../../Modals/Modals';

const Contacts = (props) => {
  return (
    <Modals
      state={props.state}
      title={'Контакты'}
      changeState={props.changeState}
    >
      <div className="contacts">
        <ul>
          <li>
            0 (999) <span> 99-99-99</span>
            <p>WhatsApp</p>
          </li>
          <li>
            0 (999) <span> 99-99-99</span>
          </li>
          <li>
            0 (999) <span> 99-99-99</span>
          </li>
          <li>
            0 (999) <span> 99-99-99</span>
          </li>
        </ul>
        <h5>Время работы</h5>
        <p>Работаем с 8 утра до 2 ночи</p>
      </div>
    </Modals>
  );
};

export default Contacts;
