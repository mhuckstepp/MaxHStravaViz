import "./Profile.css";
import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { stravaLogin, setStravaStatus } from './mainSlice'
import { authLink } from "../../api";
import { texts } from '../../assets/text';
import JSONPretty from 'react-json-pretty';
import Step2Ani from "./Step2Ani";
import { useHistory } from "react-router-dom";


const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
    let history = useHistory();
    const dispatch = useDispatch()
    const  { loggingIn, hasStrava, stravaLoggingIn }  = useSelector((state: RootState) => state.main)

    const clickHasStrava = (doesHave: number) => {
        dispatch(setStravaStatus(doesHave))
    }

    const sendToStrava = () => {
        if (hasStrava === 1){
            dispatch(stravaLogin())
            setTimeout(() => {
                window.location.assign(authLink)
            }, 5000)
        } else {
            history.push("/maxstats")
        }
    }

    const bigButtonStyle = hasStrava === 1 ? "coolButton3" : "coolButton4"

    if (loggingIn) {
        return null
    }

    if (isAuthenticated && user && !stravaLoggingIn) {
        return (
            <div className='userCard'>
                <div className='userText'> 
                    <h1>Hello {user?.name || user?.email || user?.nickname}</h1>
                    <img alt='prof pic' src={user.picture} />
                    <p> {texts.step2} </p>
                    <p>Here is all the info that comes off of your token (provided to us by Auth0):</p>
                    <JSONPretty data={user} />
                </div>
                <p>Do you have Strava?</p>
                <div className='userButtons'>
                    <button className='coolButton1' onClick={() => clickHasStrava(1)}> Yes </button>
                    <button className='coolButton2' onClick={() => clickHasStrava(2)}> No </button>
                </div>
                {hasStrava === 1 && <button className={bigButtonStyle} onClick={() => sendToStrava()}> Grab and display your Strava data </button>}
                {hasStrava === 2 && <button  className={bigButtonStyle}  onClick={() => sendToStrava()}> Grab and display Max's Strava Data </button>}
            </div>
        )
    }

    if (stravaLoggingIn) {
        return <Step2Ani />
    }
    
    return (
            <div className='userCard'>
                <h1>Hello Stranger</h1>
                <p> Thanks for visiting. I built this site to demonstrate Auth0 and Strava Integration visually with animated React Components</p>
                <p> Click Login above to see the process of Auth0</p>
            </div>
        )
}

export default Profile
