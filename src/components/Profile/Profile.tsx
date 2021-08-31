import "./Profile.css";
import { useAuth0 } from '@auth0/auth0-react'
import { authLink } from "../../api";
import { useState } from 'react'
import { texts } from '../../assets/text';
import JSONPretty from 'react-json-pretty';
import Step2Ani from "./Step2Ani";

const Profile = (props: any) => {
    const {user, isAuthenticated} = useAuth0()
    const { loggingIn } = props
    const [hasStrava, setHasStrava] = useState(0)
    const [stravaLogin, setStravaLogin] = useState(false)

    const clickHasStrava = (doesHave: number) => {
        setHasStrava(doesHave)
    }

    const sendToStrava = (hasStrava: boolean) => {
        setStravaLogin(true)
        setTimeout(() => {
            if (hasStrava){
                window.location.assign(authLink)
            } else {
                window.location.assign(authLink)
            }
        }, 5000)
    }

    const bigButtonStyle = hasStrava === 1 ? "coolButton3" : "coolButton4"

    if (loggingIn) {
        return null
    }

    if (isAuthenticated && user && !stravaLogin) {
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
                {hasStrava === 1 && <button className={bigButtonStyle} onClick={() => sendToStrava(true)}> Grab and display your Strava data </button>}
                {hasStrava === 2 && <button  className={bigButtonStyle}  onClick={() => sendToStrava(false)}> Grab and display Max's Strava Data </button>}
            </div>
        )
    }

    if (stravaLogin) {
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
