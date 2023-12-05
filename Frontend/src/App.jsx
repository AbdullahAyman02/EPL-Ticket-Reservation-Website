import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
// import Login from "./pages/Login";
import scrollNavbar from "./scripts/scrollNavbar";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div onScroll={scrollNavbar}>
      <LoginForm></LoginForm>
      <Navbar></Navbar>
      <Home></Home>
      <SignUp></SignUp>
      <Reservation></Reservation>
    </div>
  );
}

export default App;
