import { ReserveContext } from "../contexts/ReserveContext";
import { SocketContext } from "../contexts/SocketContext";
import { useContext, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const Checkout = ({ match_id }) => {
  const { toReserve, setToReserve } = useContext(ReserveContext);
  const { socket } = useContext(SocketContext);
  const role = Cookie.get("role");
  const [error, setError] = useState("");
  const reserve = () => {
    if (toReserve.length == 0) {
      setError("Please select a seat");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )}`;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/ticket/addTicket`, {
        match_id: match_id,
        seat_no: toReserve,
        username: Cookie.get("username"),
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("successfully reserved");
          console.log(socket.current);
          socket.current.emit("reserve", {
            username: Cookie.get("username"),
            match_id: match_id,
            seat_no: toReserve,
          });
          setToReserve([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ccn = e.target.ccn.value;
    const pin = e.target.pin.value;
    if (ccn.length != 16) {
      setError("Invalid credit card number");
      return;
    }
    if (pin.length != 4) {
      setError("Invalid PIN");
      return;
    }
    setError("");
    reserve();
  };
  return (
    role == "F" && (
      <div className="flex flex-col items-center grow justify-center text-l">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold">Checkout</h1>
        <div className="flex flex-col items-center">
          <p className="text-l md:text-xl lg:text-2xl font-bold">
            Total: {toReserve.length}
          </p>
          <div className="mt-3 w-3/12 min-w-fit">
            <form onSubmit={handleSubmit} className="pb-0">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xs">
                  <strong className="font-bold">Error!</strong>
                  <br />
                  <span className="block sm:inline"> {error}</span>
                </div>
              )}
              <div className="relative mt-5">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9\s]{16}"
                  // pattern="\d{4} \d{4} \d{4} \d{4}"
                  id="ccn"
                  name="ccn"
                  maxLength={16}
                  minLength={16}
                  className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="ccn"
                  className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
                >
                  Credit Card Number
                </label>
              </div>
              <div className="relative mt-5">
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9\s]{4}"
                  id="pin"
                  name="pin"
                  minLength={4}
                  maxLength={4}
                  className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="pin"
                  className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
                >
                  PIN
                </label>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded m-3">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Checkout;
