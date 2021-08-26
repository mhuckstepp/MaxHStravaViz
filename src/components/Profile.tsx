import { useAuth0 } from '@auth0/auth0-react'
import { authLink } from "../api";
import {useState} from 'react'
import { texts } from '../assets/text';
import JSONPretty from 'react-json-pretty';
import { useSpring, animated, config } from 'react-spring'

const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
    const [hasStrava, setHasStrava] = useState(0)

    const [springProps, api] = useSpring(() => ({
        to: { opacity: 1 },
        from: { opacity: 0 },
        config: config.molasses 
       }))
    
    if (isAuthenticated && user) {
        return (
            <>
                <div>
                    <h1>Hello {user?.name || user?.email || user?.nickname}</h1>
                    <img alt='prof pic' src={user.picture} />
                    <p> {texts.step2} </p>
                    <p>Here is all the info that comes off of your token (provided to us by Auth0):</p>
                    <JSONPretty data={user} />
                </div>
                <p>Do you have Strava?</p>
                {hasStrava === 0 &&
                <div className='bigButtons'>
                    <animated.button type="button" className="btn btn-success m-2" onClick={() => setHasStrava(1)}> Yes </animated.button>
                    <animated.button type="button" className="btn btn-dark m-2" onClick={() => setHasStrava(2)}> No </animated.button>
                </div>}
                {hasStrava !== 0 &&
                <div className='smallButtons'>
                    <animated.button  type="button" className="btn btn-success m-1 btn-sm" style={springProps} onClick={() => setHasStrava(1)}> Yes </animated.button>
                    <animated.button type="button" className="btn btn-dark m-1 btn-sm" onClick={() => setHasStrava(2)}> No </animated.button>
                </div>}
                {hasStrava === 1 && <animated.button type="button" className="maxButton btn btn-info m-5" onClick={() => window.location.assign(authLink)}> Grab and display your Strava data </animated.button>}
                {hasStrava === 2 && <animated.button type="button" className=" userButton btn bg-warning text-dark m-5" onClick={() => window.location.assign(authLink)}> Grab and display Max's Strava Data </animated.button>}
            </>
        )
    }

    return (
            <>
                <h1>Hello Unknown</h1>
                <p> Thanks for visiting. I built this site to demonstrate Auth0 and Strava Integration visually with animated React Components</p>
                <p> Click Login to the App above to see the process of Auth0</p>
            </>
        )
}


export default Profile
