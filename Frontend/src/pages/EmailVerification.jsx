import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const decodedToken = atob(token);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/verify/${decodedToken}`
        );
        console.log(response);
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
