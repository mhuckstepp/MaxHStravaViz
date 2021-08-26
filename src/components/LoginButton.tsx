import { useAuth0 } from "@auth0/auth0-react"
import { useState } from 'react'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const [loggingIn, setLoggingIn] = useState(false)

    const delayedLogin = () => {
            setLoggingIn(true)
            setTimeout(loginWithRedirect, 3000)
        }

    if (!isAuthenticated) {
    return (
        <>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => delayedLogin()}>
            Login to the App
        </button>
        {loggingIn && <p> We are directing the user (you) to and Auth0 domain that is configured for this App. Once you are there, you will have the chance to create credentials with Auth0 or use an existing provider like google or gitHub who can verify you are who you say you are. </p>}
        </>
    )
    }

    return null
}

export default LoginButton
