import * as React from "react";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changePaginationCount } from "../../../store/reducers/dataAllSlice";
import { Pagination, Stack, Typography } from "@mui/material";

export default function Paginations() {
  const dispatch = useDispatch();
  const { paginationCount } = useSelector((state) => state.dataAllSlice);
  const { allDataFood } = useSelector((state) => state.requestFoodSlice);

  const handleChange = (e, value) => {
    dispatch(changePaginationCount(value));
    localStorage.setItem("paginationMain", value.toString());
  };

  let countPage = Math.ceil(allDataFood?.length / 16);

  return (
    <Typography component="div" className={styles.parentPag}>
      <Stack spacing={2}>
        <Pagination
          count={countPage}
          page={paginationCount}
          onChange={handleChange}
        />
      </Stack>
    </Typography>
  );
}
