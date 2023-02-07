import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react";
import {
  Login,
  LandingPage
} from "../src/pages"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // Add your authentication logic here
    if(username === "admin" & password === "admin"){
      setIsAuthenticated(true);
      
    }
    else{
      setIsAuthenticated(false);
      console.log("username or password is wrong")
    }
    
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <LandingPage /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;


