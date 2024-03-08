import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { changeListOrdersUser } from "./statesSlice";
import { chnageAlertText } from "./EditDataUser";

// Отправка заказа по списку
// http://kover-site.333.kg/create_zakaz_list/
export const sendOrderFoods = createAsyncThunk(
  "sendOrderFoods",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/create_zakaz_list/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(clearDataListOrders());
        dispatch(changeListOrdersUser([]));
        dispatch(changePathSite(true));
        setTimeout(() => {
          dispatch(changePathSite(false));
        }, 1000);
        // dispatch(
        //   chnageAlertText({
        //     text: "Ваш заказ был успешно создан! С вами в скором времени свяжется оператор. Спасибо что выбрали нас!",
        //     backColor: "#ffc12e",
        //     state: true,
        //   })
        // );
      } else {
        // dispatch(
        //   chnageAlertText({
        //     text: "Упс! Что-то пошло не так... Повторите попытку позже!",
        //     backColor: "#ffc12e",
        //     state: true,
        //   })
        // );
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Услуги курьера
// http://kover-site.333.kg/client_time_delivery/
export const sendCourier = createAsyncThunk(
  "sendCourier",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios.post(
        "http://kover-site.333.kg/create_zakaz_courier/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 || response.status < 300) {
        dispatch(clearDeliveryOrders());
        dispatch(
          chnageAlertText({
            text: "Ваша заяка была успешно отправлена! С вами в скором времени свяжется оператор. Спасибо что выбрали нас!",
            backColor: "#ffc12e",
            state: true,
          })
        );
        dispatch(changePathSite(true));
        setTimeout(() => {
          dispatch(changePathSite(false));
        }, 1000);
      } else {
        dispatch(
          chnageAlertText({
            text: "Упс! Что-то пошло не так... Повторите попытку позже!",
            backColor: "#ffc12e",
            state: true,
          })
        );
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  dataListOrders: {
    phone: "",
    fio: "",
    client_adress: "",
    client_time_delivery: "",
    oplata_type: 2,
    sdacha: "",
    comment_zakaz: "",
    product_list: [],
  },
  deliveryOrders: {
    phone: "",
    fio: "",
    adress_from: "",
    apartment_address_from: "",
    time_from: "",
    adress_to: "",
    apartment_address_to: "",
    time_to: "",
    descr_delivery: "",
    gab_gruz: 0,
    sdacha: "",
    comment_zakaz: "",
    oplata_type: 2,
    dostavka_type: 1,
  },
  pathSite: false,
  loadingList: false,
  errorList: false,
};

const ordersListSlice = createSlice({
  name: "ordersListSlice",
  initialState,
  extraReducers: (builder) => {
    //// sendOrderFoods
    builder.addCase(sendOrderFoods.fulfilled, (state) => {
      state.loadingList = false;
    });
    builder.addCase(sendOrderFoods.rejected, (state, action) => {
      state.errorList = action.payload;
      state.loadingList = false;
    });
    builder.addCase(sendOrderFoods.pending, (state) => {
      state.loadingList = true;
    });
    //// sendCourier
    builder.addCase(sendCourier.fulfilled, (state) => {
      state.loadingList = false;
    });
    builder.addCase(sendCourier.rejected, (state, action) => {
      state.errorList = action.payload;
      state.loadingList = false;
    });
    builder.addCase(sendCourier.pending, (state) => {
      state.loadingList = true;
    });
  },

  reducers: {
    changeDataListOrders: (state, action) => {
      state.dataListOrders = action.payload;
    },
    changeDeliveryOrders: (state, action) => {
      state.deliveryOrders = action.payload;
    },
    changePathSite: (state, action) => {
      state.pathSite = action.payload;
      setTimeout(() => {
        state.pathSite = false;
      }, 1000);
    },
    clearDataListOrders: (state) => {
      state.dataListOrders = {
        phone: "",
        fio: "",
        client_adress: "",
        client_time_delivery: "",
        oplata_type: 2,
        sdacha: "",
        comment_zakaz: "",
        product_list: [],
      };
    },
    clearDeliveryOrders: (state) => {
      state.deliveryOrders = {
        phone: "",
        fio: "",
        adress_from: "",
        apartment_address_from: "",
        time_from: "",
        adress_to: "",
        apartment_address_to: "",
        time_to: "",
        descr_delivery: "",
        gab_gruz: 0,
        sdacha: "",
        comment_zakaz: "",
        oplata_type: 2,
        dostavka_type: 1,
      };
    },
  },
});
export const {
  changeDataListOrders,
  changeDeliveryOrders,
  clearDataListOrders,
  changePathSite,
  clearDeliveryOrders,
} = ordersListSlice.actions;

export default ordersListSlice.reducer;
