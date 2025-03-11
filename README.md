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

# if database error = "Target database is not up to date" when migration new schema pls try this
```
flask db stamp head
flask db migrate -m "Fix schema"
flask db upgrade
or use 
flask db revision --rev-id "versionID"
flask db migrate
flask db upgrade
```

# new computer pls do
```
cd auth-service
rm -rf migrations
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

and

```
cd rooms-service
rm -rf migrations
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```


# how to use api
add user

add room

add access-list

# if u stuck about jwt

first try u should run this command

```
pip3 uninstall jwt
pip3 uninstall PyJWT
pip3 install PyJWT
```