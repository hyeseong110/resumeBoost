import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // 로컬 스토리지 사용
import loginSlice from "./../slice/loginSlice"
import cartSlice from "./../slice/cartSlice"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, loginSlice)

const store = configureStore({
  reducer: {
    loginSlice: persistedReducer,
    cartSlice: cartSlice,
  },
})

export const persistor = persistStore(store)
export default store
