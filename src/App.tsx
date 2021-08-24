import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import RunningStats from "./components/RunningStats";
import { Route } from "react-router-dom";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div> Loading...</div>;

  return (
    <div className="App">
      <Route exact path="/">
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <Card className="userCard">
          <Profile></Profile>
        </Card>
        Here
        <a
          href={
            "https://www.strava.com/oauth/authorize?client_id=69294&redirect_uri=https://www.maxrunmax.xyz/stats&response_type=code&scope=read"
          }
        >
          Login to Strava
        </a>
      </Route>
      <Route path="/stats">
        <RunningStats />
      </Route>
    </div>
  );
}

export default App;
