import {tokenClient, apiClient} from '../api/index'
import { setLoading, setStravaError, setStravaData, setUserInfo} from '../components/StravaProfile/stravaSlice'
import { Dispatch } from 'redux';

let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]
let refreshToken = process.env["REACT_APP_STRAVA_REFRESH_TOKEN"]

export const fetchUserData = (window: any) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    const urlSearchParams = new URLSearchParams(window.location.search);
    const stravaCode = Object.fromEntries(urlSearchParams.entries())
    console.log('stravacode', stravaCode)
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
          dispatch(setUserInfo(tokenResponse.data.athlete))
          fetchStravaData(dispatch, tokenResponse.data.athlete.id)
      } catch {
          dispatch(setStravaError('Sorry we had trouble getting the access token'))
          dispatch(setLoading(false))
        }
    }
  }  

export const fetchMaxData = () => {
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
    localStorage.setItem('StravaAccessToken', response.data.access_token)
    fetchStravaData(dispatch, 20352663)
    } catch {
      dispatch(setStravaError('Sorry we had trouble getting the user data'))
      dispatch(setLoading(false))
    }
      }
  }

const fetchStravaData = async (dispatch: Dispatch<any>, userId: Number) => {
  try{
        const response = await apiClient({
          url: `/athletes/${userId}/stats`,
          method: "get"
        })
        dispatch(setLoading(false))
        dispatch(setStravaData({...response.data, gotResponse: true }))

    }  catch {
    dispatch(setStravaError('Sorry we had trouble getting the user data'))
    throw Error;
    }
}