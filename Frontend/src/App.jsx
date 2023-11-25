// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import MatchSchedule from "./components/MatchSchedule";
import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
import scrollNavbar from "./scripts/scrollNavbar";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div onScroll={scrollNavbar}>
      <Navbar></Navbar>
      {/* <Login></Login> */}
      <MatchSchedule></MatchSchedule>
    </div>
  );
}

export default App;
