import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { IncomingForm, File as FormidableFile } from "formidable";
import fs from "fs";

interface ExtendedFormidableFile extends FormidableFile {
  path?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Convert the asynchronous form.parse method into a promise-based method
  const form = new IncomingForm();
  const formPromise = new Promise((resolve, reject) => {
    form.parse(
      req,
      (err, fields, files: { [key: string]: ExtendedFormidableFile[] }) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      }
    );
  });

  const output = await formPromise;
  console.log(output);

  // try {
  //   const { fields, files } = (await formPromise) as {
  //     fields: any;
  //     files: { [key: string]: ExtendedFormidableFile[] };
  //   };

  //   console.log(files, fields);

  //   if (!files.file || files.file.length === 0) {
  //     return res.status(400).json({ message: "No file uploaded" });
  //   }

  //   console.log("c");

  //   const file = files.file[0];

  //   if (!file.path) {
  //     return res.status(500).json({ message: "File path not available" });
  //   }

  //   const fileData = fs.readFileSync(file.path);
  //   const imageBase64 = Buffer.from(fileData).toString("base64");
  //   console.log("d");

  //   const response = await axios({
  //     method: "POST",
  //     url: "https://detect.roboflow.com/x-ray-bone-fracture/1",
  //     params: {
  //       api_key: process.env.ROBOFLOW_API_KEY,
  //     },
  //     data: `data:image/jpeg;base64,${imageBase64}`,
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });

  //   return res.status(200).json(response.data);
  // } catch (error) {
  //   console.error(error);
  //   return res
  //     .status(500)
  //     .json({ message: "Error processing request", error: error.message });
  // }
};
