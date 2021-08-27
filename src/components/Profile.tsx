import { useAuth0 } from '@auth0/auth0-react'
import { authLink } from "../api";
import { useState } from 'react'
import { texts } from '../assets/text';
import JSONPretty from 'react-json-pretty';
import { useSpring, animated, config } from 'react-spring'

const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
    const [hasStrava, setHasStrava] = useState(0)

    const [buttonProps, buttonapi] = useSpring(() => ({
        to: { opacity: 1, margin: 10, width: 70, height: 50 },
        from: { opacity: 0, margin: 5, width: 70, height: 50 },
       }))

    const clickHasStrava = (doesHave: number) => {
        if (hasStrava === 0){
        buttonapi.start({ 
            to: { opacity: 1, margin: 2, width: 50, height: 30 },
            from: { opacity: 0, margin: 10, width: 60, height: 40  },
            config: config.molasses })
        }
        setHasStrava(doesHave)
    }

    if (isAuthenticated && user) {
        return (
            <div style={userCard}>
                <div > 
                    <h1>Hello {user?.name || user?.email || user?.nickname}</h1>
                    <img alt='prof pic' src={user.picture} />
                    <p> {texts.step2} </p>
                    <p>Here is all the info that comes off of your token (provided to us by Auth0):</p>
                    <JSONPretty data={user} />
                </div>
                <p>Do you have Strava?</p>
                <div>
                    <animated.button style={{
                        backgroundColor: 'orange',
                        borderRadius: 10,
                        ...buttonProps,
                    }} onClick={() => clickHasStrava(1)}> Yes </animated.button>
                    <animated.button style={{
                        backgroundColor: 'cyan',
                        borderRadius: 10,
                        ...buttonProps,
                    }} onClick={() => clickHasStrava(2)}> No </animated.button>
                </div>
                {hasStrava === 1 && <animated.button className="maxButton btn btn-info m-5" onClick={() => window.location.assign(authLink)}> Grab and display your Strava data </animated.button>}
                {hasStrava === 2 && <animated.button  className=" userButton btn bg-warning text-dark m-5"  onClick={() => window.location.assign(authLink)}> Grab and display Max's Strava Data </animated.button>}
            </div>
        )
    }

    return (
            <div style={userCard}>
                <h1>Hello Unknown</h1>
                <p> Thanks for visiting. I built this site to demonstrate Auth0 and Strava Integration visually with animated React Components</p>
                <p> Click Login to the App above to see the process of Auth0</p>
            </div>
        )
}


const userCard: any = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '3% 0',
    padding: '3%',
    background: 'white',
    border: '2px solid lightgray',
    borderRadius: '10px',
    overflowWrap: 'anywhere',
    width: '100%',
  }



export default Profile
