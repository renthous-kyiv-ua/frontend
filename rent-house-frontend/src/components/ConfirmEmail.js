import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState("Подтверждаем ваш email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      axios.post(`http://localhost:5206/Auth/confirm-email?token=${encodeURIComponent(token)}`)
        .then(response => {
          console.log("Email confirmed:", response.data);
          setMessage("Ваш email успешно подтвержден!");
        })
        .catch(error => {
          console.error("Ошибка при подтверждении email:", error);
          setMessage("Ошибка при подтверждении email. Пожалуйста, попробуйте еще раз или свяжитесь с поддержкой.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("Токен отсутствует в URL");
      setMessage("Неверная ссылка подтверждения. Токен отсутствует.");
      setLoading(false);
    }
  }, [location.search]);

  return (
    <div>
      {loading ? (
        <h2>Пожалуйста, подождите...</h2>
      ) : (
        <h2>{message}</h2>
      )}
    </div>
  );
};

export default ConfirmEmail;