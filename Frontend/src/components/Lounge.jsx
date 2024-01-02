import Selected from "../assets/seat1.png";
import Seat from "../assets/Selected.png";
import MySeat from "../assets/Mine.png";
import ReservedSeat from "../assets/reserved.png";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { ReserveContext } from "../contexts/ReserveContext";
import { SocketContext } from "../contexts/SocketContext";

const Lounge = ({ match_id, rows, columns }) => {
  const { toReserve, setToReserve } = useContext(ReserveContext);
  const { socket } = useContext(SocketContext);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    console.log(arr);
  }, [arr]);

  socket.current.on("reserve", (data) => {
    console.log(data);
    console.log(arr);
    if (data.match_id === match_id) {
      setToReserve((reserve) => {
        let copy = [...reserve];
        for (let i = 0; i < data.seat_no.length; i++) {
          copy = copy.filter((item) => item != data.seat_no[i]);
        }
        return copy;
      });
      setArr((prev) => {
        let newArr = [...prev];
        for (let i = 0; i < data.seat_no.length; i++) {
          let row = Math.floor(data.seat_no[i] / newArr[0].length);
          let col = data.seat_no[i] % newArr[0].length;
          console.log(row, col);
          newArr[row][col] = data.username == Cookie.get("username") ? 2 : -1;
        }
        return newArr;
      });
    }
  });

  socket.current.on("cancel", (data) => {
    console.log(data);
    console.log(arr);
    if (data.match_id == match_id) {
      setArr((prev) => {
        let newArr = [...prev];
        let row = Math.floor(data.seat_no / newArr[0].length);
        let col = data.seat_no % newArr[0].length;
        console.log(row, col);
        newArr[row][col] = 0;
        return newArr;
      });
    }
  });

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
        console.log(res);
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
            let seat_no = res.data.tickets[i].seat_no;
            let row = Math.floor(seat_no / columns);
            let col = seat_no % columns;
            if (res.data.tickets[i].username === Cookie.get("username"))
              seats[row][col] = 2;
            else seats[row][col] = -1;
          }
          setArr(seats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadSeats();
  }, [rows, columns]);

  const reserveSeat = (i, j) => {
    console.log(i, j);
    setToReserve((reserve) => {
      let copy = [...reserve];
      if (arr[i][j] == 0) {
        console.log("Selected");
        copy = [...copy, i * columns + j];
      } else {
        console.log("Unselected");
        copy = copy.filter((item) => item != i * columns + j);
      }
      return copy;
    });
    setArr((prev) => {
      let newArr = [...prev];
      newArr[i][j] = newArr[i][j] ? 0 : 1;
      return newArr;
    });
  };

  return (
    <div
      id="lounge"
      className="py-4 px-2 md:py-8 md:px-10 grow flex justify-center"
    >
      <div className="flex flex-col align-middle md:flex-wrap justify-center items-center">
        {arr.map((row, i) => {
          return (
            <div
              key={i}
              className={`flex flex-wrap justify-center items-center md:h-12 -translate-y-[${
                i * 22
              }px]`}
            >
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    className="relative h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 xl:h-16 xl:w-16 3xl:h-20 3xl:w-20"
                    onClick={() => {
                      if (
                        (arr[i][j] == 0 || arr[i][j] == 1) &&
                        Cookie.get("role") == "F"
                      )
                        reserveSeat(i, j);
                    }}
                  >
                    <img
                      src={
                        arr[i][j] == -1
                          ? ReservedSeat
                          : arr[i][j] == 0
                          ? Seat
                          : arr[i][j] == 1
                          ? Selected
                          : MySeat
                      }
                      title={`Seat ${i * columns + j}`}
                    ></img>
                    <p className="absolute top-1/2 left-1/2 white -translate-x-1/2 -translate-y-1/2 text-xs xl:text-l">
                      {i * columns + j}
                    </p>
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
