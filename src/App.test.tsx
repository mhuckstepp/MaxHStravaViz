import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuth0 } from "@auth0/auth0-react"


const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");

describe("Loading screen if loading", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });
  
  test('renders Loading on page load', async () => {
    render(<App />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
  });


});


describe("User displayed on sign in", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });
  
  test('renders Loading on page load', async () => {
    render(<App />);
    const linkElement = screen.getByText(/johndoe@me.com/i);
    expect(linkElement).toBeInTheDocument();
  });
});