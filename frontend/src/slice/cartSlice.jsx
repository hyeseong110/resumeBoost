import { createSlice } from "@reduxjs/toolkit"

const initState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  reducers: {
    addItemCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (!existingItem) {
        state.items.push(action.payload)
      }
    },
    removeItemCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addItemCart, removeItemCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
