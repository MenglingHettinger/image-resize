import sharp from 'sharp';


export async function createThumbnailFromPath(inPath: string, 
    outPath: string, 
    resizedWidth: number, 
    resizedHeight: number) : Promise<void>{
    await sharp(inPath).resize({width: resizedWidth, height: resizedHeight}).toFile(outPath);
    console.log('Thumbnail created.')
};
