import express from 'express';
import resize from './api/resize';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('This is the main route. There is nothing here. Try /resize instead');
});

routes.use('/resize', resize)


export default routes;