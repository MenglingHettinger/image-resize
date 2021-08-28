import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// Use the routes
app.use('/', routes);

// Create the server
app.listen(port, () => {
    console.log(`Server is up at locahost:${port}`);
})

export default app;
