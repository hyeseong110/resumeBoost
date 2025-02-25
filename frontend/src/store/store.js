import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
import loginSlice from './../slice/loginSlice';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, loginSlice);

const store = configureStore({
  reducer: {
    loginSlice: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;