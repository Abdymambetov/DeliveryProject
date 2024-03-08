import React from "react";
import styles from "./SliderMain.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

export const NoneBtn = () => {
  return <div style={{ display: "none" }} />;
};

const SliderMain = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
  };
  const { discounts } = useSelector((state) => state.requestFoodSlice);

  // console.log(discounts, 'discounts');

  return (
    <div className={styles.parentSlider}>
      <div className="container">
        <div className={styles.parentSlider__inner}>
          <Slider {...settings}>
            {discounts?.map((slid) => {
              return slid?.baner === "null" ? (
                <a
                  key={slid.codeid}
                  className={styles.parentSlider__every}
                  href={slid.link}
                >
                  <div>
                    <h3>{slid?.description}</h3>
                    <p>Подробнее...</p>
                  </div>
                  <div>
                    {slid?.photo ? (
                      <img src={slid.photo} alt="foods" />
                    ) : (
                      <p>Здесь могла быть ваша реклама</p>
                    )}
                  </div>
                </a>
              ) : (
                <a key={slid.codeid} className={styles.parentSlider__altEvery}>
                  {slid?.baner ? (
                    <img src={slid?.baner} alt="banner" href={slid.link} />
                  ) : (
                    <p>Здесь могла быть ваша реклама</p>
                  )}
                </a>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderMain;
