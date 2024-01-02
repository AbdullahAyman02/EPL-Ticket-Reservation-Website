import Ticket from "../components/Ticket";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const username = Cookie.get("username");
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )}`;
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/ticket/getTicketsByUsername/${username}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTickets(res.data.tickets);
        }
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {tickets &&
        tickets.map((ticket) => (
          <Ticket
            key={ticket.ticket_no}
            ticket_no={ticket.ticket_no}
            team1_id={ticket.match.hometeam.id}
            team2_id={ticket.match.awayteam.id}
            team1={ticket.match.hometeam.name}
            team2={ticket.match.awayteam.name}
            date={ticket.match.date}
            seat_no={ticket.seat_no}
            stadium={ticket.match.stadium.name}
            tickets={tickets}
            setTickets={setTickets}
          />
        ))}
      {tickets.length == 0 && <p className="text-xl m-10 text-slate-600">You have no tickets</p>}
    </div>
  );
};

export default MyTickets;
