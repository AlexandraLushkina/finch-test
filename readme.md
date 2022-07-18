# Тестовое задание для FINCH

Сделано с использованием SSR и HMR, сборка - webpack. Конфиги в `./cfg`.

Скрипт запуска в `./bin/dev.js`

Для запуска в режиме разработки: `npm i; npm run dev`

Для запуска в режиме production `npm i; npm run prod` (HMR работает только в режиме разработки)

Приложение будет запущено по адресу `http://localhost:3000`

Компоненты расположены в `./src/shared/`

Для запуска потребуется:

- webpack@5.73.0
- webpack-cli@4.10.0
- clean-webpack-plugin@4.0.0
- webpack-dev-middleware@5.3.3
- webpack-hot-middleware@2.25.1
- react@18.2.0
- react-dom@18.2.0
- @hot-loader/react-dom@17.0.2
- react-hot-loader@4.13.0
- typescript@4.7.4
- tsc@2.0.4
- express@4.18.1
- nodemon@2.0.19
