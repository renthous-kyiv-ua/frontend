# Используем базовый образ Node.js для сборки приложения
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Копируем .env файл в контейнер
COPY .env .env

# Открываем порт, на котором будет доступно приложение
EXPOSE 40000

# Запуск приложения
CMD ["npm", "start"]

