import React from "react";
import styles from "./TypesDetailed.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { NoneBtn } from "../../SliderMain/SliderMain";
import arrow from "../../../assets/icons/backBtn.svg";
/// func
import { changePaginationCount } from "../../../store/reducers/dataAllSlice";
import {
  changeEstablishmentCategory,
  getAllDataFood,
  getEstablishmentCategory,
  getEstablishmentData,
} from "../../../store/reducers/requestFoodSlice";
import {
  changeActiveType,
  changePopular,
} from "../../../store/reducers/statesSlice";

const TypesDetailed = ({ id }) => {
  const dispatch = useDispatch();
  const sliderRef = React.createRef();
  const { activeTypeEstab } = useSelector((state) => state.statesSlice);
  const { establishmentCategory } = useSelector(
    (state) => state.requestFoodSlice
  );

  React.useEffect(() => {
    if (+id === 0) {
      dispatch(
        getEstablishmentCategory(
          "http://kover-site.333.kg/get_estab_category?category_type=filter"
        )
        /// сюда добавить qery params
      );
    }
    //  else if (+id === 15) {
    //   dispatch(
    //     getEstablishmentCategory(
    //       "http://kover-site.333.kg/get_estab_category?number=2"
    //     )
    //     /// сюда добавить qery params
    //   );
    // } else if (+id === 16) {
    //   dispatch(
    //     getEstablishmentCategory(
    //       "http://kover-site.333.kg/get_estab_category?number=3"
    //     )
    //     /// сюда добавить qery params
    //   );
    // }
    //  else if (+id === 17) {
    //   dispatch(
    //     getEstablishmentCategory(
    //       "http://kover-site.333.kg/get_estab_category?number=4"
    //     )
    //     /// сюда добавить qery params
    //   );
    // }
    else {
      dispatch(changeEstablishmentCategory([]));
    }

    /// для типов заведений(нац, европ-я кухня .....)
  }, []);

  const handleNext = (e) => {
    sliderRef.current.slickNext();
  };

  // console.log(id, 'id');

  const handleClick = (codeId) => {
    localStorage.setItem("paginationMain", 1);
    dispatch(changePaginationCount(1));
    if (+codeId === 0) {
      if (+id === 0) {
        // dispatch(getAllDataFood('http://kover-site.333.kg/get_establishments/')); заменил на:
        dispatch(
          getAllDataFood(
            `http://kover-site.333.kg/get_establishments?category_code=${"0"}` // дефолтное значение, когда отображаются все данные категорий ("все")
          )
        );
      }
    } else {
      dispatch(
        getEstablishmentData(
          `http://kover-site.333.kg/get_establishments?category_code=${codeId}`
        )
      );
    }
    // dispatch(changePopular(popular));
    dispatch(changePopular("Все")); // новинка,акции .....
  };

  React.useEffect(() => {
    if (activeTypeEstab !== 0) {
      dispatch(
        getEstablishmentData(
          `http://kover-site.333.kg/get_establishments?category_code=${activeTypeEstab}`
        )
      );
    }
    // при обновлении сразу выводятся все данные( в типах)
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
    variableWidth: true,
    focusOnSelect: true,
    initialSlide: +activeTypeEstab, /// в нем хранится id последнего активного слайра
  };

  // console.log(activeTypeEstab, 'activeTypeEstab');
  // console.log(establishmentCategory, "establishmentCategory");

  return (
    <>
      <ul className={styles.detailed}>
        <li className={styles.slider}>
          {establishmentCategory?.length === 0 ? (
            <></>
          ) : (
            <>
              <Slider ref={sliderRef} {...settings}>
                {establishmentCategory?.map((type) => (
                  <div
                    key={type.codeid}
                    className={styles.slider__inner}
                    onClick={() => handleClick(type.codeid)}
                  >
                    <button
                      onClick={() => dispatch(changeActiveType(type.codeid))}
                      className={
                        type.codeid === activeTypeEstab ? styles.active : ""
                      }
                    >
                      {type.category_name}
                    </button>
                  </div>
                ))}
              </Slider>
              <button onClick={handleNext} className={styles.nextBtn}>
                <img src={arrow} alt="<" />
              </button>
            </>
          )}
        </li>
        <li className={styles.popular}>{/* <SelectsPopular /> */}</li>
      </ul>
    </>
  );
};

export default TypesDetailed;
