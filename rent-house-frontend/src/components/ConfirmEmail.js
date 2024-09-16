import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const token = queryParams.get("token");

    if (token) {
      // Выполняем POST-запрос с телом запроса, содержащим токен
      axios
        .post("http://localhost:5206/Auth/confirm-email", { token })
        .then((response) => {
          console.log("Email confirmed:", response.data);
          // Можно добавить отображение успешного сообщения пользователю
        })
        .catch((error) => {
          console.error("Error confirming email:", error.response ? error.response.data : error.message);
          // Можно добавить отображение сообщения об ошибке пользователю
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