import fs from 'fs';

export function createDir(directory: string) : void {
    console.log(`Creating directory ${directory}`);
    if(!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
        console.log(`Directory ${directory} created.`);
    } else {
        console.log(`Directory ${directory} already exisits.`);
    }
}

export function fileExisits(path: string): Boolean {
    return fs.existsSync(path);
}