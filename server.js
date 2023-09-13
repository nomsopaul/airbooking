import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from '../api/routes/auth.js';
import flightsRoute from './routes/flights.js';
import usersRoute from '../api/routes/users.js';
import seatsRoute from '../api/routes/seats.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express ();
dotenv.config ();

const connect = async () => {
  try {
    await mongoose.connect (process.env.MONGO2);
    console.log ('Connected to mongoDB');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on ('disconnected', () => {
  console.log ('mongoDB disconnected!');
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/flights', flightsRoute);
app.use('/api/seats', seatsRoute);

app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log('Connected to backend server!!');
});
