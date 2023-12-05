import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUpForm = () => {
  const [cities, setCities] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:20396/signup", {
        username: e.target.username.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        birthday: e.target.birthDate.value,
        gender: e.target.gender.value,
        city: e.target.city.value,
        address: e.target.address.value,
        email: e.target.email.value,
      })
      .then((res) => {
        if (res.status === "success") {
          Cookies.set("username", e.target.username.value);
          console.log(Cookies.get("token"));
        } else {
          alert(res.data.message);
        }
      });
  };

  useEffect(() => {
    axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
      country: "egypt",
    }).then((res) => {
      setCities(res.data.data);
    });
  }, []);


  return (
    <div className="mt-3 w-3/12 min-w-fit">
      <form onSubmit={handleSubmit}>
        <div className="relative mt-2">
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
        <div className="relative mt-5">
          <input
            type="password"
            id="password"
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
        <div className="relative mt-5 w-full flex justify-between">
          <div className="w-5/12">
            <input
              type="text"
              id="firstName"
              className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
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
            <label className="absolute left-1 text-sm text-gray-500 peer-focus:text-blue-600">
              Gender
            </label>
            <div className="mt-6 flex justify-around">
              <div className="flex">
                <input
                  id="male"
                  type="radio"
                  value="male"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 peer"
                  defaultChecked = {true}
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
                  id="female"
                  type="radio"
                  value="female"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 peer"
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
            id="countries"
            className="bg-transparent border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value>Choose a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="relative mt-5">
          <input
            type="address"
            id="address"
            className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
          />
          <label
            htmlFor="address"
            className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-2 -translate-y-6 top-1 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>
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
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
