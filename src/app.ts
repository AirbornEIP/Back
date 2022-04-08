import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as apiResponse from './helpers/apiResponse';
import apiRoutes from './routes/index';

dotenv.config({ path: ".env.".concat(process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development') });

const app = express();
app.disable('x-powered-by');

if (!process.env.NODE_ENV) {
    console.error('No NODE_ENV in .env');
    process.exit(1);
}

app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('API running');
});

app.use('/api/', apiRoutes);

app.all('*', (req: express.Request, res: express.Response) => apiResponse.notFoundResponse(res, 'Not found'));

app.use((err: any, req: express.Request, res: express.Response) => {
    if (err.name === 'UnauthorizedError') {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
    return apiResponse.errorResponse(res, err.message);
});

export default app;
