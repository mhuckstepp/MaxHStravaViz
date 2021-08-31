import { useState, useEffect} from 'react'
import JSONPretty from 'react-json-pretty'
import { apiClient, tokenClient } from '../../api'
import { maxUserInfo } from '../../assets/templateObjects'
import StravaProfile from './StravaProfile/StravaProfile'
import { useAuth0 } from '@auth0/auth0-react'

const MaxRunningStats = () => {
    const {user} = useAuth0()    
    const [stravaError, setStravaError] = useState({message: ''})
    const [haveValidToken, setHaveValidToken] = useState(false)
    const [stravaData, setStravaData] = useState({
        gotResponse: false,
        recent_run_totals: {
            count: 0,
            distance: 0,
            moving_time: 0,
            elevation_gain: 0
        },
        all_run_totals: {
            count: 0,
            distance: 0,
            moving_time: 0,
            elapsed_time: 0,
            elevation_gain: 0,
        }
    })
    let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
    let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]
    let refreshToken = process.env["REACT_APP_STRAVA_REFRESH_TOKEN"]
    const userInfo = maxUserInfo
    if (user){
        userInfo.firstname = user.name || user.given_name || user.username || user.name
    }

    useEffect(() => {
            tokenClient({
                url: "/token",
                method: "post",
                params: {
                    client_id: stravaClientID,
                    client_secret: stravaSecret,
                    refresh_token: refreshToken,
                    grant_type: "refresh_token"
                }
            }).then(response => {
                setHaveValidToken(true)
                console.log(response);
                localStorage.setItem('StravaAccessToken', response.data.access_token)
            }).catch(err => {
                setStravaError({message: err})
            })
    }, [stravaClientID, stravaSecret, stravaData, refreshToken])
    
    useEffect(() => {
        if (haveValidToken){
            apiClient({
                url: `/athletes/${userInfo.id}/stats`,
                method: "get"
            })
                .then((response) => {
                    setStravaData(response.data)
                })
                .catch((err) => {
                    setStravaError({message: err})
                    throw err;
                })
        }
    }, [haveValidToken, userInfo.id])

    if(stravaError.message.length){
        return (
        <div className='errContainer'>
            <div className='userCard'> 
                <span> Sorry we had a problem - go back to <a href='https://maxrunmax.xyz'> maxrunmax.xyz</a> and start over if you would like to try again </span>
            </div>
            <JSONPretty data={stravaError.message}/> 
        </div>
        )}

    if (!userInfo){
        return <div>Loading up your Strava Data...Give us a minute</div>
    }
    
    return (
        <>
        <StravaProfile isUsersProfile={false} userInfo={userInfo} stravaData={stravaData} ></StravaProfile>
                <p> See the JSON API response from Strava below </p>
                <JSONPretty data={stravaData}/>
        </>
    )
}

export default MaxRunningStats
