# Используем базовый образ Node.js для сборки приложения
FROM node:14-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Сборка приложения для продакшн
RUN npm run build
