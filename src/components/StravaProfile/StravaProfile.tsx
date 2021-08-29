import './StravaProfile.css'
interface Props {
    stravaData: StravaData,
    userInfo: StravaUserInfo
}

const StravaProfile = (props: Props) => {
    const {userInfo, stravaData} = props

    return (
        <div className='stravaCard'>
                    <h1>Hello {userInfo?.firstname || userInfo?.username}</h1>
                    <img alt='prof pic' src={userInfo.profile} />
                    <p>Check your Strava stats below</p>
                    <h2> Runs in the last 4 weeks </h2>
                    <p>Number of runs  {stravaData.recent_run_totals.count}</p>
                    <p> Distance {(Number(stravaData.recent_run_totals.distance)/1609.34).toFixed(1)} miles</p>
                    <p> Exercise time  {(Number(stravaData.recent_run_totals.moving_time)/3600).toFixed(1)} hours</p>
                    <p>  Elevation gain {(Number(stravaData.recent_run_totals.elevation_gain)*3.28084).toFixed(0)} feet</p>
            </div>
    )
}

export default StravaProfile
