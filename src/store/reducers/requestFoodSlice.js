import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { chnageAlertText } from './EditDataUser';

// беру все данные
// http://kover-site.333.kg/get_establishments/
export const getAllDataFood = createAsyncThunk(
  'getAllDataFood',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.establishment;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

// виды учреждений(нац кухня ....)
// http://kover-site.333.kg/get_estab_category?category_type=filter
// http://kover-site.333.kg/get_estab_category
export const getEstablishmentCategory = createAsyncThunk(
  'getEstablishmentCategory',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.category;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      // dispatch(
      //   chnageAlertText({
      //     text: 'Что-то пошло не так! Повторите попытку позже',
      //     backColor: 'red',
      //   })
      // );
      return rejectWithValue(error.message);
    }
  }
);

// типы (магаз, рестораны, аптеки ...)
// http://kover-site.333.kg/get_estab_category?category_type=main
export const getCategory = createAsyncThunk(
  'getCategory',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.category;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

// беру сортированные данные по учреждениям
// http://kover-site.333.kg/get_establishments?category_code=${id}
export const getEstablishmentData = createAsyncThunk(
  'getEstablishmentData',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.establishment;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

// каждое учреждение
// http://kover-site.333.kg/get_establishments/${id}
export const getEveryData = createAsyncThunk(
  'getEveryData',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      // console.log(response?.data?.establishment);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.establishment;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

// учреждение(магазины, рестораны ...), внутренние типы каждого учреждения
// http://kover-site.333.kg/get_product_categ_estab?estab_code=${id}
export const getEveryInnerTypes = createAsyncThunk(
  'getEveryInnerTypes',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.product_category;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

// учреждение(магазины, рестораны ...), внутренние данные каждого учреждения
// http://kover-site.333.kg/get_discount?code_category=1
export const getDiscounts = createAsyncThunk(
  'getDiscounts',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.discount;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
);

// учреждение(магазины, рестораны ...), сортировка внутренних типов каждого учреждения
// http://kover-site.333.kg/get_product_categ_estab?estab_code=${id}
// export const getSortEveryData = createAsyncThunk(
//   'getSortEveryData',
//   async function (api, { dispatch, rejectWithValue }) {
//     try {
//       const response = await axios(api);
//       if (response.status >= 200 || response.status < 300) {
//         console.log(response);
//         return response?.data?.product;
//       } else {
//         throw Error(`Error: ${response.status}`);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     } finally {
//     }
//   }
// );

// http://kover-site.333.kg/products?search=пирожок?code_establishment=5?code_category=5
// внутренний поиск по продуктам
export const searchInnerFood = createAsyncThunk(
  'searchInnerFood',
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(
        `http://kover-site.333.kg/products?search=${data?.text}&code_establishment=${data?.estab}&code_category=0`
      );
      // console.log(response, "response");
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.product;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// беру каждый продукт определенного учреждения
// http://kover-site.333.kg/products
export const getEveryInnerData = createAsyncThunk(
  'getEveryInnerData',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(api);
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.product;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Беру историю заказов
// http://kover-site.333.kg/history_zakaz/
export const historyOrders = createAsyncThunk(
  'historyOrders',
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(
        `http://kover-site.333.kg/history_zakaz?codeid=${data}`
      );
      if (response.status >= 200 || response.status < 300) {
        return response?.data?.result?.recordset;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Беру детальные истории заказов
// http://kover-site.333.kg/detail_zakaz?codeid=555/
export const takeDetailedHistory = createAsyncThunk(
  'takeDetailedHistory',
  async function (id, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(
        `http://kover-site.333.kg/detail_zakaz?codeid=${id}`
      );
      if (response.status >= 200 || response.status < 300) {
        // console.log(response);
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Главный поиск
// http://kover-site.333.kg/search?category=${data?.searchId}&search=${data?.search}
export const mainSearch = createAsyncThunk(
  'mainSearch',
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(
        `http://kover-site.333.kg/search?category=${data?.typeSearch}&search=${data?.search}`
      );
      if (response.status >= 200 || response.status < 300) {
        response?.data?.result?.length === 0
          ? dispatch(changeEmptySearch(true))
          : dispatch(changeEmptySearch(false));
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initialState = {
  allDataFood: [],
  establishmentCategory: [],
  allCategory: [],
  everyData: {},
  everyInnerTypes: [],
  discounts: [],
  innerData: [],
  dataHistory: [],
  detailedHistory: [],
  dataSearchMain: [],
  loading: false,
  error: false,
  miniLoader: false,
  emptySearch: false,
  search: '',
  typeSearch: 0,
  typeTextSearch: 'По блюдам',
};

const requestFoodSlice = createSlice({
  name: 'requestFoodSlice',
  initialState,
  extraReducers: (builder) => {
    ///// getAllDataFood
    builder.addCase(getAllDataFood.fulfilled, (state, action) => {
      state.loading = false;
      state.allDataFood = action.payload;
    });
    builder.addCase(getAllDataFood.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllDataFood.pending, (state) => {
      state.loading = true;
    });
    ///// getCategory
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.allCategory = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    ///// getEstablishmentData
    builder.addCase(getEstablishmentCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.establishmentCategory = [
        { category_name: 'Все', codeid: 0 },
        ...action.payload,
      ];
    });
    builder.addCase(getEstablishmentCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getEstablishmentCategory.pending, (state) => {
      state.loading = true;
    });
    ////////getEstablishmentData
    builder.addCase(getEstablishmentData.fulfilled, (state, action) => {
      state.loading = false;
      state.allDataFood = action.payload;
    });
    builder.addCase(getEstablishmentData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getEstablishmentData.pending, (state) => {
      state.loading = true;
    });
    ///////////getEveryData
    builder.addCase(getEveryData.fulfilled, (state, action) => {
      state.loading = false;
      state.everyData = action.payload;
    });
    builder.addCase(getEveryData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getEveryData.pending, (state) => {
      state.loading = true;
    });
    ///////////getEveryInnerTypes
    builder.addCase(getEveryInnerTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.everyInnerTypes = [
        { category_name: 'Все', codeid: 0, code_category: 0 },
        ...action.payload,
      ];
    });
    builder.addCase(getEveryInnerTypes.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getEveryInnerTypes.pending, (state) => {
      state.loading = true;
    });
    ///////////getDiscounts
    builder.addCase(getDiscounts.fulfilled, (state, action) => {
      state.loading = false;
      state.discounts = action.payload;
    });
    builder.addCase(getDiscounts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getDiscounts.pending, (state) => {
      state.loading = true;
    });
    ///// getEveryInnerData
    builder.addCase(getEveryInnerData.fulfilled, (state, action) => {
      state.miniLoader = false;
      state.innerData = action.payload;
    });
    builder.addCase(getEveryInnerData.rejected, (state, action) => {
      state.error = action.payload;
      state.miniLoader = false;
    });
    builder.addCase(getEveryInnerData.pending, (state) => {
      state.miniLoader = true;
    });
    // searchInnerFood
    builder.addCase(searchInnerFood.fulfilled, (state, action) => {
      state.miniLoader = false;
      state.innerData = action.payload;
    });
    builder.addCase(searchInnerFood.rejected, (state, action) => {
      state.error = action.payload;
      state.miniLoader = false;
    });
    builder.addCase(searchInnerFood.pending, (state) => {
      state.miniLoader = true;
    });
    //// historyOrders
    builder.addCase(historyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.dataHistory = action.payload;
    });
    builder.addCase(historyOrders.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(historyOrders.pending, (state) => {
      state.loading = true;
    });
    //// takeDetailedHistory
    builder.addCase(takeDetailedHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.detailedHistory = action.payload;
    });
    builder.addCase(takeDetailedHistory.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(takeDetailedHistory.pending, (state) => {
      state.loading = true;
    });
    //// mainSearch
    builder.addCase(mainSearch.fulfilled, (state, action) => {
      state.miniLoader = false;
      state.dataSearchMain = action.payload;
    });
    builder.addCase(mainSearch.rejected, (state, action) => {
      state.error = action.payload;
      state.miniLoader = false;
    });
    builder.addCase(mainSearch.pending, (state) => {
      state.miniLoader = true;
    });
  },
  reducers: {
    sortDataPopular: (state, action) => {
      if (action.payload === 'Все') {
        return;
      } else {
        const sortedData = state.allDataFood.slice().sort((a, b) => {
          if (a.status === action.payload && b.status !== action.payload) {
            return -1; // Перемещаем 'популярные' в начало
          } else if (
            a.status !== action.payload &&
            b.status === action.payload
          ) {
            return 1; // Перемещаем 'популярные' в начало
          }
        });
        state.allDataFood = sortedData;
      }
    },
    changeEstablishmentCategory: (state, action) => {
      // state.establishmentCategory = [
      //   { category_name: 'Все', codeid: 0 },
      //   ...action.payload,
      // ];
      state.establishmentCategory = action.payload;
    },
    openMiniLoader: (state) => {
      state.miniLoader = true;
    },
    changeMainSearch: (state, action) => {
      state.dataSearchMain = action.payload;
    },
    changeEmptySearch: (state, action) => {
      state.emptySearch = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeTypeSearch: (state, action) => {
      state.typeSearch = action.payload;
    },
    changeTypeTextSearch: (state, action) => {
      state.typeTextSearch = action.payload;
    },
  },
});

export const {
  sortDataPopular,
  openMiniLoader,
  changeMainSearch,
  changeEmptySearch,
  changeSearch,
  changeTypeSearch,
  changeTypeTextSearch,
  changeEstablishmentCategory,
} = requestFoodSlice.actions;

export default requestFoodSlice.reducer;
