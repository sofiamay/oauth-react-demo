import { createContext, useContext, useState, useCallback, useEffect, PropsWithChildren } from "react";
import axios from 'axios';
import { SERVER_URL, SERVER_LOGGED_IN_PATH, SERVER_LOG_OUT_PATH } from '../../constants';

// Ensures cookie is sent
axios.defaults.withCredentials = true;

const loggedInUrl = `${SERVER_URL}/${SERVER_LOGGED_IN_PATH}`;
const logOutUrl = `${SERVER_URL}/${SERVER_LOG_OUT_PATH}`;

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
      } = await axios.get(loggedInUrl);
      setLoggedIn(logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post(logOutUrl);
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