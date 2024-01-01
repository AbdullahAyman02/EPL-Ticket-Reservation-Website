import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const checkToken = async () => {
  const token = Cookie.get("token");
  if (jwtDecode(token).exp < Date.now() / 1000) {
    axios.defaults.withCredentials = true;
    const response = await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/refresh`)
      .then((res) => {
        if (res.status === 200) {
          Cookie.set("token", res.data.accessToken);
          console.log("Token refreshed");
        } else {
          Cookie.remove("token");
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(response);
  }
};
export default checkToken;
