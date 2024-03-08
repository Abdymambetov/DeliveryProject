import React from 'react';
import styles from './SelectsPopular.module.scss';
import img from '../../../assets/icons/backBtn.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changePaginationCount } from '../../../store/reducers/dataAllSlice';
import { changePopular } from '../../../store/reducers/statesSlice';
import { sortDataPopular } from '../../../store/reducers/requestFoodSlice';

const SelectsPopular = () => {
  const [active, setActive] = React.useState(false);
  const accordionRef = React.useRef(null);
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.statesSlice);

  const selectArr = [
    { id: 1, name: 'Все' },
    { id: 2, name: 'Популярно' },
    { id: 3, name: 'Топ' },
    { id: 4, name: 'Акция' },
    { id: 5, name: 'Новинка' },
  ];

  React.useEffect(() => {
    const handleChange = (e) => {
      if (
        active &&
        accordionRef.current &&
        !accordionRef.current.contains(e.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleChange);

    return () => {
      document.removeEventListener('click', handleChange);
    };
  }, [active]);

  const clickSelect = (name) => {
    setActive(false);
    dispatch(changePaginationCount(1));
    dispatch(sortDataPopular(name));
    dispatch(changePopular(name));
  };

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(sortDataPopular(popular));
    }, 2000);
  }, [popular]);

  return (
    <div className={styles.selectBlock} id="uniqueSelectID" ref={accordionRef}>
      <div
        className={styles.selectBlock__inner}
        onClick={() => setActive((prevState) => !prevState)}
      >
        <p>{popular}</p>
        <img
          src={img}
          alt="<"
          style={active ? { transform: 'rotate(90deg)' } : {}}
        />
      </div>
      {active && (
        <div className={styles.selectBlock__activeBlock}>
          {selectArr?.map((sel) => (
            <p onClick={() => clickSelect(sel?.name)} key={sel.id}>
              {sel.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectsPopular;
