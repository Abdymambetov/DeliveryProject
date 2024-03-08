import { Outlet } from "react-router-dom";
import NavMenu from "../../NavMenu/NavMenu";
import { useSelector } from "react-redux";
import styles from "./Layout.module.scss";

const Layout = () => {
  const { errorOrderFood, goodSendOrder } = useSelector(
    (state) => state.postRequestSlice
  );

  // console.log(goodSendOrder, "goodSendOrder");
  return (
    <>
      <NavMenu />
      <Outlet />
      <>
        {errorOrderFood && (
          <div className={styles.errorSendOrder}>
            <p>Что-то пошло не так, повторите попытку еще раз ...</p>
          </div>
        )}
        {goodSendOrder && (
          <div className={styles.goodSendOrder}>
            <p>
              Ваша заказ принят, с вами в скором времени свяжется оператор.
              Спасибо что выбрали нас!
            </p>
          </div>
        )}
      </>
    </>
  );
};

export default Layout;
