
import { AuthContextProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContextProvider>
          App goes here
        </AuthContextProvider>
      </header>
    </div>
  )
}

export default App;
