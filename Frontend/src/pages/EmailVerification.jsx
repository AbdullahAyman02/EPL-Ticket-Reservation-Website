import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const EmailVerification = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const decodedToken = atob(token);
        axios.defaults.withCredentials = true;
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/user/verify/${decodedToken}`
          )
          .then((res) => {
            if (res.status === 200) {
              setIsLoggedIn(true);
            } else {
              console.log(res);
            }
          });
        navigate("/"); // Feedback to the user
      } catch (error) {
        console.error(error);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      {/* Display a loading spinner or other UI while verification is in progress */}
      Verifying your email...
    </div>
  );
};

export default EmailVerification;
