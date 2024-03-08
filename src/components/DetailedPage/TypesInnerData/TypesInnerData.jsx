import React, { useEffect } from 'react';
import styles from './TypesInnerData.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../../../assets/icons/backBtn.svg';
import Slider from 'react-slick';
import { NoneBtn } from '../../SliderMain/SliderMain';
import { getEveryInnerData } from '../../../store/reducers/requestFoodSlice';

const TypesInnerData = ({ estab, activeType, setActiveType }) => {
  const dispatch = useDispatch();
  const { everyInnerTypes } = useSelector((state) => state.requestFoodSlice);
  const [activeText, setActiveText] = React.useState('Все');
  // console.log(everyInnerTypes, 'everyInnerTypes');
  // console.log(estab, 'estab');

  const handleClick = (category, name) => {
    setActiveText(name);
    if (category === 0) {
      dispatch(
        getEveryInnerData(
          `http://kover-site.333.kg/products?code_establishment=${estab}&code_category=0`
        )
      );
    } else {
      dispatch(
        getEveryInnerData(
          `http://kover-site.333.kg/products?code_establishment=${estab}&code_category=${category}`
        )
      );
    }
  };

  const sliderRef = React.createRef();

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
    variableWidth: true,
  };

  return (
    <>
      {everyInnerTypes.length !== 1 && everyInnerTypes.length !== 0 && (
        <>
          <ul className={styles.types}>
            <li className={styles.slider}>
              <Slider ref={sliderRef} {...settings}>
                {everyInnerTypes?.map((type) => (
                  <div
                    key={type.codeid}
                    className={styles.slider__inner}
                    onClick={() =>
                      handleClick(type.code_category, type.category_name)
                    }
                  >
                    <button
                      onClick={() => setActiveType(type.codeid)}
                      className={
                        type.codeid === activeType ? styles.active : ''
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
            </li>
          </ul>
          <h5>{activeText}</h5>
        </>
      )}
    </>
  );
};

export default TypesInnerData;
