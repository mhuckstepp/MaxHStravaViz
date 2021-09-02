import './RunningStats.css'
import { RootState } from "../../store/store"
import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import JSONPretty from 'react-json-pretty'
import { fetchUserTokens } from '../../services/stravaQuery'
import StravaProfile from './StravaCard/StravaProfile'


const RunningStats = () => {
    const dispatch = useDispatch()
    const {stravaError, stravaData, loadingStravaData, userInfo}  = useSelector((state: RootState) => state.strava)

    useEffect(() => {
        dispatch(fetchUserTokens(window))
    }, [dispatch])

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
            {!stravaData.gotResponse && <div>Give us a second while we grab some of your workout data from Strava</div>}
            {stravaData.gotResponse && 
                <> 
                <StravaProfile isUsersProfile={true} userInfo={userInfo} stravaData={stravaData} ></StravaProfile>
                <p> See the JSON API response from Strava below </p>
                <JSONPretty data={stravaData}/>
                </>
            }
        </>
    )
}
export default RunningStats
