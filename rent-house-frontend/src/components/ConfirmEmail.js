import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const token = queryParams.get("token");
    const email = queryParams.get("email");
  
    if (token && email) {
      axios.post("http://localhost:5206/Auth/confirm-email", {
        token,
        email,
      })
      .then(response => {
        console.log("Email confirmed:", response.data);
      })
      .catch(error => {
        console.error("Error confirming email:", error);
      });
    }
  }, [queryParams]);

  return (
    <div>
      <h2>Confirming your email...</h2>
    </div>
  );
};

export default ConfirmEmail;
