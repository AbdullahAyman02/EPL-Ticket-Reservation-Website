import { useParams } from "react-router-dom";
import Lounge from "../components/Lounge";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import axios from "axios";
import { ReserveContextProvider } from "../contexts/ReserveContext";
import Checkout from "../components/Checkout";

const Reservation = () => {
  const { socket } = useContext(SocketContext);
  const { match_id } = useParams();
  const [match, setMatch] = useState(null);

  const getMatch = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/match/getMatchByID/${match_id}`)
      .then((res) => {
        if (res.status === 200) {
          setMatch(res.data.match);
        }
      });
  };
  useEffect(() => {
    getMatch();
    socket.current.connect();
    socket.current.on("connect", () => {
      console.log(`Connected to server as: ${socket.current.id}`);
    });
  }, [socket]);
  return (
    <ReserveContextProvider>
      <div className="flex flex-wrap justify-center align-middle h-[85vh]">
        <Lounge
          match_id={match_id}
          rows={match && match.stadium.no_of_rows}
          columns={match && match.stadium.seats_per_row}
        ></Lounge>
        <Checkout match_id={match_id}></Checkout>
      </div>
    </ReserveContextProvider>
  );
};

export default Reservation;
