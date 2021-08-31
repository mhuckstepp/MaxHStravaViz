import "./App.css";
import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Route } from "react-router-dom";
import { useSpring, animated, config } from 'react-spring'
import { ScaleLoader } from 'react-spinners'
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile/Profile";
import RunningStats from "./components/RunningStats/RunningStats";
import MaxRunningStats from "./components/RunningStats/MaxRunningStats";



function App() {
  const { isLoading } = useAuth0();
  const [loggingIn, setLoggingIn] = useState(false)
  
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
            <LoginButton loggingIn={loggingIn} setLoggingIn={setLoggingIn}/>
              {!loggingIn &&
                <LogoutButton/>
              }
              <Profile loggingIn={loggingIn} />
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
