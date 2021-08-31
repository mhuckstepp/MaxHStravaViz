import { useState, useEffect} from 'react'
import JSONPretty from 'react-json-pretty'
import { apiClient, getStravaCodeFromParams, tokenClient } from '../../api'
import { userInfoTemplate } from '../../assets/templateObjects'


const RunningStats = () => {
    const [stravaCode, setStravaCode] = useState('')
    const [stravaError, setStravaError] = useState('')
    const [haveValidToken, setHaveValidToken] = useState(false)
    const [userInfo, setUserInfo] = useState(userInfoTemplate)
    const [stravaData, setStravaData] = useState('')
    let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
    let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]
    
    useEffect(() => {
        const params = getStravaCodeFromParams(window)
        setStravaCode(params.code)
        if (params.error){
            setStravaError(params.error)
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
                })
                .catch((err) => {
                    throw err;
                })
        }
    }, [haveValidToken, userInfo.id])

    if(stravaError){
        return <div> <JSONPretty data={stravaError}/> </div>
    }

    if (!userInfo){
        return <div>Loading up your Strava Data...Give us a minute</div>
    }
    
    return (
        <div>
            <h2>Hello {userInfo.firstname}</h2>
            <br></br>
            <h4>Thanks for checking out your Strava info with us.</h4>
            <br></br>
            <p>That's it, that's all the App does :)</p>
            <br></br>
            {userInfo.profile && <img alt={userInfo.username} src={userInfo.profile} />}
            <br></br>
            {!stravaData && <div>Give us a second while we grab some of your workout data from Strava</div>}
            {stravaData && <JSONPretty data={stravaData}/>}
        </div>
    )
}

export default RunningStats
