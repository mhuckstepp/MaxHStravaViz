import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../store/store"
import JSONPretty from 'react-json-pretty'
import { fetchMaxData, fetchMaxTokens } from "../../services/stravaQuery";
import { maxUserInfo } from '../../assets/templateObjects'
import StravaProfile from './StravaCard/StravaProfile'
import { useAuth0 } from '@auth0/auth0-react'

const MaxRunningStats = () => {
    const {user} = useAuth0()    
    const dispatch = useDispatch()
    const {stravaError, stravaData, loadingStravaData, maxValidToken}  = useSelector((state: RootState) => state.strava)
  
    useEffect(() => {
        if (maxValidToken){
            dispatch(fetchMaxData())
        } else {
            dispatch(fetchMaxTokens())
        }
    }, [maxValidToken, dispatch])

    const userInfo = maxUserInfo
    if (user){
        userInfo.firstname = user.name || user.given_name || user.username || user.name
    }

    if(stravaError.message.length){
        return (
        <div className='errContainer'>
            <div className='userCard'> 
                <span> Sorry we had a problem - go back to <a href='https://maxrunmax.xyz'> maxrunmax.xyz</a> and start over if you would like to try again </span>
            </div>
            <JSONPretty data={stravaError.message}/> 
        </div>
        )}

    if (loadingStravaData){
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
