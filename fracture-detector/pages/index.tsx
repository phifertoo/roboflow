import { ChakraProvider } from "@chakra-ui/react";
import Home from "./home";

function IndexPage() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default IndexPage;

// import { useState } from "react";

// const IndexPage: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);

//   const sampleImages = [
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00042.rf.9faad0f1666ce6185ceedad078af6b6e.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00054.rf.2bb037f2857270a135320ce195b1cad8.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00153.rf.9d120a6718faf1b10a2ac7cc68efc805.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00216.rf.d523b8e7a4381a0a169afbff03c2e798.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00215.rf.2a9e359cd3b1f4c88be3ef88fdddb2ee.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00214.rf.91ca187b8bdc7bf4068a1d7df53c0838.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00213.rf.a115dc2766fefe93f77af15b86143ce2.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00212.rf.e1e15d2127d26e08579cd7375d239604.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00211.rf.7194d80c31729d6fddf74cba5de7f7a6.jpg",
//     "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00210.rf.e6633854d48b98cd93153adb018110d2.jpg",
//   ];

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files?.length) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (image) {
//       const formData = new FormData();
//       formData.append("file", image);

//       const response = await fetch("/api/detect", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setResult(data.result);
//     }
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <div style={{ marginBottom: "20px" }}>
//         <h2>Download Sample Images</h2>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(5, 1fr)",
//             gap: "10px",
//           }}
//         >
//           {sampleImages.map((image, index) => (
//             <div
//               key={index}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "8px",
//                 textAlign: "center",
//               }}
//             >
//               <a href={image} download={`SampleImage${index + 1}.jpg`}>
//                 <img
//                   src={image}
//                   alt={`Sample ${index + 1}`}
//                   style={{ width: "100%", height: "auto" }}
//                 />
//                 Download
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleImageChange} accept="image/*" />
//         <button type="submit">Detect Fracture</button>
//       </form>
//       {result && <div>Result: {JSON.stringify(result)}</div>}
//     </div>
//   );
// };

// export default IndexPage;
