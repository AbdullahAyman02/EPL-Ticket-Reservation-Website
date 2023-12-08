import { useParams } from "react-router-dom";
import Lounge from "../components/Lounge";
import { useState, useEffect } from "react";
import axios from "axios";

const Reservation = () => {
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
  }, []);
  return (
    <div className="flex">
      <Lounge
        match_id={match_id}
        rows={match && match.stadium.no_of_rows}
        columns={match && match.stadium.seats_per_row}
      ></Lounge>
      {/* <TicketInfo></TicketInfo> */}
    </div>
  );
};

export default Reservation;
