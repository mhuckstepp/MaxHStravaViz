import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stravaDataTemplate, userInfoTemplate } from '../../assets/templateObjects'

export interface stravaState {
    stravaError: {
      message: string 
    },
    userInfo: StravaUserInfo,
    stravaData: StravaData,
    loadingStravaData: boolean,
    maxValidToken: boolean,
    stravaValidToken: boolean
  }


const initialState: stravaState = {
    stravaError: {message: ''},
    userInfo: userInfoTemplate,
    stravaData: stravaDataTemplate,
    loadingStravaData: false,
    maxValidToken: false,
    stravaValidToken: false
  }


  export const stravaSlice = createSlice({
    name: 'strava',
    initialState,
    reducers: {
      setStravaError: (state, action: PayloadAction<string>) => {
        state.stravaError.message = action.payload
      },
      setUserInfo: (state, action: PayloadAction<StravaUserInfo>) => {
        state.userInfo = action.payload
      },
      setStravaData: (state, action: PayloadAction<StravaData>) => {
        state.stravaData = action.payload
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loadingStravaData = action.payload
      },
      setMaxValidToken: (state) => {
        state.maxValidToken = true
      },
      setStravaValidToken: (state) => {
        state.stravaValidToken = true
      },
    },
  })

  export const { setLoading, setStravaError, setUserInfo, setStravaData, setStravaValidToken, setMaxValidToken  } = stravaSlice.actions
  export default stravaSlice.reducer