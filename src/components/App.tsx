import "./App.css";
import { RootState } from "../store/store"
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { Route } from "react-router-dom";
import { useSpring, animated, config } from 'react-spring'
import { ScaleLoader } from 'react-spinners'
import LoginButton from "./MainProfile/LoginButton";
import LogoutButton from "./MainProfile/LogoutButton";
import Profile from "./MainProfile/Profile";
import RunningStats from "./StravaProfile/RunningStats";
import MaxRunningStats from "./StravaProfile/MaxRunningStats";
import { useEffect } from "react";
import { checkValidTokens } from "../services/stravaQuery";



function App() {
  const { isLoading } = useAuth0();
  const  loggingIn  = useSelector((state: RootState) => state.main.loggingIn)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(checkValidTokens())
  }, [dispatch])

  const [springProps, api] = useSpring(() => ({
     to: { opacity: 1 },
     from: { opacity: 0 },
     config: config.molasses 
    }))
  
  if (loggingIn) {
    api.start({to: { opacity: 0 },
      from: { opacity: 1 },
      delay: 9500,
      config: config.molasses })
    }

  return (
    <div className="App" data-testid="App">
      
      {isLoading && <ScaleLoader color='orange' loading/>}
      {!isLoading && (
        <animated.div  style={springProps}>
          <Route exact path="/">
            <LoginButton />
              {!loggingIn &&
                <LogoutButton/>
              }
              <Profile />
          </Route>
          <Route path="/stats">
            <RunningStats />
          </Route>
          <Route path="/maxstats">
            <MaxRunningStats />
          </Route>
        </animated.div>
      )}
    </div>
  );
}

export default App;
