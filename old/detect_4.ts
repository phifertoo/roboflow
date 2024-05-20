// Import the necessary components from formidable
import {
  IncomingForm,
  File as FormidableFile,
  Fields,
  Files,
} from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

// Extend Formidable's File type to ensure all properties are available
interface ExtendedFile extends FormidableFile {
  path: string; // Ensure 'path' is recognized
  name: string; // Ensure 'name' is recognized
  size: number;
  type: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();
  form.parse(req, (err, fields, files: { [key: string]: ExtendedFile[] }) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error parsing the form data" });
    }

    // Example of accessing the uploaded file
    const uploadedFile = files["uploadedFile"]
      ? files["uploadedFile"][0]
      : null;
    if (uploadedFile) {
      console.log("Uploaded file name:", uploadedFile.name);
      console.log("Uploaded file path:", uploadedFile.path);
      res
        .status(200)
        .json({
          message: "File uploaded successfully",
          fileName: uploadedFile.name,
        });
    } else {
      res.status(400).json({ message: "No file was uploaded" });
    }
  });
};

// Helper function to parse form data with formidable
function parseForm(
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> {
  const form = new IncomingForm(); // You can set various options on the form here.
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
}
