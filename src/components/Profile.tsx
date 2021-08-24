import { useAuth0 } from '@auth0/auth0-react'
import JSONPretty from 'react-json-pretty';

const Profile = () => {
    const {user, isAuthenticated} = useAuth0()
    console.log('profile rendered');
    console.log(user);
    
    if (isAuthenticated && user) {
        return (
            <div>
                <h1>Hello {user?.name}</h1>
                <JSONPretty data={user}/>
                <img alt='prof pic' src={user.picture} />
            </div>
        )
    }

    return (
        <div>
            Login to see user info
        </div>
    )
}

export default Profile
