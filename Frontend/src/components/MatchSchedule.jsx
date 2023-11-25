import MatchSlot from "./MatchSlot";
import { useEffect, useState } from "react";

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const request = await fetch("http://localhost:20396/getMatch");
      const data = await request.json();
      console.log(data.match);
      setMatches(data.match);
    };
    fetchMatches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {matches &&
        matches.map((match) => (
          <MatchSlot
            key={match.id}
            team1={match.home_team}
            team2={match.away_team}
            date={match.date}
            stadium={match.stadium_id}
          />
        ))}
    </div>
  );
};

export default MatchSchedule;
