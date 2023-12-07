import axios from "axios";
import { useState, useEffect } from "react";

const MatchForm = ({add}) => {
    const [teams, setTeams] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [referees, setReferees] = useState([]);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.home_team.value === e.target.away_team.value)
        {
            alert("Home team and away team can't be the same");
            return;
        }
        if (e.target.referee.value === e.target.linesman1.value || e.target.referee.value === e.target.linesman2.value)
        {
            alert("Referee can't be a linesman");
            return;
        }
        if (e.target.linesman1.value === e.target.linesman2.value)
        {
            alert("Linesman 1 and linesman 2 can't be the same");
            return;
        }
        if (add)
        {
            axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/addMatch`, {
                home_team: e.target.home_team.value,
                away_team: e.target.away_team.value,
                stadium: e.target.stadium.value,
                date: e.target.date.value,
                time: e.target.time.value,
                referee_id: e.target.referee.value,
                linesman1_id: e.target.linesman1.value,
                linesman2_id: e.target.linesman2.value,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else
        {
            axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/updateMatch`, {
                home_team: e.target.home_team.value,
                away_team: e.target.away_team.value,
                stadium: e.target.stadium.value,
                date: e.target.date.value,
                time: e.target.time.value,
                referee_id: e.target.referee.value,
                linesman1_id: e.target.linesman1.value,
                linesman2_id: e.target.linesman2.value,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/getTeams`)
        .then((res) => {
            setTeams(res.data.teams);
        });
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/getStadiums`)
        .then((res) => {
            setStadiums(res.data.stadiums);
        });
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/getReferees`)
        .then((res) => {
            setReferees(res.data.referees);
        });
    }, []);

  return (
    <div className="mt-3 w-3/12 min-w-[300px]">
      <form onSubmit={handleSubmit}>
        <div className="relative mt-5 w-full flex justify-between">
            <select
                id="home_team"
                className="bg-transparent w-5/12 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer" required>
                <option value>Home Team</option>
                {teams.map((team) => (
                <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
            <select
                id="away_team"
                className="bg-transparent w-5/12 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer" required>
                <option value>Away Team</option>
                {teams.map((team) => (
                <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>
            <label
                htmlFor="teams"
                className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600">
                Teams
            </label>
        </div>
        <div className="relative mt-6">
            <select
                id="stadium"
                className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer" required>
                <option value>Stadium</option>
                {stadiums.map((stadium) => (
                <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                ))}
            </select>
            <label
                htmlFor="stadium"
                className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600 peer">
                Stadium
            </label>
        </div>
        <div className="relative mt-6 w-full flex justify-between">
            <div className="w-5/12">
                <input
                    type="date"
                    id="date"
                    className="block border border-white-300 px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                />
                <label
                    htmlFor="date"
                    className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600">
                    Date
                </label>
            </div>
            <div className="w-5/12">
                <input
                    type="time"
                    id="time"
                    className="block w-full border border-white-300 px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                />
                <label
                    htmlFor="time"
                    className="relative right-[4rem] bottom-[4.5rem] text-sm text-gray-500 peer-focus:text-blue-600 peer">
                    Time
                </label>
            </div>
        </div>
        <div className="relative mt-1">
            <select
                id="referee"
                className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer" required>
                <option value>Main Referee</option>
                {referees.map((referee) => (
                <option key={referee.id} value={referee.id}>{referee.name}</option>
                ))}
            </select>
            <label
                htmlFor="referee"
                className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600 peer">
                Main Referee
            </label>
        </div>
        <div className="relative mt-6 w-full flex justify-between">
            <div className="w-5/12">
                <select
                    id="linesman1"
                    className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer" required>
                    <option value>Linesman 1</option>
                    {referees.map((referee) => (
                    <option key={referee.id} value={referee.id}>{referee.name}</option>
                    ))}
                </select>
                <label
                    htmlFor="linesman1"
                    className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600">
                    Linesman 1
                </label>
            </div>
            <div className="w-5/12">
                <select
                    id="linesman2"
                    className="bg-transparent w-full border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 peer" required>
                    <option value>Linesman 2</option>
                    {referees.map((referee) => (
                    <option key={referee.id} value={referee.id}>{referee.name}</option>
                    ))}
                </select>
                <label
                    htmlFor="linesman2"
                    className="absolute bottom-11 right-20 text-sm text-gray-500 peer-focus:text-blue-600 peer">
                    Linesman 2
                </label>
            </div>
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {add ? "Add Match" : "Update Match"}
        </button>
      </form>
    </div>
  );
};

export default MatchForm;
