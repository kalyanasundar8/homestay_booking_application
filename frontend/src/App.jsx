import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

//! Components 
import Register from "./components/Register";
import Login from "./components/Login";
import Booking from "./components/Booking";
import HomeStays from "./components/HomeStays";
import Navbar from "./components/Navbar";
import WelcomePage from "./components/WelcomePage";

function App() {

  return (
    <AuthContextProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/homestays" element={<HomeStays />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App
