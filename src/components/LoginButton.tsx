import { useAuth0 } from "@auth0/auth0-react"
import Button from 'react-bootstrap/Button'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    if (!isAuthenticated) {
    return (
        <Button variant="outline-info" onClick={() => loginWithRedirect()}>
            Login to the App
        </Button>
    )
    }

    return null
}

export default LoginButton
