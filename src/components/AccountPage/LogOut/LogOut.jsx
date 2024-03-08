import React from "react";
import styles from "./LogOut.module.scss";
import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  changeTokenName,
  changeTokenNum,
} from "../../../store/reducers/accountSlice";
import { useDispatch } from "react-redux";
import { styleModal } from "../../../helpers/localData";

const LogOut = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutFn = () => {
    dispatch(changeTokenNum(""));
    dispatch(changeTokenName(""));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <button className={styles.btnLogOut} onClick={handleOpen}>
        Выйти
      </button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <div className="modalLogOut">
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Вы действительно хотите выйти?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  padding: "40px 0 15px 0",
                }}
              >
                <button
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#ffc12e",
                    padding: "8px 35px",
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                  onClick={logOutFn}
                >
                  Да
                </button>
                <button
                  style={{
                    fontSize: "20px",
                    backgroundColor: "transparent",
                    border: "1px solid #ffc12e",
                    padding: "8px 35px",
                    borderRadius: "5px",
                    color: "#ffc12e",
                  }}
                  onClick={handleClose}
                >
                  Нет
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default LogOut;
