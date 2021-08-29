import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useAuth0 } from "@auth0/auth0-react"
import { BrowserRouter as Router } from 'react-router-dom';


const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");

describe("Loading screen if loading", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged loading state
    // @ts-ignore
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });
  
  test('Renders Loading on page load', async () => {
    render(<App />);
    const appContainer = screen.getByTestId(/App/i);
    expect(appContainer).toBeInTheDocument();
    const logoutButton = screen.queryByTestId(/LogoutButton/i);
    expect(logoutButton).not.toBeInTheDocument();
  });


});


describe("User displayed on sign in", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    // @ts-ignore
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });
  
  test('renders info when logged in', async () => {
    render(<Router> <App /> </Router>);
    const userName = screen.getAllByText(/johndoe@me.com/i);
    expect(userName[0]).toBeInTheDocument();
    const logoutButton = screen.getByTestId(/LogoutButton/i);
    expect(logoutButton).toBeInTheDocument();
    const loginButton = screen.queryByTestId(/LoginButton/i);
    expect(loginButton).not.toBeInTheDocument();
  });


});

describe("Logged out page", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    // @ts-ignore
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });
  
  test('Renders login button when logged out and no logout button', async () => {
    render(<Router> <App /> </Router>);
    const loginButton = screen.getByTestId(/LoginButton/i);
    expect(loginButton).toBeInTheDocument();
    const logoutButton = screen.queryByTestId(/LogoutButton/i);
    expect(logoutButton).not.toBeInTheDocument();
  });

  test('Clicking login renders new screen', async () => {
    render(<Router> <App /> </Router>);
    const loginButton = screen.getByTestId(/LoginButton/i);
    await fireEvent.click(loginButton)
    const text = screen.getByText(/We are directing you/i)
    expect(text).toBeInTheDocument();
  });


});