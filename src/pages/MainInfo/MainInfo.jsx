import React, { useEffect } from "react";
import logo from "../../assets/images/Logo.png";
import foods from "../../assets/images/Main/foods.svg";
import foods2 from "../../assets/images/Main/foods2.svg";
import singInImg from "../../assets/images/Main/singInImg.svg";
import styles from "./MainInfo.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { NoneBtn } from "../../components/SliderMain/SliderMain";

const MainInfo = () => {
  const [count, setCount] = React.useState(0);
  const [h2Text, setH2text] = React.useState("Ковёр-Самолёт доставит всё!");
  const [pText, setPtext] = React.useState(
    "Доставка обедов, продуктов, напитков, медикаментов и цветов"
  );
  const navigate = useNavigate();

  const settings = {
    afterChange: (index) => {
      setCount(index);
    },
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
  };

  useEffect(() => {
    switch (count) {
      case 0:
        setH2text("Ковёр-Самолёт доставит всё!");
        setPtext("Доставка обедов, продуктов, напитков, медикаментов и цветов");
        break;
      case 1:
        setH2text("Заказывайте еду из любимых ресторанов");
        setPtext(
          "Пара кликов и вы сможете насладиться любимыми блюдами у себя дома"
        );
        break;
      case 2:
        setH2text("Мы доставим прямо к вашей двери");
        setPtext("Мы делаем вашу жизнь проще и доставим заказ в любое время");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        break;
      default:
    }
  }, [count]);

  return (
    <div className={styles.mainInfo}>
      <div className="container">
        <div className={styles.mainInfo__inner}>
          <div className={styles.mainContent}>
            <div className="logoImg">
              <img src={logo} alt="logo" />
            </div>
            <h1>{h2Text}</h1>
            <p>{pText}</p>
          </div>
          {/* //////////////////////////////// */}
          <Slider {...settings}>
            <div className={styles.mainInfo__foods}>
              <img src={foods} alt="foods" />
            </div>
            <div className={styles.mainInfo__foods}>
              <img src={foods2} alt="foods" />
            </div>
            <div className={styles.mainInfo__foods}>
              <img src={singInImg} alt="singInImg" />
            </div>
          </Slider>
          {/* //////////////////////////////// */}
          <div
            className={styles.line}
            style={
              count === 2
                ? { justifyContent: "end" }
                : { justifyContent: "start" }
            }
          >
            <div></div>
          </div>
        </div>
        <NavLink to={"/login"} className={styles.mainInfo__next}></NavLink>
      </div>
    </div>
  );
};

export default MainInfo;
