import pdfplumber
import sys
import pandas as pd
import os
import xlsxwriter

def rows_equal(row1, row2):
    """Utility to compare two rows (lists of strings)"""
    if len(row1) != len(row2):
        return False
    return all((a or "").strip() == (b or "").strip() for a, b in zip(row1, row2))

def convert_pdf_to_excel(input_pdf, output_xlsx):
    with pdfplumber.open(input_pdf) as pdf:
        total_pages = len(pdf.pages)
        with pd.ExcelWriter(output_xlsx, engine='xlsxwriter') as writer:
            workbook = writer.book
            worksheet = workbook.add_worksheet("MergedData")
            writer.sheets["MergedData"] = worksheet

            row_cursor = 0
            last_header = None

            for page_num, page in enumerate(pdf.pages, start=1):
                try:
                    tables = page.extract_tables()
                    for table in tables:
                        if not table or not any(row for row in table):
                            continue

                        # Separate header and body
                        header = table[0]
                        body = table[1:]

                        # Check if current header matches last
                        if last_header is None or not rows_equal(header, last_header):
                            # Write new header
                            for col_index, cell in enumerate(header):
                                worksheet.write(row_cursor, col_index, cell)
                            row_cursor += 1
                            last_header = header

                        # Write body rows
                        for row in body:
                            for col_index, cell in enumerate(row):
                                worksheet.write(row_cursor, col_index, cell)
                            row_cursor += 1

                        # Add a small space after each table
                        row_cursor += 1

                    print(f"PROGRESS::{page_num}/{total_pages}", flush=True)

                except Exception as e:
                    print(f"Error processing page {page_num}: {e}", flush=True)

    print(f"Excel file created: {output_xlsx}", flush=True)
    return True

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert.py input.pdf output.xlsx")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_xlsx = sys.argv[2]

    if not os.path.exists(input_pdf):
        print(f"File does not exist: {input_pdf}", flush=True)
        sys.exit(1)

    success = convert_pdf_to_excel(input_pdf, output_xlsx)
    if not success:
        sys.exit(1)
