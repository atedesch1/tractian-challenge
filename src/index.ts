import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

if (process.env.NODE_ENV != "production") {
    dotenv.config();
    console.log("Environment variables loaded");
}

const app: Application = express();
const PORT = process.env.PORT || "3000";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:pass@mongo:27017";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('It works!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
