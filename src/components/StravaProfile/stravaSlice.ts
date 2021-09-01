import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stravaDataTemplate, userInfoTemplate } from '../../assets/templateObjects'

export interface stravaState {
    stravaCode: string,
    stravaError: {
      message: string
    },
    haveValidToken: boolean,
    userInfo: StravaUserInfo,
    stravaData: StravaData,
    loadingStravaData: boolean
  }


const initialState: stravaState = {
    stravaCode: '',
    stravaError: {message: ''},
    haveValidToken: false,
    userInfo: userInfoTemplate,
    stravaData: stravaDataTemplate,
    loadingStravaData: false
  }


  export const stravaSlice = createSlice({
    name: 'strava',
    initialState,
    reducers: {
      setStravaCode: (state, action: PayloadAction<string>) => {
        state.stravaCode = action.payload
      },
      setStravaError: (state, action: PayloadAction<string>) => {
        state.stravaError.message = action.payload
      },
      setValidTokenStatus: (state, action: PayloadAction<boolean>) => {
        state.haveValidToken = action.payload
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
    },
  })

  export const { setLoading, setStravaCode, setStravaError, setValidTokenStatus, setUserInfo, setStravaData  } = stravaSlice.actions
  export default stravaSlice.reducer