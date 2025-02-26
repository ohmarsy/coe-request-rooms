# start project

`docker compose up -d` ไปเลย ง่ายๆ

หรือรันทีละอัน
backend

```
python3 auth-service/app.py
python3 rooms-service/app.py
python3 api-gateway/app.py
```

then frontend

```
cd fe-coe-request-rooms
npm run dev
```

# test

http://localhost:5001/rooms
และ
http://localhost:5001/auth
