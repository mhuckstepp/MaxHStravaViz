import { useAuth0 } from "@auth0/auth0-react"
import Button from 'react-bootstrap/Button'


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()
    if (isAuthenticated) {
        return (
        <Button onClick={() => logout()}> Logout</Button>
        )
    }

    return null
    
}

export default LogoutButton
