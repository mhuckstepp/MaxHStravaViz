import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()
    if (isAuthenticated) {
        return (
        <button onClick={() => logout()}> Logout</button>
        )
    }

    return null
    
}

export default LogoutButton
