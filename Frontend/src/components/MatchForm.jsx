import axios from "axios";
import Cookie from "js-cookie";
import { checkToken } from "../scripts/checkToken";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Zed from "../assets/ZED.png";
import Ittihad from "../assets/Ittihad.png";
import Pyramids from "../assets/pyramids.png";
import Mahalla from "../assets/Mahalla.png";

const MatchForm = ({ add }) => {
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [referees, setReferees] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [match, setMatch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    if (!add) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/match/getMatchById/${
            window.location.pathname.split("/")[3]
          }`
        )
        .then((res) => {
          console.log(res);
          setMatch(res.data.match);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
    "token"
  )}`;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target.home_team.value === "true" ||
      e.target.away_team.value === "true" ||
      e.target.stadium.value === "true" ||
      e.target.date.value === "true" ||
      e.target.referee.value === "true" ||
      e.target.linesman1.value === "true" ||
      e.target.linesman2.value === "true"
    ) {
      setError("Please fill in all the fields");
      setSuccess("");
      return;
    }
    if (e.target.home_team.value === e.target.away_team.value) {
      setError("Home team and away team can't be the same");
      setSuccess("");
      return;
    }
    if (
      e.target.referee.value === e.target.linesman1.value ||
      e.target.referee.value === e.target.linesman2.value
    ) {
      setError("Referee can't be a linesman");
      setSuccess("");
      return;
    }
    if (e.target.linesman1.value === e.target.linesman2.value) {
      setError("Linesman 1 and linesman 2 can't be the same");
      setSuccess("");
      return;
    }
    checkToken();
    if (add) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/match/addMatch`, {
          home_team: e.target.home_team.value,
          away_team: e.target.away_team.value,
          stadium_id: e.target.stadium.value,
          date: e.target.date.value,
          referee_id: e.target.referee.value,
          linesman_1: e.target.linesman1.value,
          linesman_2: e.target.linesman2.value,
        })
        .then((res) => {
          console.log(res.data);
          //display a success message
          setSuccess("Match added successfully");
          navigate("/schedule");
          setError("");
        })
        .catch((err) => {
          setError(err.response.data.message);
          setSuccess("");
        });
    } else {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/match/editMatch`, {
          id: window.location.pathname.split("/")[3],
          home_team: e.target.home_team.value,
          away_team: e.target.away_team.value,
          stadium_id: e.target.stadium.value,
          date: e.target.date.value,
          referee_id: e.target.referee.value,
          linesman_1: e.target.linesman1.value,
          linesman_2: e.target.linesman2.value,
        })
        .then((res) => {
          setSuccess("Match updated successfully");
          setError("");
          navigate("/schedule");
          console.log(res);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setSuccess("");
        });
    }
  };

  useEffect(() => {
    checkToken();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/team/getTeams`)
      .then((res) => {
        console.log(res);
        setTeams(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    checkToken();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/stadium/getStadiums`)
      .then((res) => {
        setStadiums(res.data.stadiums);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    checkToken();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/referee/getReferees`)
      .then((res) => {
        setReferees(res.data.referees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-3 w-3/12 min-w-[300px]">
      <div className="flex justify-between m-5">
        {match.hometeam && (
          <img
            className="max-w-[100px] m-auto"
            src={
              match.hometeam.id > 4
                ? `https://media.api-sports.io/football/teams/${match.hometeam.id}.png`
                : match.hometeam.id == 1
                ? Zed
                : match.hometeam.id == 2
                ? Ittihad
                : match.hometeam.id == 3
                ? Pyramids
                : Mahalla
            }
            alt=""
          />
        )}
        {match.awayteam && (
          <img
            className="max-w-[100px] m-auto"
            src={
              match.awayteam.id > 4
                ? `https://media.api-sports.io/football/teams/${match.awayteam.id}.png`
                : match.awayteam.id == 1
                ? Zed
                : match.awayteam.id == 2
                ? Ittihad
                : match.awayteam.id == 3
                ? Pyramids
                : Mahalla
            }
            alt=""
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <br />
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Success!</strong>
            <br />
            <span className="block sm:inline"> {success}</span>
          </div>
        )}
        <div className="relative mt-5 w-full flex justify-between">
          <select
            id="home_team"
            className="bg-transparent w-5/12 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer"
            value={match.hometeam ? match.hometeam.id : ""}
            onChange={(e) =>
              setMatch({ ...match, hometeam: { id: e.target.value } })
            }
            required
          >
            <option value>Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <select
            id="away_team"
            className="bg-transparent w-5/12 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer"
            value={match.awayteam ? match.awayteam.id : ""}
            onChange={(e) =>
              setMatch({ ...match, awayteam: { id: e.target.value } })
            }
            required
          >
            <option value>Away Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="teams"
            className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600"
          >
            Teams
          </label>
        </div>
        <div className="relative mt-6">
          <select
            id="stadium"
            className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer"
            value={match.stadium ? match.stadium.id : ""}
            onChange={(e) => setMatch({ ...match, stadium: e.target.value })}
            required
          >
            <option value>Stadium</option>
            {stadiums.map((stadium) => (
              <option key={stadium.id} value={stadium.id}>
                {stadium.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="stadium"
            className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600 peer"
          >
            Stadium
          </label>
        </div>
        <div className="relative mt-6">
          <input
            type="datetime-local"
            id="date"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            defaultValue={
              match.date ? match.date.split(".")[0].replace("T", " ") : ""
            }
            onChange={(e) => setMatch({ ...match, date: e.target.value })}
            required
          />
          <label
            htmlFor="date"
            className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600"
          >
            Date
          </label>
        </div>
        <div className="relative mt-6">
          <select
            id="referee"
            className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer"
            value={match.referee ? match.referee.id : ""}
            onChange={(e) => setMatch({ ...match, referee: e.target.value })}
            required
          >
            <option value>Main Referee</option>
            {referees.map((referee) => (
              <option key={referee.id} value={referee.id}>
                {referee.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="referee"
            className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600 peer"
          >
            Main Referee
          </label>
        </div>
        <div className="relative mt-6 w-full flex justify-between">
          <div className="w-5/12">
            <select
              id="linesman1"
              className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer"
              value={match.linesman1 ? match.linesman1.id : ""}
              onChange={(e) =>
                setMatch({ ...match, linesman1: e.target.value })
              }
              required
            >
              <option value>Linesman 1</option>
              {referees.map((referee) => (
                <option key={referee.id} value={referee.id}>
                  {referee.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="linesman1"
              className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600"
            >
              Linesman 1
            </label>
          </div>
          <div className="w-5/12">
            <select
              id="linesman2"
              className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer"
              value={match.linesman2 ? match.linesman2.id : ""}
              onChange={(e) =>
                setMatch({ ...match, linesman2: e.target.value })
              }
              required
            >
              <option value>Linesman 2</option>
              {referees.map((referee) => (
                <option key={referee.id} value={referee.id}>
                  {referee.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="linesman2"
              className="absolute bottom-11 right-20 text-sm text-gray-500 peer-focus:text-blue-600 peer"
            >
              Linesman 2
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {add ? "Add Match" : "Update Match"}
        </button>
      </form>
    </div>
  );
};

export default MatchForm;
