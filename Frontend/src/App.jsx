import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import EmailVerification from "./pages/EmailVerification";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import Schedule from "./pages/Schedule";
import CreateMatch from "./pages/CreateMatch";
import EditMatch from "./pages/EditMatch";
import CreateStadium from "./pages/CreateStadium";
import MyTickets from "./pages/MyTickets";
import Admin from "./pages/Admin";
import MatchDetails from "./pages/MatchDetails.jsx";
import { SocketContextProvider } from "./contexts/SocketContext";
import spinner from "./assets/spinner.png";
import checkToken from "./scripts/checkToken.js";
import Cookies from "js-cookie";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  axios.interceptors.request.use(async (config) => {
    console.log(config.url);
    if (config.url != `${import.meta.env.VITE_BACKEND_URL}/user/refresh`) {
      await checkToken();
      // config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
    }
    setIsLoading(true);
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
  return (
    <>
      <div className={`loader ${isLoading ? "" : "fadeOut"}`}>
        <img className="spinner inline" src={spinner}></img>
      </div>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <div id="hero" className={`${isLoading ? "fadeOut" : "fadeIn"}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/matchDetails" element={<MatchDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/reservation/:match_id"
                element={
                  <SocketContextProvider>
                    <Reservation />
                  </SocketContextProvider>
                }
              />
              <Route path="/verify/:token" element={<EmailVerification />} />
              <Route path="/match/create" element={<CreateMatch />} />
              <Route path="/mytickets" element={<MyTickets />} />
              <Route path="/match/update/:match_id" element={<EditMatch />} />
              <Route path="/stadium/create" element={<CreateStadium />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
