import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react";
import swal from "sweetalert2";
import {
  Login,
  Home
} from "../src/pages"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // authentication logic
    if(username === "admin" & password === "admin"){
      setIsAuthenticated(true);
      // swal.fire({
      //   icon: "success",
      //   title: "Login success!",
      // });
      
    }
    else{
      setIsAuthenticated(false);
      swal.fire({
        icon: "error",
        title: "Wrong username or password!",
        text: "Please try again.",
      });
    }
    
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;


