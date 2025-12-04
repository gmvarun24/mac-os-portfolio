import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RESUME_PDF_PATH = "files/resume.pdf";

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href={RESUME_PDF_PATH}
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      {error && (
        <div className="error-message">Failed to load PDF: {error}</div>
      )}
      <div className="pdf-container">
        <Document
          file={RESUME_PDF_PATH}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => setError(error.message)}
          loading={<div className="loading">Loading PDF...</div>}
        >
          {numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer
                renderAnnotationLayer
                className="pdf-page"
              />
            ))}
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
