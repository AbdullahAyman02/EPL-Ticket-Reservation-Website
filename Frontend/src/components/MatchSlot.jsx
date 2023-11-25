import AhlyLogo from "../assets/Ahly.png";
import ZamalekLogo from "../assets/Zamalek.png";

// eslint-disable-next-line react/prop-types
const MatchSlot = ({ team1, team2 }) => {
  return (
    <div className="py-2 m-3">
      <div className="teams bg-white text-black flex align-middle justify-around rounded-t-md font-bold py-2">
        <div>
          <img src={AhlyLogo} alt="" />
          <h3>{team1}</h3>
        </div>
        <p className="my-auto text-4xl text-gray-500">vs</p>
        <div>
          <img src={ZamalekLogo} alt="" />
          <h3>{team2}</h3>
        </div>
      </div>
      <div className="bg-blue-900 flex justify-between p-1 rounded-b-md text-sm">
        <p className="p-1">Match Time: 12:00</p>
        <p className="p-1">Stadium: Cairo International Stadium</p>
        <button className="text-white p-1 rounded-md">Reserve</button>
      </div>
    </div>
  );
};

export default MatchSlot;
