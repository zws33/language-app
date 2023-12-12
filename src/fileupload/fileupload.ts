import csv from "csv-parser";
import multer from "multer";
import fs from "fs";

export const upload = multer({ dest: "tmp/test/csv" });
export const readFile = (fileName: string) =>
  new Promise<any[]>((resolve, reject) => {
    const stream: any = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (data) => stream.push(data))
      .on("end", () => {
        resolve(stream);
      });
  });