import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { IncomingForm, File, Files } from "formidable";
import fs from "fs";

// Configuration to disable the default Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Extends the File type from formidable with a path property
interface ExtendedFile extends File {
  path: string;
}

// API endpoint handling POST requests for file uploads
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST method, return 405 for other methods
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const form = new IncomingForm();

  // Parse the incoming form to handle files and fields
  form.parse(req, async (err, fields, files: Files) => {
    if (err) {
      return res.status(500).json({ message: "Error parsing the form data" });
    }

    // Ensure files are correctly typed as an array of ExtendedFile
    const uploadedFiles = files.file as ExtendedFile[];

    // Check if files are uploaded, return 400 if none
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = uploadedFiles[0];

    try {
      // Read file data from the filesystem
      const fileData = fs.readFileSync(file.filepath);
      // Encode file data to base64 for API transmission
      const imageBase64 = Buffer.from(fileData).toString("base64");

      // Send a POST request to Roboflow API with the image data
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/x-ray-bone-fracture/1",
        params: {
          api_key: process.env.ROBOFLOW_API_KEY, // Use environment variable for API key
        },
        data: `data:image/jpeg;base64,${imageBase64}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Return the API response to the client
      res.status(200).json(response.data);
    } catch (innerError) {
      console.error(innerError);
      // Handle any errors during file processing or API interaction
      res
        .status(500)
        .json({ message: "Error processing image", error: innerError.message });
    }
  });
};
