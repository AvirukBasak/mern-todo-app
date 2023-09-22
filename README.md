# MERN Todo App

## Getting Started
- See ReactJS dir [here](app).
- See the ExpressJS dir [here](server).

## Seting MongoDB URI
Create a `.env.local` inside the `server` directory and give it an entry in followong format
```
MONGODB_URI='mongodb+srv://<username>:<passswd>@<some_domain>/?retryWrites=true&w=majority'
```
You will find the above URI in MongoDB Atlas (you'll need to hunt a little for it or create a new cluster if you don't have one).


Alternatively, for local MongoDB server instance
```
MONGODB_URI='mongodb://0.0.0.0:27017'
```

**Note**: Only use `0.0.0.0` for the IP address or MongoDB local server will refuse connections.

## Run App
You can customize your build script by modifying [`index.js`](index.js) at the repository root.

You need to run the following based on your requirements:
- `npm run install` install all dependencies
- `npm run build` generate the `static` directory
- `npm start` start the app
