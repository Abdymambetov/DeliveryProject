import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AccordionSummary } from "@mui/material";
import styles from "./OrderMenu.module.scss";
//// imgs
import imgArrow from "../../../assets/icons/backBtn.svg";
import BaskesOrders from "../BaskesOrders/BaskesOrders";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderMenu = () => {
  const [look, setLook] = React.useState(false);
  const accordionRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccordionToggle = () => {
    setLook(!look);
  };

  React.useEffect(() => {
    const handleClickOutsideAccordion = (e) => {
      if (look && !accordionRef.current.contains(e.target)) {
        setLook(false);
      }
    };

    document.addEventListener("click", handleClickOutsideAccordion);

    return () => {
      document.removeEventListener("click", handleClickOutsideAccordion);
    };
  }, [look]);

  const { positionFoods, sumOrdersFoods, allFoodsOrders } = useSelector(
    (state) => state.statesSlice
  );

  const ordering = () => {
    if (allFoodsOrders.length === 0) {
      return;
    } else {
      look && navigate("/orders");
    }
  };

  // console.log(allFoodsOrders, 'allFoodsOrders');

  return (
    <div className={styles.accordinBlock}>
      <Accordion
        ref={accordionRef}
        expanded={look}
        onChange={handleAccordionToggle}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className={styles.accordinBlock__inner}>
            <button onClick={ordering}>Оформить заказ</button>
            <div
              className={styles.accordinBlock__inner__btns}
              onClick={() => setLook(false)}
            >
              <button>
                <img
                  src={imgArrow}
                  alt="<"
                  className={look ? styles.active : ""}
                />
                <p>Корзина</p>
              </button>
              <div>
                <p>{positionFoods} позиций</p>
                <span>{sumOrdersFoods} сом</span>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.basketBlock}>
            {allFoodsOrders?.length === 0 ? (
              <p className="noneFoods">Ваша корзина пустая!</p>
            ) : (
              allFoodsOrders?.map((item, ind) => (
                <BaskesOrders key={ind} item={item} />
              ))
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrderMenu;
