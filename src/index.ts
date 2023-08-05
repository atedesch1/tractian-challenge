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

mongoose.plugin((schema) => {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function(_doc, ret) { delete ret._id }
    })
});

app.use(bodyParser.json());

import router from './router';
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
