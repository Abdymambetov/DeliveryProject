import React from 'react';
import styles from './SelectInput.module.scss';
import img from '../../../assets/icons/backBtn.svg';
import { useDispatch} from 'react-redux';

const SelectInput = ({ setSearchId }) => {
  const [active, setActive] = React.useState(false);
  const accordionRef = React.useRef(null);
  const dispatch = useDispatch();

  const selectArr = [
    { id: 0, name: 'По блюдам' },
    { id: 1, name: 'По ресторанам' },
  ];
  const [type, setType] = React.useState(selectArr?.[0]?.name);

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
    setType(name);
  };

  //   React.useEffect(() => {
  //     setTimeout(() => {
  //       dispatch(sortDataPopular(popular));
  //     }, 2000);
  //   }, [popular]);
  const clickChoice = (id, name) => {
    setSearchId(id);
    clickSelect(name);
  };

  return (
    <div className={styles.selectBlock} id="uniqueSelectID" ref={accordionRef}>
      <div
        className={styles.selectBlock__inner}
        onClick={() => setActive((prevState) => !prevState)}
      >
        <p>{type}</p>
        <img
          src={img}
          alt="<"
          style={active ? { transform: 'rotate(90deg)' } : {}}
        />
      </div>
      {active && (
        <div className={styles.selectBlock__activeBlock}>
          {selectArr?.map((sel) => (
            <p onClick={() => clickChoice(sel?.id, sel?.name)} key={sel.id}>
              {sel.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
