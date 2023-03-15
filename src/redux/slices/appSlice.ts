import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface AppState {
  theme: "light" | "dark"
  page: "available" | "installed"
}

const initialState: AppState = {
  theme: "dark",
  page: "available",
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
    setPage: (state, action: PayloadAction<"available" | "installed">) => {
      state.page = action.payload
    },
  },
})

export const { setTheme, setPage } = appSlice.actions
export const selectTheme = (state: RootState) => state.app.theme
export const selectPage = (state: RootState) => state.app.page

export default appSlice.reducer
