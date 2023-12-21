import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/404";
import Login from "./pages/Login";
// import MatchSchedule from "./components/MatchSchedule";
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
import { SocketContextProvider } from "./contexts/SocketContext";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schedule" element={<Schedule />} />
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
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
