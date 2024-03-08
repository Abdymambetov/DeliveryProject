import React from "react";
import "./Alerts.scss";
import { Box, Modal } from "@mui/material";
import { chnageAlertText } from "../../store/reducers/EditDataUser";
import { useDispatch, useSelector } from "react-redux";

const Alerts = () => {
  const dispatch = useDispatch();
  const { alertText } = useSelector((state) => state.EditDataUser);
  const handleOpen = () =>
    dispatch(chnageAlertText({ ...alertText, state: true }));
  const handleClose = () =>
    dispatch(chnageAlertText({ ...alertText, state: false }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    zIndex: 999,
    height: 150,
    bgcolor: alertText.backColor,
    boxShadow: 24,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
  };

  React.useEffect(() => {
    // console.log("Ты кто?");
    setTimeout(() => {
      dispatch(
        chnageAlertText({
          text: "",
          backColor: "",
          state: false,
        })
      );
    }, 4000);
    // return () =>
    //   dispatch(
    //     chnageAlertText({
    //       text: '',
    //       backColor: '',
    //       state: false,
    //     })
    //   );
  }, [alertText?.state]);

  const styleText = {
    color: "#222",
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    textAlign: "center",
  };

  return (
    <Modal
      open={alertText.state}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p style={styleText}>{alertText.text}</p>
      </Box>
    </Modal>
  );
};

export default Alerts;
