import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface AppState {
  theme: "light" | "dark"
  page: "available" | "installed"
  isLoading: boolean
  errors: string[]
}

const initialState: AppState = {
  theme: "dark",
  page: "available",
  isLoading: false,
  errors: [],
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => ({
      ...state,
      theme: action.payload,
    }),
    setPage: (state, action: PayloadAction<"available" | "installed">) => ({
      ...state,
      page: action.payload,
    }),
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    pushError: (state, action: PayloadAction<string>) => ({
      ...state,
      errors: [...state.errors, action.payload],
    }),
    clearErrors: (state) => {
      console.log("clearErrors")
      return ({ ...state, errors: [] })
    },
  },
})

export const { setTheme, setPage, setIsLoading, pushError, clearErrors } =
  appSlice.actions
export const selectTheme = (state: RootState) => state.app.theme
export const selectPage = (state: RootState) => state.app.page
export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectErrors = (state: RootState) => state.app.errors

export default appSlice.reducer
