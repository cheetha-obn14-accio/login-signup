import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT =  5047;


// import Database: 
import "./config/db.js";

// import models:
import User from "./models/user.js";

// import Routes: 

import authRouter from './routes/auth.js';


app.use(authRouter)
















app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});