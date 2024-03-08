import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: "Все",
  pathCatalog: "",
  positionFoods: 0,
  sumOrdersFoods: 0,
  sumDishes: 0,
  delivery: 0, // брать у бэка
  allFoodsOrders: [],
  activeTypeEstab: 0,
  indexSlide: 0, // нужен для того , чтобы центрировать активный слайдер на детальной странице
  listOrdersUser: [],
  countDishes: 1,
};
const statesSlice = createSlice({
  name: "statesSlice",
  initialState: initialState,
  reducers: {
    changePopular: (state, action) => {
      state.popular = action.payload;
    },
    changePathCatalog: (state, action) => {
      state.pathCatalog = action.payload;
    },
    changePositionFoods: (state) => {
      state.positionFoods = state?.allFoodsOrders?.length;
    },
    changeSumOrdersFoods: (state) => {
      const allSum = state.allFoodsOrders?.reduce((sum, obj) => {
        const itemSum = +obj.count * +obj.product_price;
        return sum + itemSum;
      }, 0);
      state.sumOrdersFoods = allSum || 0;
    },
    changeSumDishes: (state) => {
      const allSum = state.allFoodsOrders?.reduce((sum, obj) => {
        const itemSum = (+obj?.count || 0) * (+obj?.posuda_price || 0); // Добавлены скобки
        return +sum + +itemSum;
      }, 0);
      state.sumDishes = +allSum;
    },
    addFoodsOrders: (state, action) => {
      const existingOrderIndex = state.allFoodsOrders.findIndex(
        (obj) => obj.codeid === action.payload.codeid
      );
      if (existingOrderIndex !== -1) {
        // Если заказ с таким codeid уже существует, увеличиваем count
        state.allFoodsOrders = state.allFoodsOrders.map((obj, index) => {
          if (index === existingOrderIndex) {
            return { ...obj, count: obj.count + 1, filial: 1 };
          }
          return obj;
        });
      } else {
        // Иначе добавляем новый заказ
        state.allFoodsOrders = [
          ...state.allFoodsOrders,
          { count: 1, filial: 1, ...action.payload },
        ];
      }
    },
    discountFoods: (state, action) => {
      const { codeid } = action.payload;

      const existingOrderIndex = state.allFoodsOrders.findIndex(
        (obj) => obj.codeid === codeid
      );

      if (existingOrderIndex !== -1) {
        const existingOrder = state.allFoodsOrders[existingOrderIndex];

        if (existingOrder.count > 0) {
          state.allFoodsOrders[existingOrderIndex] = {
            ...existingOrder,
            count: existingOrder.count - 1,
          };
        }
      }
    },
    delfoodCount: (state, action) => {
      const { codeid } = action.payload;
      state.allFoodsOrders = state.allFoodsOrders
        .map((obj) => {
          if (obj.codeid === codeid && obj.count > 0) {
            return { ...obj, count: obj.count - 1 };
          }
          return obj;
        })
        .filter((obj) => obj.count > 0);
    },
    changeActiveType: (state, action) => {
      state.activeTypeEstab = action.payload;
    },
    changeIndexSlide: (state, action) => {
      state.indexSlide = action.payload;
    },
    resetBusket: (state) => {
      state.allFoodsOrders = [];
      state.sumDishes = 0;
      state.positionFoods = 0;
      state.sumOrdersFoods = 0;
      state.countDishes = 1;
    },
    changeAllFoodsOrders: (state, action) => {
      state.allFoodsOrders = [...state.allFoodsOrders, action.payload];
    },
    changeListOrdersUser: (state, action) => {
      state.listOrdersUser = action.payload;
    },
    changeCountDishes: (state, action) => {
      state.countDishes = action.payload; // для подсчета посуды всех продуктов(посуда counter)
    },
  },
});

export const {
  changePopular,
  changePathCatalog,
  changePositionFoods,
  changeSumOrdersFoods,
  changeSumDishes,
  addFoodsOrders,
  changeActiveType,
  changeIndexSlide,
  discountFoods,
  delfoodCount,
  resetBusket,
  changeAllFoodsOrders,
  changeListOrdersUser,
  changeCountDishes,
} = statesSlice.actions;

export default statesSlice.reducer;
