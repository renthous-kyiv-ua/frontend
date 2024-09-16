import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Состояния для отображения статуса
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const token = queryParams.get("token");

    if (token) {
      // Выполняем GET-запрос с параметром token в строке запроса
      axios
        .get(`http://localhost:5206/Auth/confirm-email?token=${token}`)
        .then((response) => {
          console.log("Email confirmed:", response.data);
          setStatus("success");
        })
        .catch((error) => {
          // Логируем полную информацию об ошибке
          if (error.response) {
            console.error("Error confirming email:", error.response.data); // Тело ответа с сервера
            console.error("Status code:", error.response.status); // Код статуса, например 400
            console.error("Headers:", error.response.headers); // Заголовки ответа
          } else if (error.request) {
            console.error("No response received from server:", error.request); // Запрос был отправлен, но ответа не было
          } else {
            console.error("Error setting up request:", error.message); // Ошибка, связанная с настройкой запроса
          }
          setStatus("error");
        });
    }
  }, [queryParams]);

  return (
    <div>
      <h2>Confirming your email...</h2>
      {status === "pending" && <p>Please wait, your email is being confirmed...</p>}
      {status === "success" && <p>Your email has been successfully confirmed!</p>}
    </div>
  );
};

export default ConfirmEmail;
