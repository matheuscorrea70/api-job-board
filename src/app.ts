import 'dotenv/config'

import express from "express";
import bodyParser from "body-parser";
import dataSource from "./configs/dataSource";
import { routes as apiRoutes } from './routes/index';

const app = express();

dataSource.initialize();

app.set("port", process.env.PORT || 3051);
app.use(bodyParser.json());
app.use('/api', apiRoutes);

export default app;
