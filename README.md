# PDF To Excel Converter

🧪 Tech Stack
Frontend: React, MUI, Axios, pdfjs-dist

Backend: Node.js, Express, Python

PDF to Excel: pdfplumber, pandas, xlsxwriter

---

📂 Project Structure

project-root/
│
├── frontend/       # React client
│   └── FileUploader.jsx
│
├── backend/        # Node.js server + Python script
│   ├── server.js
│   ├── convert.py
│   └── requirements.txt



### ✅ ** Project **

```markdown
# PDF to Excel Converter

This is a full-stack PDF to Excel converter built with **React (frontend)** and **Node.js + Python (backend)**. It allows users to upload a PDF containing tabular data, processes the file on the server using `pdfplumber`, and returns an Excel file as output.

⚠️ Limitations
Only valid PDF files accepted
Best suited for PDFs with tabular content

## 🖥️ Frontend

### Features

- Upload and validate PDF files
- Displays conversion progress
- Automatically downloads `.xlsx` file
- UI built with Material UI (MUI)

### Setup

```bash
cd frontend
npm install
npm start


🔧 Backend
Features
File upload via Express + Multer

Python script to extract tables from PDF and generate Excel

Automatic cleanup of temp files

cd backend
npm install
pip install -r requirements.txt
node server.js

