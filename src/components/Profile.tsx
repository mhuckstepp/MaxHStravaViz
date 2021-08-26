import { useAuth0 } from '@auth0/auth0-react'
import { authLink } from "../api";
import {useState} from 'react'

const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
    const [hasStrava, setHasStrava] = useState(0)
    
    if (isAuthenticated && user) {
        return (
            <>
                <h1>Hello {user?.name || user?.email || user?.nickname}</h1>
                    <p> Thanks for visiting. I built this site to demonstrate Auth0 and Strava Integration visually with animated React Components</p>
                <img alt='prof pic' src={user.picture} />
                <p>Do you have Strava?</p>
                {hasStrava === 0 &&
                <div className='bigButtons'>
                    <button type="button" className="btn btn-success m-2" onClick={() => setHasStrava(1)}> Yes </button>
                    <button type="button" className="btn btn-dark m-2" onClick={() => setHasStrava(2)}> No </button>
                </div>}
                {hasStrava !== 0 &&
                <div className='smallButtons'>
                    <button type="button" className="btn btn-success m-1 btn-sm" onClick={() => setHasStrava(1)}> Yes </button>
                    <button type="button" className="btn btn-dark m-1 btn-sm" onClick={() => setHasStrava(2)}> No </button>
                </div>}
                {hasStrava === 1 && <button type="button" className="maxButton btn btn-info m-5" onClick={() => window.location.assign(authLink)}> Grab and display your Strava data </button>}
                {hasStrava === 2 && <button type="button" className=" userButton btn bg-warning text-dark m-5" onClick={() => window.location.assign(authLink)}> Grab and display Max's Strava Data </button>}
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
