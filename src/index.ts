import express, { Application, Request, Response, NextFunction } from 'express';

import csv from 'csv-parser';
import multer from 'multer';
import fs from 'fs';

const app: Application = express();

const upload = multer({dest: 'tmp/test/csv'});
const readFile = (fileName: string ) => new Promise<any[]>((resolve, reject) => {    
    const stream: any = [];
    fs.createReadStream(fileName).pipe(csv()) 
      .on('data', (data) => stream.push(data))
      .on('end', () => {
         resolve(stream)
    });
});

app.post(
    '/test', 
    upload.single('file'), 
    async ( req, res, next ) => { 
        const fileContents: any[] = await readFile((req as any).file.path);    
        res.json(fileContents);
    }
);
app.get('/test', async ( req, res, next ) => { 
    res.send("get working");
})

app.get('/',(req: Request, res: Response, next: NextFunction) => {
    res.send("Root route is working");
});
app.listen(3000,() => {
    console.log("Server listening on port 3000");
});