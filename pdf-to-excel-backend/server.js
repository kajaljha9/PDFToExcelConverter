//server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// POST endpoint to handle PDF upload and conversion


app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.resolve(req.file.path);
  const outputPath = path.resolve(`uploads/${req.file.filename}.xlsx`);
  const python = spawn("python", ["convert.py", filePath, outputPath]);

  let excelBuffer = Buffer.alloc(0);
  let progress = 0;
  let totalPages = 100;

  python.stdout.on("data", (data) => {
    const text = data.toString();
    console.log("PYTHON STDOUT:", text);

    if (text.startsWith("PROGRESS::")) {
      const [current, total] = text.replace("PROGRESS::", "").split("/");
      progress = Math.round((parseInt(current) / parseInt(total)) * 100);
    }
  });

  python.stderr.on("data", (data) => {
    console.error("PYTHON STDERR:", data.toString());
  });

  python.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Conversion failed." });
    }

    res.download(outputPath, "converted.xlsx", (err) => {
      if (err) console.error("Download error:", err);
      fs.unlink(filePath, () => {});
      fs.unlink(outputPath, () => {});
    });
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
