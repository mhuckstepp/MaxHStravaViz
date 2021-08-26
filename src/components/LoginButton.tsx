import { useAuth0 } from "@auth0/auth0-react"
import Step1Ani from "./Step1Ani"

interface Props {
    loggingIn: boolean,
    setLoggingIn: Function
}

const LoginButton = (props: Props) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const { loggingIn, setLoggingIn } = props
    const delayedLogin = () => {
            setLoggingIn(true)
            setTimeout(loginWithRedirect, 4000)
        }

    if (!isAuthenticated) {
    return (
        <>
        {!loggingIn && 
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => delayedLogin()}>
            Login to the App
        </button>
        }
        <br></br>
        {loggingIn && <Step1Ani></Step1Ani>}
        </>
    )
    }

    return null
}

export default LoginButton
