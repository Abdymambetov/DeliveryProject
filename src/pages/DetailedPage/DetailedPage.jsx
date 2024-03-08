import React from "react";
import styles from "./DetailedPage.module.scss";
import TypesDetailed from "../../components/DetailedPage/TypesDetailed/TypesDetailed";
import DataCategories from "../../components/DetailedPage/DataCategories/DataCategories";
import PathToFiles from "../../components/PathToFiles/PathToFiles";
import { useDispatch, useSelector } from "react-redux";
import Paginations from "../../components/MainPage/Pagination/Pagination";
import { useParams } from "react-router-dom";
import { getAllDataFood } from "../../store/reducers/requestFoodSlice";

const DetailedPage = () => {
  const dispatch = useDispatch();
  const { estab, id } = useParams();

  const { allDataFood } = useSelector((state) => state.requestFoodSlice);
  const { paginationCount } = useSelector((state) => state.dataAllSlice);
  const { activeTypeEstab } = useSelector((state) => state.statesSlice);

  let startIndex = (paginationCount - 1) * 16;
  let endIndex = paginationCount * 16;

  let sortData = allDataFood?.slice(startIndex, endIndex);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (activeTypeEstab === 0) {
      dispatch(
        getAllDataFood(
          `http://kover-site.333.kg/get_establishments?category_code=${id}`
        )
      );
    }
    /// для получения всех ресторанов дефолтное состояние ("Все")
  }, [paginationCount]);

  // console.log(allDataFood, 'allDataFood');
  // console.log(id);

  return (
    <div className={styles.detailedBlock}>
      <div className="container">
        <div className={styles.detailedBlock__inner}>
          <PathToFiles estab={estab} />
          <TypesDetailed id={id} />
          <DataCategories allDataFood={sortData} />
          {allDataFood?.length !== 0 && <Paginations />}
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;
