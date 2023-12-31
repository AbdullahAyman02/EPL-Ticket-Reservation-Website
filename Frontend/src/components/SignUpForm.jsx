import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import checkToken from "../scripts/checkToken";

// eslint-disable-next-line react/prop-types
const SignUpForm = ({ add }) => {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!add) {
      console.log(Cookies.get("username"));
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/getUserbyUsername/${Cookies.get("username")}`
        )
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [add]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.cities.value === "true") {
      setError("Please choose a city");
      setSuccess("");
      return;
    }
    if (e.target.password.value !== e.target.confirm_password.value) {
      setError("Passwords don't match");
      setSuccess("");
      return;
    }
    if (add) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
          username: e.target.username.value,
          password: e.target.password.value,
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          birthday: e.target.birthDate.value,
          gender: e.target.gender.value,
          city: e.target.cities.value,
          address: e.target.address.value,
          email: e.target.email.value,
          role: e.target.role.value,
        })
        .then((res) => {
          if (res.status === 200) {
            Cookies.set("username", e.target.username.value);
            console.log(Cookies.get("token"));
            setSuccess(
              "Signed Up Successfully! Please wait for your approval email to login"
            );
            setError("");
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
          setSuccess("");
        });
    } else {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/user/edit`, {
          username: Cookies.get("username"),
          password: e.target.password.value,
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          birthday: e.target.birthDate.value,
          gender: e.target.gender.value,
          city: e.target.cities.value,
          address: e.target.address.value,
          role: Cookies.get("role"),
        })
        .then((res) => {
          setSuccess("Data Updated Successfully!");
          setError("");
          console.log(res);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setSuccess("");
        });
    }
  };

  const toggleRequest = () => {
    checkToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user/${!user.request ? 'sendRequest':'cancelRequest'}`, {
        username: Cookies.get("username"),
      }
      )
      .then((res) => {
        setUser({ ...user, request: !user.request });
        if(user.request)
          setSuccess("Request cancelled successfully!");
        else
          setSuccess("Request sent successfully! Wait for an email to confirm your request");
        setError("");
        console.log(res);
      }) 
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setSuccess("");
      });
  };

  useEffect(() => {
    axios.defaults.withCredentials = false;
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: "egypt",
      })
      .then((res) => {
        setCities(res.data.data);
      });
  }, []);

  return (
    <div className="w-5/12 min-w-fit mt-28">
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
        {add && (
          <div className="relative mt-5">
            <input
              type="text"
              id="username"
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
        )}
        <div className="relative mt-5">
          <input
            type="password"
            id="password"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required={add}
          />
          <label
            htmlFor="password"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative mt-5">
          <input
            type="password"
            id="confirm_password"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required={add}
          />
          <label
            htmlFor="confirm_password"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>
        <div className="relative mt-5 w-full flex justify-between">
          <div className="w-5/12">
            <input
              type="text"
              id="firstName"
              className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              defaultValue={user.first_name}
              required
            />
            <label
              htmlFor="firstName"
              className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
            >
              First Name
            </label>
          </div>
          <div className="w-5/12">
            <input
              type="text"
              id="lastName"
              className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              defaultValue={user.last_name}
              required
            />
            <label
              htmlFor="lastName"
              className="absolute right-20 text-sm text-gray-500 duration-300 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
            >
              Last Name
            </label>
          </div>
        </div>
        <div className="relative mt-6">
          <input
            type="date"
            id="birthDate"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            defaultValue={user.birthday}
            required
          />
          <label
            htmlFor="birthDate"
            className="absolute -top-5 left-1 text-sm text-gray-500 peer-focus:text-blue-600"
          >
            Birth Date
          </label>
        </div>
        <div className="mt-2 flex justify-around">
          <div className="w-8/12">
            <label className="relative text-sm text-gray-500 peer-focus:text-blue-600">
              Gender
            </label>
            <div className="mt-1 flex justify-around">
              <div className="flex">
                <input
                  id="gender"
                  type="radio"
                  value="M"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 peer"
                  checked={add || user.gender === "M"}
                  onChange={() => setUser({ ...user, gender: "M" })}
                />
                <label
                  htmlFor="male"
                  className="ms-2 text-sm font-medium text-gray-900 peer-focus:text-blue-600"
                >
                  Male
                </label>
              </div>
              <div className="flex">
                <input
                  id="gender"
                  type="radio"
                  value="F"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 peer"
                  checked={user.gender === "F"}
                  onChange={() => setUser({ ...user, gender: "F" })}
                />
                <label
                  htmlFor="female"
                  className="ms-2 text-sm font-medium text-gray-900 peer-focus:text-blue-600"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
          <select
            id="cities"
            className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            required
          >
            <option value>Choose a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mt-5">
          <input
            type="address"
            id="address"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            defaultValue={user.address}
          />
          <label
            htmlFor="address"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
            defaultValue={user.address}
          >
            Address
          </label>
        </div>
        {add && (
          <div className="relative mt-5">
            <input
              type="email"
              id="email"
              className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>
        )}
        {add && (
        <div>
          <label className="relative text-sm text-gray-500 peer-focus:text-blue-600">
            User Type
          </label>
          <div className="mt-1 flex justify-around">
            <div className="flex">
              <input
                id="role"
                type="radio"
                value="F"
                name="role"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 peer"
                defaultChecked
                onChange={() => setUser({ ...user, role: "F" })}
              />
              <label
                htmlFor="fan"
                className="ms-2 text-sm font-medium text-gray-900 peer-focus:text-blue-600"
              >
                Fan
              </label>
            </div>
            <div className="flex">
              <input
                id="role"
                type="radio"
                value="M"
                name="role"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 peer"
                onChange={() => setUser({ ...user, role: "M" })}
              />
              <label
                htmlFor="manager"
                className="ms-2 text-sm font-medium text-gray-900 peer-focus:text-blue-600"
              >
                Manager
              </label>
            </div>
          </div>
        </div>
        )}
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {add ? "Sign Up" : "Update Information"}
        </button>
      </form>
      {!add && (
        <button
          type="submit"
          onClick={toggleRequest}
          className={`text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
            user.request
              ? "bg-red-700 hover:bg-red-800"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          {user.request
            ? "Cancel request for manager authorities"
            : "Submit Request for manager authorities"}
        </button>
      )}
    </div>
  );
};

export default SignUpForm;
