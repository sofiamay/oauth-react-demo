import { createContext, useContext, useState, useCallback, useEffect, PropsWithChildren } from "react";
import axios from 'axios';

// Ensures cookie is sent
axios.defaults.withCredentials = true;

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface AuthContextInterface {
  loggedIn: boolean;
  user: {
    name: string;
    email: string;
    picture: string;
  };
  checkLoginState: (value: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    picture: '',
  });

  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/auth/logged_in`);
      setLoggedIn(logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post(`${serverUrl}/auth/logout`)
      // Check login state again
      checkLoginState();
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  )
}