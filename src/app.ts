import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import path from 'path';
import cors from 'cors';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import { router } from './routes';

import createConnection from './database';
import './shared/container';

const app = express();

createConnection();

app.use(express.json());
app.use(cors());
app.use(router);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'public', 'views'));
app.use(express.static('public'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message
        });
    }

    return response.status(500).json({ message: `Internal server error` });
});

export { app };