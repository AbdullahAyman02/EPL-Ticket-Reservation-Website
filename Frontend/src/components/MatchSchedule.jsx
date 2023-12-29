import MatchSlot from "./MatchSlot";
import axios from "axios";
import { useEffect, useState } from "react";

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const fetchMatches = async () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/match/getMatches`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.match)
            setMatches(res.data.match);
          }
        });
    };
    fetchMatches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto overflow-scroll no-scrollbar">
      {matches &&
        matches.map((match) => (
          <MatchSlot
            key={match.id}
            match_id={match.id}
            team1_id={match.hometeam.id}
            team2_id={match.awayteam.id}
            team1={match.hometeam.name}
            team2={match.awayteam.name}
            date={match.date}
            stadium={match.stadium.name}
            referee={match.referee.name}
            linesman1={match.linesman1.name}
            linesman2={match.linesman2.name}
          />
        ))}
    </div>
  );
};

export default MatchSchedule;
