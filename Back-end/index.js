import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import { authMiddlewate } from "./middlewares/authMiddleware.js";
import roters from "./router/routes.js";
import cors from "cors"

try {
  await mongoose.connect("mongodb://localhost:27017/sneakers-shop", {
  });

  console.log("Connect to DB");
} catch (error) {
  console.log("Failed to connect!!");
  console.log("Mongoose connection error:", error);
}
const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true 
}));



app.use((req, res, next) => {

  const allowedOrigins = ["http://localhost:4200/"];
  const origin = req.headers.origin;
  


  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Expose-Headers", "Authorization"); 

  if (req.method === "OPTIONS") {
    return res.status(204).send();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddlewate);

app.use((req, res, next) => {
  console.log("Request headers:", req.headers);
  next();
});

app.use(roters);
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Server error');
});

app.listen(5000, () => console.log("Listening on http: //localhost:5000"));
