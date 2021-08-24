import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    if (!isAuthenticated) {
    return (
        <button onClick={() => loginWithRedirect()}>
            Login to the App
        </button>
    )
    }

    return null
}

export default LoginButton
