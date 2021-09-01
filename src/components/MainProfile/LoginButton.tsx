import { useAuth0 } from "@auth0/auth0-react"
import { RootState } from "../../store/store"
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../MainProfile/mainSlice'
import Step1Ani from "../Step1Ani"


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    const  loggingIn  = useSelector((state: RootState) => state.main.loggingIn)
    const dispatch = useDispatch()
    const delayedLogin = () => {
            dispatch(login())
            setTimeout(loginWithRedirect, 10000)
        }

    if (!isAuthenticated) {
    return (
        <>
        {!loggingIn && 
        <button className="coolButton1" data-testid="LoginButton" onClick={() => delayedLogin()}>
            Login to the App
        </button>
        }
        <div style={loginBoxStyle}>
        <br></br>
        {loggingIn && (
             <Step1Ani/>
        )}
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
