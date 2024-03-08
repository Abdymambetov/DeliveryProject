import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import accountSlice from './reducers/accountSlice';
import dataAllSlice from './reducers/dataAllSlice';
import requestFoodSlice from './reducers/requestFoodSlice';
import statesSlice from './reducers/statesSlice';
import EditDataUser from './reducers/EditDataUser';
import ordersListSlice from './reducers/ordersListSlice';
import postRequestSlice from './reducers/postRequestSlice';

const reducer = combineReducers({
  dataAllSlice,
  accountSlice,
  requestFoodSlice,
  statesSlice,
  ordersListSlice,
  EditDataUser,
  postRequestSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['statesSlice', 'accountSlice'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export { store };