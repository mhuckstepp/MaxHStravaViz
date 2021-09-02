import {tokenClient, apiClient} from '../api/index'
import {setValidTokenStatus, setLoading, setStravaError, setStravaData} from '../components/StravaProfile/stravaSlice'
import { Dispatch } from 'redux';

let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]
let refreshToken = process.env["REACT_APP_STRAVA_REFRESH_TOKEN"]

export const fetchMaxData = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    const response = await tokenClient({
      params: {
          client_id: stravaClientID,
          client_secret: stravaSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token"
      }
    })
      if(response.data && response.data.access_token){
          localStorage.setItem('StravaAccessToken', response.data.access_token)
          dispatch(setValidTokenStatus(true))
          fetchStravaData(dispatch, 20352663)
      } else {
          dispatch(setStravaError('Sorry we had trouble getting the access token'))
          dispatch(setLoading(false))
      }
  }
}

const fetchStravaData = async (dispatch: Dispatch<any>, userId: Number) => {
    const response = await apiClient({
    url: `/athletes/${userId}/stats`,
    method: "get"
  })
  dispatch(setLoading(false))
  if (response.data ){
        dispatch(setStravaData({...response.data, gotResponse: true }))
    } else{
      dispatch(setStravaError(response.data.message))
      throw Error;
    }
    }