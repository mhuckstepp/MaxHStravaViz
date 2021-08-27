import { useAuth0 } from "@auth0/auth0-react"
import Step1Ani from "./Step1Ani"
import './Profile/Profile.css'

interface Props {
    loggingIn: boolean,
    setLoggingIn: Function
}

const LoginButton = (props: Props) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const { loggingIn, setLoggingIn } = props
    const delayedLogin = () => {
            setLoggingIn(true)
            setTimeout(loginWithRedirect, 15000)
        }

    if (!isAuthenticated) {
    return (
        <>
        {!loggingIn && 
        <button className="coolButton1" onClick={() => delayedLogin()}>
            Login to the App
        </button>
        }
        <div style={loginBoxStyle}>
        <br></br>
        {loggingIn && <Step1Ani></Step1Ani>}
        </div>
        </>
    )
    }

    return null
}

const loginBoxStyle: any = {
    width: '75%',
    alignSelf: 'center',
    margin: 'auto',
    fontSize: '1.5rem'
}

export default LoginButton
