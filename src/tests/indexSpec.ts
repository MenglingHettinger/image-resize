import app from '../index';
import supertest from 'supertest';
import fs from 'fs';

const request = supertest(app);

describe('Test endpoint /resize', () => {
    const thumbnailDir = './assets/thumb';
    afterAll(function () {
        if (fs.existsSync(thumbnailDir)) {
            fs.rmdirSync(thumbnailDir, {recursive: true});
        }
    });

    it('Gets the /resize endpoint', async(done) => {
        const response = await request.get('/resize');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Please specify a filename using "/resize?filename=sample.jpg&width=200&height=200"');
        done();

    });
});