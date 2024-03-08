import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  changeDataUser,
  changeTokenName,
  changeTokenNum,
} from "./accountSlice";
import { transformNumber } from "../../helpers/transformNumber";

// Редактирование имени пользователя
// http://kover-site.333.kg/edit_profile/
export const editNameUser = createAsyncThunk(
  "editNameUser",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/edit_profile/",
        {
          codeid: data?.dataUser?.idUser,
          client_fio: data?.inputName,
          client_phone: "",
          client_phone2: "",
          address: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(changeDataUser({ ...data?.dataUser, name: data?.inputName }));
        dispatch(changeTokenName(data?.inputName));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Редактирование номера пользователя
// http://kover-site.333.kg/edit_profile/
export const editNumUser = createAsyncThunk(
  "editNumUser",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/edit_profile/",
        {
          codeid: data?.dataUser?.idUser,
          client_fio: "",
          client_phone: data?.tokenNum?.replace(/[-()]/g, "")?.slice(-9),
          client_phone2: data?.inputNum?.replace(/[-()]/g, "")?.slice(-9),
          address: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        // console.log(response?.data?.error);
        if (
          response?.data?.error === "Введите новый номер!" ||
          response?.data?.error === "Этот номер занят!"
        ) {
          dispatch(changeError("ошибка"));
          dispatch(
            chnageAlertText({
              text: "Этот номер уже занят!",
              backColor: "red",
              state: true,
            })
          );
          dispatch(changeInputNum(""));
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Подтверждение номера пользователя
// http://kover-site.333.kg/check_code/
export const checkNumUser = createAsyncThunk(
  "checkNumUser",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/check_code/",
        {
          phone_client: transformNumber(data?.inputNum),
          verification_number: data?.code?.join(""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(
          changeDataUser({ ...data?.dataUser, numberPhone: data?.inputNum })
        );
        dispatch(changeTokenNum(data?.inputNum));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Редактирование адреса пользователя
// http://kover-site.333.kg/edit_profile/
export const editPlaceUser = createAsyncThunk(
  "editPlaceUser",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/edit_profile/",
        {
          codeid: data?.dataUser?.idUser,
          client_fio: "",
          client_phone: "",
          client_phone2: "",
          address: `${data?.placeUser?.mainAdres}, ${data?.placeUser?.noMainAdres}, ${data?.placeUser?.infoDop}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(
          changeDataUser({
            ...data?.dataUser,
            contacts: [
              data?.placeUser?.mainAdres || "",
              data?.placeUser?.noMainAdres || "",
              data?.placeUser?.infoDop || "",
            ],
          })
        );
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initialState = {
  alertText: {
    text: "",
    backColor: "",
    state: false,
  },
  inputNum: "",
  loadingEdit: false,
  errorEdit: null,
};

const EditDataUser = createSlice({
  name: "EditDataUser",
  initialState,
  extraReducers: (builder) => {
    //// editNameUser
    builder.addCase(editNameUser.fulfilled, (state) => {
      state.loadingEdit = false;
      state.alertText = {
        text: "Ваше ФИО успешно переименовано!",
        backColor: "#ffc12e",
        state: true,
      };
    });
    builder.addCase(editNameUser.rejected, (state, action) => {
      state.errorEdit = action.payload;
      state.alertText = {
        text: "Не удалось изменить ваше ФИО, попробуйте позже...",
        backColor: "#ffc12e",
        state: true,
      };
      state.loadingEdit = false;
    });
    builder.addCase(editNameUser.pending, (state) => {
      state.loadingEdit = true;
    });
    ////// editNumUser
    builder.addCase(editNumUser.fulfilled, (state) => {
      state.loadingEdit = false;
      // state.alertText = {
      //   text: 'Ваш номер успешно переименован!',
      //   backColor: 'green',
      //   state: true,
      // };
    });
    builder.addCase(editNumUser.rejected, (state, action) => {
      state.errorEdit = action.payload;
      state.alertText = {
        text: "Не удалось изменить номер, попробуйте еще раз...",
        backColor: "#ffc12e",
        state: true,
      };
      state.loadingEdit = false;
    });
    builder.addCase(editNumUser.pending, (state) => {
      state.loadingEdit = true;
    });
    ////// checkNumUser
    builder.addCase(checkNumUser.fulfilled, (state) => {
      state.loadingEdit = false;
      state.alertText = {
        text: "Ваш номер успешно переименован!",
        backColor: "#ffc12e",
        state: true,
      };
    });
    builder.addCase(checkNumUser.rejected, (state, action) => {
      state.errorEdit = action.payload;
      state.alertText = {
        text: "Не удалось изменить номер, попробуйте еще раз...",
        backColor: "#ffc12e",
        state: true,
      };
      state.loadingEdit = false;
    });
    builder.addCase(checkNumUser.pending, (state) => {
      state.loadingEdit = true;
    });
    /////// editPlaceUser
    builder.addCase(editPlaceUser.fulfilled, (state) => {
      state.loadingEdit = false;
      state.alertText = {
        text: "Ваш адрес успешно переименован!",
        backColor: "#ffc12e",
        state: true,
      };
    });
    builder.addCase(editPlaceUser.rejected, (state, action) => {
      state.errorEdit = action.payload;
      state.alertText = {
        text: "Не удалось изменить ваш адрес, попробуйте еще раз...",
        backColor: "#ffc12e",
        state: true,
      };
      state.loadingEdit = false;
    });
    builder.addCase(editPlaceUser.pending, (state) => {
      state.loadingEdit = true;
    });
  },

  reducers: {
    changeOrderUser: (state, action) => {
      state.orderUser = action.payload;
    },
    chnageAlertText: (state, action) => {
      state.alertText = action.payload;
    },
    changeInputNum: (state, action) => {
      state.inputNum = action.payload;
    },
    changeError: (state, action) => {
      state.errorEdit = action.payload;
    },
  },
});

export const { changeOrderUser, chnageAlertText, changeInputNum, changeError } =
  EditDataUser.actions;

export default EditDataUser.reducer;
