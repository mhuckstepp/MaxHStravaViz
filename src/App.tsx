import "./App.css";
import { useState } from 'react'
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import RunningStats from "./components/RunningStats";
import { Route } from "react-router-dom";
import { useSpring, animated, config } from 'react-spring'
import { ScaleLoader } from 'react-spinners'


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
      delay: 14500,
      config: config.molasses })
    }

  return (
    <div className="App">
    {isLoading && <ScaleLoader color='green' loading/>}
    {!isLoading && <animated.div  style={springProps}>
      <Route exact path="/">
        <LoginButton loggingIn={loggingIn} setLoggingIn={setLoggingIn}></LoginButton>
        {!loggingIn &&
        <>
          <LogoutButton></LogoutButton>
          <Profile></Profile>
        </>
        }
      </Route>
      <Route path="/stats">
        <RunningStats />
      </Route>
      </animated.div>}
    </div>
  );
}

export default App;
