// import Seat from "../assets/fan_seat.png";
import axios from "axios";
import Seat from "../assets/seat1.png";
import ReservedSeat from "../assets/reserved.png";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { checkToken } from "../scripts/checkToken";

const Lounge = ({ match_id, rows, columns }) => {
  const [arr, setArr] = useState([]);
  console.log(match_id);
  const loadSeats = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )} `;
    await axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/ticket/getTicketsByMatchID/${match_id}`
      )
      .then((res) => {
        if (res.status === 200) {
          if (!rows && !columns) return;
          let seats = [];
          for (let i = 0; i < rows; i++) {
            seats.push([]);
            for (let j = 0; j < columns; j++) {
              seats[i].push(0);
            }
          }
          for (let i = 0; i < res.data.tickets.length; i++) {
            let seat_no = res.data.tickets[i];
            let row = Math.floor(seat_no / columns);
            let col = seat_no % columns;
            seats[row][col] = -1;
          }
          setArr(seats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkToken();
    loadSeats();
  }, [rows, columns]);

  const reserveSeat = (i, j) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )}`;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/ticket/addTicket`, {
        match_id: match_id,
        seat_no: i * columns + j,
        username: Cookie.get("username"),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          loadSeats();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="lounge" className="w-full py-8">
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        {arr.map((row, i) => {
          return (
            <div
              key={i}
              className={`flex flex-wrap justify-center items-center h-12 w-full -translate-y-[${
                i * 22
              }px]`}
            >
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    className="h-10 w-10 md:h-16 md:w-16"
                    onClick={() => {
                      reserveSeat(i, j);
                    }}
                  >
                    <img src={arr[i][j] != -1 ? Seat : ReservedSeat}></img>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lounge;
