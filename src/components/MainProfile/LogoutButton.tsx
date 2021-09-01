import './Profile.css'
import { RootState } from '../../store/store'
import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from 'react-redux'


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()
    const  stravaLoggingIn  = useSelector((state: RootState) => state.main.stravaLoggingIn)
    if (isAuthenticated && !stravaLoggingIn) {
        return (
        <button className='coolButton1' data-testid="LogoutButton" onClick={() => logout()}> Logout</button>
        )
    }

    return null
    
}

export default LogoutButton
