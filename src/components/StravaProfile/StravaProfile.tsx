import './StravaProfile.css'
interface Props {
    stravaData: StravaData,
    userInfo: StravaUserInfo
}

const StravaProfile = (props: Props) => {
    const {userInfo, stravaData} = props
    
    let distance: number = (Number(stravaData.recent_run_totals.distance)/1609.34)
    let time: number = (Number(stravaData.recent_run_totals.moving_time)/3600)
    let elevation: number = (Number(stravaData.recent_run_totals.elevation_gain)*3.28084)
    let everests: number = elevation / 29032;

    return (
        <div className='stravaCard'>
                    <h1>Hello {userInfo?.firstname || userInfo?.username}</h1>
                    <img alt='prof pic' src={userInfo.profile} />
                    <h2> Runs in the last 4 weeks </h2>
                    <p>Number of runs  {stravaData.recent_run_totals.count}</p>
                    <p> Distance {distance.toFixed(1)} miles</p>
                    <p> Exercise time  {time.toFixed(1)} hours</p>
                    <p>  Elevation gain {elevation.toFixed(0)} feet</p>
                    <p>  That is only {everests}% of the way up Everest!</p>
            </div>
    )
}

export default StravaProfile
