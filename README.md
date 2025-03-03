# start project

backend
`docker compose up -d` ไปเลย ง่ายๆ

then frontend

```
cd fe-coe-request-rooms
npm run dev
```

# test

http://localhost:5001/rooms
และ
http://localhost:5001/auth

# run this to use flask db
```
python3 -m flask db init
python3 -m flask db migrate -m "Initial migration"
python3 -m flask db upgrade
```

# postgres for user database
host = `localhost`

port = `5432`

username = `postgres`
