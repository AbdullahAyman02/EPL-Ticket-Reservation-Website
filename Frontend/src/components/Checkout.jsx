import { ReserveContext } from "../contexts/ReserveContext";
import { useContext } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const Checkout = ({ match_id }) => {
  const { toReserve, setToReserve } = useContext(ReserveContext);
  const role = Cookie.get("role");
  return role == 'F' && (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">Total: {toReserve.length}</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${Cookie.get("token")}`;
              axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/ticket/addTicket`, {
                  match_id: match_id,
                  seat_no: toReserve,
                  username: Cookie.get("username"),
                })
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    setToReserve([]);
                    console.log("successfully reserved");
                    alert("Successfully reserved");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert(err.response.data.message)
                });
            }}
          >
            Confirm
          </button>
        </div>
      </div>
  );
};

export default Checkout;
