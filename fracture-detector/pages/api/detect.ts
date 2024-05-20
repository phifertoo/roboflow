import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { IncomingForm, File, Files } from "formidable";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};
// Extend the File type to include necessary properties
interface ExtendedFile extends File {
  path: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files: Files) => {
    if (err) {
      return res.status(500).json({ message: "Error parsing the form data" });
    }

    // Cast files to the correct type
    const uploadedFiles = files.file as ExtendedFile[];

    // Handle the case where no file is uploaded
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = uploadedFiles[0];

    try {
      const fileData = fs.readFileSync(file.filepath);
      const imageBase64 = Buffer.from(fileData).toString("base64");

      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/x-ray-bone-fracture/1",
        params: {
          api_key: process.env.ROBOFLOW_API_KEY, // Environment variable for API key
        },
        data: `data:image/jpeg;base64,${imageBase64}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Send the response from Roboflow back to the client
      res.status(200).json(response.data);
    } catch (innerError) {
      console.error(innerError);
      res
        .status(500)
        .json({ message: "Error processing image", error: innerError.message });
    }
  });
};
