import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MainProfileState {
    loggingIn: boolean,
    hasStrava: number,
    stravaLoggingIn: boolean
  }


const initialState: MainProfileState = {
    loggingIn: false,
    hasStrava: 0,
    stravaLoggingIn: false
  }


  export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
      login: (state) => {
        state.loggingIn = true
      },
      stravaLogin: (state) => {
        state.stravaLoggingIn = true
      },
      setStravaStatus: (state, action: PayloadAction<number>) => {
        state.hasStrava = action.payload
      },
    },
  })

  export const { login, stravaLogin, setStravaStatus } = mainSlice.actions
  export default mainSlice.reducer