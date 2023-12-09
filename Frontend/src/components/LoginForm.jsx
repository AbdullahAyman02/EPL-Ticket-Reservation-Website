import Cookies from "js-cookie";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("token", res.data.accessToken);
          Cookies.set("username", e.target.username.value);
          Cookies.set("role", res.data.role);
          Cookies.set("jwt", res.data.refreshToken);
          console.log(res);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="mt-3 w-3/12 min-w-fit">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <br />
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <div className="relative mt-5">
          <input
            type="text"
            id="username"
            name="username"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="username"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="password"
            id="password"
            name="password"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="password"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
