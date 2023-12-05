import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faFutbol } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const MatchSlot = ({ team1_id, team2_id, team1, team2, date, stadium }) => {
  const matchDate = new Date(date);
  return (
    <div className="m-3 bg-black bg-opacity-60 rounded-xl">
      <div className="teams text-white flex align-middle justify-around rounded-t-md font-bold py-2">
        <div className="team-1">
          <img
            className="max-w-[100px]"
            src={`https://media.api-sports.io/football/teams/${team1_id}.png`}
            alt=""
          />
          <h3>{team1}</h3>
        </div>
        <p className="my-auto text-4xl">vs</p>
        <div>
          <img
            className="max-w-[100px]"
            src={`https://media.api-sports.io/football/teams/${team2_id}.png`}
            alt=""
          />
          <h3>{team2}</h3>
        </div>
      </div>
      <div className="bg-blue-900 flex p-1 rounded-b-md text-sm ">
        <p className="p-1 flex-1 min-w-0">
          <FontAwesomeIcon className="px-2" icon={faCalendarDay} />
          {matchDate.toDateString()}
        </p>
        <p className="p-1 flex-1 min-w-0">
          <FontAwesomeIcon className="px-2" icon={faFutbol} />
          {stadium}
        </p>
        <div className="flex flex-1 min-w-0 justify-end">
        <button className="text-white py-1 font-bold rounded-md">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default MatchSlot;
