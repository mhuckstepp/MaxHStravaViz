import { useAuth0 } from "@auth0/auth0-react"
import './Profile/Profile.css'


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()
    if (isAuthenticated) {
        return (
        <button className='coolButton1' onClick={() => logout()}> Logout</button>
        )
    }

    return null
    
}

export default LogoutButton
