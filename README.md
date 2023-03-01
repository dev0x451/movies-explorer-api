# Проект Movies Explorer: бэкенд
В API есть 5 роутов:

* GET /users/me - возвращает информацию о пользователе (email и имя)
* PATCH /users/me - обновляет информацию о пользователе (email и имя)
* GET /movies - возвращает все сохранённые текущим  пользователем фильмы
* POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
* DELETE /movies/_id - удаляет сохранённый фильм по id
* POST /signup - создаёт пользователя с переданными в теле email, password и name
* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
* POST /signout - делает logout пользователя и удаляет JWT-токен из куки
  
## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточек фильмов   
`/models` — папка с файлами описания схем пользователя и карточки фильма
`/errors` — папка с классами ошибок
`/middlewares` — авторизация и логгер

## Как запустить проект локально

* Должна быть установлена MongoDB, название базы - bitfilmsdb, MONGODB_URI = 'mongodb://localhost:27017/bitfilmsdb'
* Клонируйте проект, разверните его в локальную папку и перейдите в нее
* Убедитесь, что Node.js и NPM установлены
* Установите зависимости:
```shell
npm install
```
* Запуск сервера в dev-режиме с hot-reload:
```shell
npm run dev
```
* Запуск сервера в режиме production:
```shell
npm run start
```
## Live demo

API URL: https://movies.schapov.dev/api


Спасибо за внимание!
