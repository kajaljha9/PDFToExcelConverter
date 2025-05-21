// // FileUploader.jsx:====>1
// import React, { useState, useRef } from "react";
// import {
//   Button,
//   LinearProgress,
//   Typography,
//   Box,
//   Paper,
//   Input,
//   Stack
// } from "@mui/material";
// import axios from "axios";
// import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
// import pdfWorker from "../pdf.worker";

// GlobalWorkerOptions.workerSrc = pdfWorker;

// const FileUploader = () => {
//   const fileInputRef = useRef();
//   const controllerRef = useRef(null);

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     setLoading(true);
//     setProgress(0);

//     const controller = new AbortController();
//     controllerRef.current = controller;

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/upload",
//         formData,
//         {
//           responseType: "blob",
//           signal: controller.signal,
//           onDownloadProgress: (progressEvent) => {
//             if (progressEvent.lengthComputable) {
//               const percentCompleted = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total
//               );
//               setProgress(percentCompleted);
//             } else {
//               setProgress((prev) => (prev < 90 ? prev + 10 : prev));
//             }
//           }
//         }
//       );

//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       });

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "converted.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       // ✅ Clear file input and state
//       setFile(null);
//       fileInputRef.current.value = null;
//     } catch (err) {
//       if (axios.isCancel(err)) {
//         console.log("Conversion canceled by user.");
//         alert("Conversion canceled.");
//       } else {
//         console.error(err);
//         alert("Error uploading or converting PDF.");
//         // ✅ Clear file input and state
//         setFile(null);
//         fileInputRef.current.value = null;
//       }
//     }

//     setLoading(false);
//     setProgress(0);
//     controllerRef.current = null;
//   };

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     if (!selectedFile.type || selectedFile.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const typedarray = new Uint8Array(event.target.result);

//       try {
//         const pdf = await getDocument({ data: typedarray }).promise;
//         if (pdf.numPages > 200) {
//           alert("⚠️ Only PDFs with up to 200 pages are allowed.");
//           return;
//         }
//         setFile(selectedFile);
//       } catch (err) {
//         console.error("Failed to read PDF:", err);
//         alert("Invalid PDF file.");
//       }
//     };
//     reader.readAsArrayBuffer(selectedFile);
//   };

//   const handleCancel = () => {
//     if (controllerRef.current) {
//       controllerRef.current.abort();
//     }
//     setLoading(false);
//     setProgress(0);
//     // ✅ Clear file input and state
//     setFile(null);
//     fileInputRef.current.value = null;
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//       <Paper elevation={3} sx={{ p: 4, width: 400 }}>
//         <Typography variant="h5" gutterBottom>
//           PDF to Excel Converter
//         </Typography>
//         <Stack spacing={2}>
//           <Input
//             type="file"
//             inputProps={{ accept: "application/pdf" }}
//             onChange={handleFileChange}
//             inputRef={fileInputRef}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleUpload}
//             disabled={!file || loading}
//           >
//             Convert to Excel
//           </Button>

//           {loading && (
//             <>
//               <LinearProgress variant="determinate" value={progress} />
//               <Typography variant="body2" align="center">
//                 Processing...
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={handleCancel}
//                 sx={{ mt: 1 }}
//               >
//                 Cancel
//               </Button>
//             </>
//           )}
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default FileUploader;

////////////////////////////////////////////////!SECTION

// FileUploader.jsx:====>2

import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Paper,
  Input,
  Stack,
  Avatar,
  useTheme
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "../pdf.worker";

GlobalWorkerOptions.workerSrc = pdfWorker;

const FileUploader = () => {
  const theme = useTheme();
  const fileInputRef = useRef();
  const controllerRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setProgress(0);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          responseType: "blob",
          signal: controller.signal,
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            } else {
              setProgress((prev) => (prev < 90 ? prev + 10 : prev));
            }
          }
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(" Conversion successful!");
      setFile(null);
      fileInputRef.current.value = null;
    } catch (err) {
      if (axios.isCancel(err)) {
        toast("⚠️ Conversion canceled");
      } else {
        toast.error("❌ Failed to upload or convert the file");
      }
      setFile(null);
      fileInputRef.current.value = null;
    }

    setLoading(false);
    setProgress(0);
    controllerRef.current = null;
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type || selectedFile.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const typedarray = new Uint8Array(event.target.result);

      try {
        const pdf = await getDocument({ data: typedarray }).promise;
        if (pdf.numPages > 500) {
          toast.error("PDF has more than 500 pages. Limit exceeded.");
          return;
        }
        setFile(selectedFile);
        toast.success("PDF ready for conversion");
      } catch (err) {
        console.error("Failed to read PDF:", err);
        toast.error("Invalid PDF file.");
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setLoading(false);
    setProgress(0);
    setFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3
      }}
    >
      <Toaster position="top-center" />
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.9)"
        }}
      >
        <Avatar
          // variant="square"
          src="/src/assets/logo193.jpg"
          alt="PDFtoEXCEL-LOGO"
          sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
        />
        <Typography variant="h5" gutterBottom fontWeight="bold">
          PDF to Excel Converter
        </Typography>

        <Input
          type="file"
          inputProps={{ accept: "application/pdf" }}
          onChange={handleFileChange}
          inputRef={fileInputRef}
          disableUnderline
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: 1,
            p: 1,
            mb: 2
          }}
        />

        <Stack spacing={2}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            disabled={!file || loading}
            fullWidth
            size="large"
            sx={{ textTransform: "none" }}
          >
            Convert to Excel
          </Button>

          {loading && (
            <>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ borderRadius: 2 }}
              />
              <Typography variant="body2" color="text.secondary" >
                Processing...
              </Typography>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                color="error"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default FileUploader;
