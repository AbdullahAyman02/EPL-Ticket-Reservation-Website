import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faFutbol } from "@fortawesome/free-solid-svg-icons";
import referee from "../assets/referee.png";
import linesman from "../assets/linesman.png";
import Zed from "../assets/ZED.png";
import Ittihad from "../assets/Ittihad.png";
import Pyramids from "../assets/pyramids.png";
import Mahalla from "../assets/Mahalla.png";

const MatchDetails = (match_id) => {
  const location = useLocation();
  const match = location.state.match;
  const matchDate = new Date(match.date);

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl grow min-w-fit m-10 bg-black bg-opacity-60 rounded-xl">
        <div className="teams text-white flex align-middle justify-around rounded-t-md font-bold py-2">
          <div className="team-1 flex flex-col justify-center align-middle">
            <img
              className="md:max-w-[200px] p-3"
              src={
                match.team1_id > 4
                  ? `https://media.api-sports.io/football/teams/${match.team1_id}.png`
                  : match.team1_id == 1
                  ? Zed
                  : match.team1_id == 2
                  ? Ittihad
                  : match.team1_id == 3
                  ? Pyramids
                  : Mahalla
              }
              alt=""
            />
            <h3>{match.team1}</h3>
          </div>
          <p className="my-auto text-4xl">vs</p>
          <div className="team-2 flex flex-col justify-center align-middle">
            <img
              className="md:max-w-[200px] p-3"
              src={
                match.team2_id > 4
                  ? `https://media.api-sports.io/football/teams/${match.team2_id}.png`
                  : match.team2_id == 1
                  ? Zed
                  : match.team2_id == 2
                  ? Ittihad
                  : match.team2_id == 3
                  ? Pyramids
                  : Mahalla
              }
              alt=""
            />
            <h3>{match.team2}</h3>
          </div>
        </div>
        <div className="bg-blue-900 flex flex-col text-l">
          <p className="p-5 flex-1 min-w-0 border-white border-b-2">
            <FontAwesomeIcon className="px-2" icon={faCalendarDay} />
            {matchDate.toLocaleString()}
          </p>
          <p className="p-5 flex-1 min-w-0 border-white border-b-2">
            <FontAwesomeIcon className="px-2" icon={faFutbol} />
            {match.stadium}
          </p>
          <div className="border-white border-b-2 flex justify-center p-4">
            <img src={referee} className="h-8 inline px-2 py-1"></img>
            <p className="p-1">Main Referee: {match.referee}</p>
          </div>
          <div className="flex justify-around align-middle p-5 border-white border-b-2">
            <div className="flex justify-center flex-wrap">
              <img src={linesman} className="h-8 inline px-2 py-1"></img>
              <p className="p-1">Linesman 1: {match.linesman1}</p>
            </div>
            <div className="flex justify-center flex-wrap">
              <img src={linesman} className="h-8 inline px-2 py-1"></img>
              <p className="p-1">Linesman 2: {match.linesman2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
