import {tokenClient, apiClient, maxClient} from '../api/index'
import { setLoading, setStravaError, setStravaData, setUserInfo, setMaxValidToken, setStravaValidToken} from '../components/StravaProfile/stravaSlice'
import { Dispatch } from 'redux';

let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]
let refreshToken = process.env["REACT_APP_STRAVA_REFRESH_TOKEN"]

export const fetchUserTokens = (window: any) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    const urlSearchParams = new URLSearchParams(window.location.search);
    const stravaCode = Object.fromEntries(urlSearchParams.entries())
    if (stravaCode.error || !stravaCode.code){
      dispatch(setStravaError('Sorry we had trouble getting the user token'))
      dispatch(setLoading(false))
      console.log('error object', stravaCode.error, stravaCode.code)
      return
      }
    try {
        const tokenResponse = await tokenClient({
            params: {
                client_id: stravaClientID,
                client_secret: stravaSecret,
                code: stravaCode.code,
                grant_type: "authorization_code"
            }
          })
          await localStorage.setItem('StravaAccessToken', tokenResponse.data.access_token)
          await localStorage.setItem('StravaAccessExpiration', tokenResponse.data.expires_at)
          dispatch(setUserInfo(tokenResponse.data.athlete))
          fetchStravaData(dispatch, tokenResponse.data.athlete.id)
      } catch {
          dispatch(setStravaError('Sorry we had trouble getting the access token'))
          dispatch(setLoading(false))
        }
    }
  }  

export const fetchMaxTokens = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    try {
    const response = await tokenClient({
      params: {
          client_id: stravaClientID,
          client_secret: stravaSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token"
      }
    })
    await localStorage.setItem('MaxAccessToken', response.data.access_token)
    await localStorage.setItem('MaxAccessExpiration', response.data.expires_at)
        try{
          const response = await maxClient({
            url: `/athletes/20352663/stats`,
            method: "get"
          })
          dispatch(setLoading(false))
          dispatch(setStravaData({...response.data, gotResponse: true }))
      }  catch {
        dispatch(setStravaError('Sorry we had trouble getting the user data'))
        throw Error;
      }
    } catch {
      dispatch(setStravaError('Sorry we had trouble getting the user data'))
      dispatch(setLoading(false))
    }
      }
  }

export const fetchStravaData = async (dispatch: Dispatch<any>, userId: Number) => {
  dispatch(setLoading(true))
  try{
        const response = await apiClient({
          url: `/athletes/${userId}/stats`,
          method: "get"
        })
        dispatch(setLoading(false))
        dispatch(setStravaData({...response.data, gotResponse: true }))

    }  catch {
    dispatch(setStravaError('Sorry we had trouble getting the user data'))
    dispatch(setLoading(true))
    throw Error;
    }
}

export const fetchMaxData = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
        try{
          const response = await maxClient({
            url: `/athletes/20352663/stats`,
            method: "get"
          })
          dispatch(setLoading(false))
          dispatch(setStravaData({...response.data, gotResponse: true }))
      }  catch {
        dispatch(setStravaError('Sorry we had trouble getting the user data'))
        throw Error;
      }
    } 
  }

  export const checkValidTokens = () => {
    return async (dispatch: Dispatch<any>) => {
      console.log('run in stravquery');
      
      let currTime = Number(Date.now().toString().slice(0, 10))
      const maxExpirationTime = Number(localStorage.getItem('MaxAccessExpiration'))
      const maxLastAccessToken = localStorage.getItem('MaxAccessToken')
      if (currTime < maxExpirationTime && maxLastAccessToken){
            dispatch(setMaxValidToken())
      }
      const stravaExpirationTime = Number(localStorage.getItem('StravaAccessExpiration'))
      const stravaLastAccessToken = localStorage.getItem('StravaAccessToken')
      if (currTime < stravaExpirationTime && stravaLastAccessToken){
        dispatch(setStravaValidToken())
  }
    }
  }