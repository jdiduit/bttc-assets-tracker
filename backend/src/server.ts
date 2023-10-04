import express from 'express';
import morgan from "morgan";
import * as path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config'
import routes from './routes';
import {errorMiddleware} from "./middlewares/errorMiddleware";
import logger from "./utils/logger";
import compression from 'compression';
import compressFilter from "./utils/compressFilter.util";

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
)

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', '*')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(express.json())
app.use(compression({ filter: compressFilter }));
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))
app.use('/api', routes)

app.use(errorMiddleware)

const server = app.listen(PORT, () => {
    logger.log('info', `Server is running on Port: ${PORT}`);
})

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received.');
    logger.info('Closing server.');
    server.close((err) => {
        logger.info('Server closed.');
        process.exit(err ? 1 : 0);
    });
});
