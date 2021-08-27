import React from 'react'


interface Props {
    stravaData: StravaData,
    userInfo: StravaUserInfo
}

const StravaProfile = (props: Props) => {
    const {userInfo, stravaData} = props

    return (
        <div className='userCard'>
                <div > 
                    <h1>Hello {userInfo?.firstname || userInfo?.username}</h1>
                    <img alt='prof pic' src={userInfo.profile} />
                    <p>Check your Strava stats below</p>
                    <p>{stravaData.recent_run_totals.count}</p>
                    <p>{stravaData.recent_run_totals.distance}</p>
                    <p>{stravaData.recent_run_totals.moving_time}</p>
                    <p>{stravaData.recent_run_totals.elevation_gain}</p>
                </div>
            </div>
    )
}

export default StravaProfile
