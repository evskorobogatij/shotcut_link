## Описание

Данный сервис предназначен для сокращения ссылок

## Установка

```bash
$ yarn install
```

## Запуск приложения

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Использование Dockerfile
Для запуска приложения с использованием Docker использовать комманду
```
docker-compose up
```
Запустятся виртуальные контейнеры с СУБД postgres, pgadmin и развернутым приложением.

После чего перейдите по ссылке http://localhost:8000

![изображение](https://user-images.githubusercontent.com/66483307/170711939-dfef6e40-13b7-4210-97f3-df4cbf36486b.png)


## Используемые переменные окружения
В сервисе используются следующие переменные окружения
```
TYPEORM_CONNECTION = "postgres"
TYPEORM_HOST = # имя хоста субд
TYPEORM_USERNAME = # пользователь
TYPEORM_PASSWORD = # пароль
TYPEORM_DATABASE = # имя базы
TYPEORM_PORT = 5432
TYPEORM_SYNCHRONIZE = false
TYPEORM_LOGGING = true
TYPEORM_MIGRATIONS = src/migration/**/*.ts
TYPEORM_MIGRATIONS_DIR = src/migration/
TYPEORM_ENTITIES = src/**/entities/*.entity.ts
TYPEORM_ENTITIES_DIR = src/**/entities/
APP_PORT = 8000 # порт для запуска
JWT_KEY=hf83dfdgg4ujflghghdf834hghg34d8h....hg34r # ключ для подписывания jwt-токенов
```


## Лицензия

Данное приложение распространяется по лицензии [MIT licensed](LICENSE).
