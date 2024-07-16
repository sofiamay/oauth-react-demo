
import { AuthContextProvider } from './context/AuthContext';
import { RouterProvider } from "react-router-dom";
import router from './router';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContextProvider>
        <RouterProvider router={router} />
        </AuthContextProvider>
      </header>
    </div>
  )
}

export default App;
