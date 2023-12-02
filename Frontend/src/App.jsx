import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
// import Login from "./pages/Login";
import scrollNavbar from "./scripts/scrollNavbar";

function App() {
  return (
    <div onScroll={scrollNavbar}>
      <Navbar></Navbar>
      <Home></Home>
      <Reservation></Reservation>
    </div>
  );
}

export default App;
