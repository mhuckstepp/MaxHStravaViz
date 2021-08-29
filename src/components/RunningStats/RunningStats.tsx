import './RunningStats.css'
import { useState, useEffect} from 'react'
import JSONPretty from 'react-json-pretty'
import { apiClient, getStravaCodeFromParams, tokenClient } from '../../api'
import StravaProfile from '../StravaProfile/StravaProfile'

const RunningStats = () => {
    const [stravaCode, setStravaCode] = useState('')
    const [stravaError, setStravaError] = useState({message: ''})
    const [haveValidToken, setHaveValidToken] = useState(false)
    const [userInfo, setUserInfo] = useState(
        {
            id: 0,
            username: "",
            resource_state: 0,
            firstname: "",
            lastname: "",
            bio: "",
            city: "",
            state: "",
            country: null,
            sex: "M",
            premium: true,
            summit: true,
            created_at: "",
            updated_at: "",
            badge_type_id: 0,
            weight: 0,
            profile_medium: "",
            profile: "",
            friend: null,
            follower: null
        }
    )
    const [stravaData, setStravaData] = useState({
        recent_run_totals: {
            count: "",
            distance: '',
            moving_time: '',
            elevation_gain: ''
        }
    })
    let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
    let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]
    
    useEffect(() => {
        const params = getStravaCodeFromParams(window)
        setStravaCode(params.code)
        if (params.error){
            setStravaError({message: params.error})
        }
    }, [])

    useEffect(() => {
        if (stravaCode){
            tokenClient({
                url: "/token",
                method: "post",
                params: {
                    client_id: stravaClientID,
                    client_secret: stravaSecret,
                    code: stravaCode,
                    grant_type: "authorization_code"
                }
            }).then(response => {
                setUserInfo(response.data.athlete)
                setHaveValidToken(true)
                localStorage.setItem('StravaAccessToken', response.data.access_token)
            }).catch(err => {
                console.log(err)
                setStravaError(err)
            })
        }
    }, [stravaCode, stravaClientID, stravaSecret])
    
    useEffect(() => {
        if (haveValidToken){
            apiClient({
                url: `/athletes/${userInfo.id}/stats`,
                method: "get"
            })
                .then((response) => {
                    setStravaData(response.data)
                    console.log(response.data);
                })
                .catch((err) => {
                    throw err;
                })
        }
    }, [haveValidToken, userInfo.id])

    if(stravaError){
        return (
        <div className='errContainer'>
            <div className='userCard'> 
                <span> Sorry we had a problem - go back to <a href='https://maxrunmax.xyz'> maxrunmax.xyz</a> and start over if you would like to try again </span>
            </div>
            <JSONPretty data={stravaError.message}/> 
        </div>
        )}
    
    return (
        <div>
            {!stravaData && <div>Give us a second while we grab some of your workout data from Strava</div>}
            {stravaData && 
            <> 
            <StravaProfile userInfo={userInfo} stravaData={stravaData} ></StravaProfile>
            <p> See the JSON API response from Strava below </p>
            <JSONPretty data={stravaData}/>
            </>}
        </div>
    )
}
export default RunningStats