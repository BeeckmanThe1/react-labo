import express from 'express';
import { initApp } from './app';
import { router } from './routes';
import path from 'path'
import cors from 'cors';
const app = express()


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(express.static(path.join(__dirname, '../dist-client')))
app.use(express.static(path.join(__dirname, './styles')))

app.use('/static', express.static(path.join(__dirname, './static')))

initApp(app).then(() => console.log('Application running successfully'));
