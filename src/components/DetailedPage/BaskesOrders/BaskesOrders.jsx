import React from 'react';
import styles from './BaskesOrders.module.scss';
import { useDispatch } from 'react-redux';
import {
  addFoodsOrders,
  changePositionFoods,
  changeSumDishes,
  changeSumOrdersFoods,
  delfoodCount,
  discountFoods,
} from '../../../store/reducers/statesSlice';

const BaskesOrders = ({ item }) => {
  const dispatch = useDispatch();
  const count = item.count || 0;

  const handleCounter = (type) => {
    if (type === 'add') {
      dispatch(addFoodsOrders(item));
    } else if (type === 'del' && count > 0) {
      dispatch(discountFoods({ codeid: item.codeid }));
      dispatch(delfoodCount({ count: item.count }));
    }
    dispatch(changeSumOrdersFoods());
    dispatch(changePositionFoods());
    dispatch(changeSumDishes());
  };

  return (
    <div className={styles.basketBlock__every}>
      <div className={styles.mainImg}>
        <img src={item.photo} alt="временно" />
      </div>
      <div className={styles.mainInfo}>
        <h4>{item.product_name}</h4>
        <p>{item.product_price} сом</p>
      </div>
      <div className={styles.counter}>
        <button onClick={() => handleCounter('del')}>-</button>
        <p>{item.count}</p>
        <button onClick={() => handleCounter('add')}>+</button>
      </div>
    </div>
  );
};

export default BaskesOrders;
