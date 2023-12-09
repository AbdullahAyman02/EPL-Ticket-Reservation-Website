import Cookie from "js-cookie";
import axios from "axios";

const StadiumForm = () => {
  
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get("token")}`;        
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/stadium/addStadium`, {
        name: e.target.name.value,
        no_of_rows: e.target.no_of_rows.value,
        seats_per_row: e.target.seats_per_row.value,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-3 w-3/12 min-w-fit">
      <form onSubmit={handleSubmit}>
        <div className="relative mt-5">
          <input
            type="text"
            id="name"
            name="name"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="name"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Stadium Name
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="number"
            id="no_of_rows"
            name="no_of_rows"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            min = "1"
            required
          />
          <label
            htmlFor="no_of_rows"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Number of rows
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="number"
            id="seats_per_row"
            name="seats_per_row"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            min = "1"
            required
          />
          <label
            htmlFor="seats_per_row"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Seats per row
          </label>
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Stadium
        </button>
      </form>
    </div>
  );
};

export default StadiumForm;
