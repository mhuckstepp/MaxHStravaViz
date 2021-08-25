import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import RunningStats from "./components/RunningStats";
import { Route } from "react-router-dom";


function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div className="App"> Loading...</div>;

  return (
    <div className="App">
      <Route exact path="/">
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        {isAuthenticated && 
        <div>
        <Card className="userCard">
          <Profile></Profile>
        </Card>
        </div>}
      </Route>
      <Route path="/stats">
        <RunningStats />
      </Route>
    </div>
  );
}

export default App;
