import { useState, useEffect} from 'react'
import axios from 'axios'


const RunningStats = () => {
    const [stravaInfo, setStravaInfo] = useState('')
    
    
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries())
        console.log(params);
    }, [])


    // useEffect(() => {
    //     axios.post('https://www.strava.com/oauth/token')
        
    // }, [])

    if (!stravaInfo){
        return <div>Loading...</div>
    }
    
    return (
        <div>
            {JSON.stringify(stravaInfo)}
        </div>
    )
}

export default RunningStats
