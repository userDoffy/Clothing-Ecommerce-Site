import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import {connectDB} from './config/db.js';
import cors from 'cors';
import {userRoutes} from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});