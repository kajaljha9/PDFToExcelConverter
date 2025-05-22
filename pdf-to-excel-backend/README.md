### ✅ **Backend**

```markdown
# PDF to Excel Backend

This is the backend for a PDF to Excel file converter. It accepts a PDF file upload, converts its table data to Excel using Python, and returns the converted file to the client.

## Features

- Accepts PDF file uploads
- Extracts table data using `pdfplumber`
- Converts and merges tables into a single Excel file
- Automatically deletes temporary files
- Reports conversion progress via server logs

## Technologies Used

- Node.js (Express, Multer)
- Python (pdfplumber, pandas, xlsxwriter)
- Cross-platform command execution (child_process)

## Getting Started

### Prerequisites

- Node.js
- Python 3
- pip

### Installation

1. Navigate to the `backend/` directory:
   ```bash
   cd backend


## Install Node.js dependencies:
npm install

## Install Python dependencies:
pip install -r requirements.txt

## Start the server:
node server.js

