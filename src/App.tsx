import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from "@auth0/auth0-react"
import Card from 'react-bootstrap/Card'
import RunningStats from './components/RunningStats';
import { Route } from 'react-router-dom'


function App() {
  const { isLoading } = useAuth0()
  
  if (isLoading) return <div> Loading...</div>
  
  return (
    <div className="App">
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <Card className='userCard'>
      <Profile></Profile>
      <Route path='/stats'>
        <RunningStats />
      </Route>
      </Card>
    </div>
  );
}

export default App;
