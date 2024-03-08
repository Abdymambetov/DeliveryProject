import React from "react";
import styles from "./Account.module.scss";
import { HistoryOrders } from "../../components/AccountPage/HistoryOrders/HistoryOrders";
import edit from "../../assets/icons/edit.svg";
import LogOut from "../../components/AccountPage/LogOut/LogOut";
import EditUser from "../../components/AccountPage/EditUser/EditUser";
import Contacts from "../../components/AccountPage/Contacts/Contacts";
import EveryOrder from "../../components/AccountPage/EveryOrder/EveryOrder";
import DeliveryAddress from "../../components/AccountPage/DeliveryAddress/DeliveryAddress";
import EditNumber from "../../components/AccountPage/EditNumber/EditNumber";
import ConfirmNum from "../../components/AccountPage/ConfirmNum/ConfirmNum";
import { useSelector } from "react-redux";

const Account = () => {
  const [everyOrder, setEveryOrder] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  const [contacts, setContacts] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const [editNum, setEditNum] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [idCounter, setIdCounter] = React.useState(0);
  const { dataUser } = useSelector((state) => state.accountSlice);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(idCounter, 'idCounter');
  return (
    <div className={styles.accountBlock}>
      <div className="container">
        <div className={styles.accountBlock__inner}>
          <button className={styles.profile} onClick={() => setEditData(true)}>
            <h3>Профиль</h3>
            <img src={edit} alt="edit" />
          </button>
          <h4>{dataUser?.name}</h4>
          <p>{dataUser?.numberPhone?.replace("+996", "0")}</p>
          <div className={styles.editLocation}>
            <span>{dataUser?.contacts?.[0]}</span>
            <button onClick={() => setLocation(true)}>Изменить</button>
          </div>
          <button
            className={styles.btnContact}
            onClick={() => setContacts(true)}
          >
            Контакты
          </button>
          <LogOut />
          <HistoryOrders
            setStateModal={setEveryOrder}
            setIdCounter={setIdCounter}
          />
          <EveryOrder
            state={everyOrder}
            changeState={setEveryOrder}
            idCounter={idCounter}
          />
          <EditUser
            state={editData}
            changeState={setEditData}
            more={setEditNum}
          />
          <Contacts state={contacts} changeState={setContacts} />
          <DeliveryAddress state={location} changeState={setLocation} />
          <EditNumber
            state={editNum}
            changeState={setEditNum}
            more={setConfirm}
          />
          <ConfirmNum state={confirm} changeState={setConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Account;
