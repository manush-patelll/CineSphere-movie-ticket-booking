import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api";

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`/verify-email/${token}`);
        alert("Email verified successfully!");
      } catch (err) {
        alert("Verification failed or expired link.");
      }
    };
    verify();
  }, [token]);

  return <div>Verifying email...</div>;
};

export default VerifyEmail;
