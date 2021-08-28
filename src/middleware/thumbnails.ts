import express from 'express';
import path from 'path';
import { createDir, fileExisits } from '../utilities/filesysutils';
import { createThumbnailFromPath } from '../utilities/imageprocessing';
import { runInNewContext } from 'vm';

const thumbnailDir = './assets/thumb/';
const fullDir = './assets/full';

export function createThumbnailDirectory(
    _req: express.Request, _res: express.Response, next: Function): void{
        console.log('Creating thumbnail dir.');
        createDir(thumbnailDir);
        next();
}

export async function createThumbnail(
    req: express.Request, res: express.Response, next: Function): Promise<void>{

    let width = Number(req.query.width);
    let height = Number(req.query.height);
    const filename = req.query.filename;

    if (isNaN(width)) {
        width = 200;
    };
    if (isNaN(height)) {
        height = 200;
    };
    if (filename == null){
        console.log(`file name is not specified.`);
        res.send('Please specify a file name using "/resize?filename=sample.jpg&width=200&height=200"');
        return;
    }
    const inPath = path.join(fullDir, String(filename));
    const outFilenmame = `${width}x${height}_${filename}`;
    const outPath = path.join(thumbnailDir, String(outFilenmame));

    res.locals.inPath = inPath;
    res.locals.outPath = outPath;

    //check if the input filename exisit
    if(!fileExisits(inPath)) {
        console.log(`inPath ${inPath} does not exisit.`);
        res.send(`File ${inPath} does not exisit.`)
        return;

    }

    // check if the output file name exisit
    if (fileExisits(outPath)) {
        console.log('Thumbnail already exisits.');
        res.locals.thumbPath = outPath;
        return next();
    } else {
        console.log('Creating Thumbnail.');
        await createThumbnailFromPath(inPath, outPath, width, height);
        res.locals.thumbPath = outPath;
    }
    next();
};

export function sendThumbnail(_req: express.Request, res: express.Response, next: Function): void {
    // check if thumbPath exisits
    if (res.locals.thumbPath == null || !fileExisits(res.locals.thumbPath)) {
        console.log('Thumbnail path not specified.');
        res.status(500).send('Could not find thumbnail.');
        return;
    } 
    res.sendFile(path.resolve(res.locals.thumbPath)); 
    next();

};



