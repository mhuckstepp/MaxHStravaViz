import { useState, useEffect} from 'react'
import { apiClient, tokenClient } from '../api'

const RunningStats = () => {
    const [stravaCode, setStravaCode] = useState('')
    const [stravaError, setStravaError] = useState('')
    const [stravaAccessToken, setStravaAccessToken] = useState('')
    const [userInfo, setUserInfo] = useState(
        {
            id: 20352663,
            username: "max_huckstepp",
            resource_state: 2,
            firstname: "Max",
            lastname: "Huckstepp",
            bio: "",
            city: "San Francisco",
            state: "",
            country: null,
            sex: "M",
            premium: true,
            summit: true,
            created_at: "2017-03-09T22:29:12Z",
            updated_at: "2020-10-27T00:46:58Z",
            badge_type_id: 1,
            weight: 74.8427,
            profile_medium: "https://dgalywyr863hv.cloudfront.net/pictures/athletes/20352663/16631638/2/medium.jpg",
            profile: "https://dgalywyr863hv.cloudfront.net/pictures/athletes/20352663/16631638/2/large.jpg",
            friend: null,
            follower: null
        }
    )
    const [stravaData, setStravaData] = useState('')
    
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries())
        setStravaCode(params.code)
        if (params.error){
            setStravaError(params.error)
        }
        console.log(stravaCode);
    }, [])

    console.log(stravaCode);


    let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
    let stravaSecret = process.env["REACT_APP_STRAVA_CLIENT_SECRET"]

    
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
                console.log(response);
                setUserInfo(response.data.athlete)
                setStravaAccessToken(response.data.access_token)
                localStorage.setItem('accessToken', response.data.access_token)
            }).catch(err => {
                console.log(err)
                setStravaError(err)
            })
        }
    }, [stravaCode])
    
    useEffect(() => {
        if (stravaAccessToken){
            apiClient({
                url: `/athletes/${userInfo.id}/stats`,
                method: "get"
            })
                .then((response) => {
                    // return the data
                    console.log(response)
                    setStravaData(response.data)
                })
                .catch((err) => {
                    throw err;
                })
        }
    }, [stravaAccessToken])

    if(stravaError){
        return <div> {JSON.stringify(stravaError)} </div>
    }

    if (!userInfo){
        return <div>Loading...</div>
    }
    
    return (
        <div>
            Hello {userInfo.firstname}
            <br></br>
            {!stravaData && <div>Give us a second while we grab some of your workout data from Strava</div>}
            {stravaData && JSON.stringify(stravaData)}
        </div>
    )
}

export default RunningStats
