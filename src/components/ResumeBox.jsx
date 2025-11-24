import React, { useState } from "react";
import { Download, FileText, AlertCircle, Eye } from "lucide-react";

const ResumeBox = ({ open, toggle }) => {
  const [downloadStatus, setDownloadStatus] = useState("");
  const [viewStatus, setViewStatus] = useState("");

  // Correct path for GitHub Pages
  const resumePath = "/Portfolio/assets/SandhyaResume.pdf";

  const downloadCV = async (e) => {
    e.stopPropagation();
    setDownloadStatus("downloading");

    try {
      const response = await fetch(resumePath);
      
      if (response.ok) {
        const blob = await response.blob();
        
        // Verify the blob is not empty
        if (blob.size === 0) {
          throw new Error("PDF file is empty");
        }
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Sandhya_Paudel_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setDownloadStatus("success");
        setTimeout(() => setDownloadStatus(""), 2000);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      setDownloadStatus("error");
      setTimeout(() => setDownloadStatus(""), 3000);
    }
  };

  const viewCV = async (e) => {
    e.stopPropagation();
    setViewStatus("loading");

    try {
      const response = await fetch(resumePath);
      
      if (response.ok) {
        const blob = await response.blob();
        
        // Verify the blob is not empty
        if (blob.size === 0) {
          throw new Error("PDF file is empty");
        }
        
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        
        // Clean up the URL after a delay
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        
        setViewStatus("success");
        setTimeout(() => setViewStatus(""), 2000);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      console.error("Error viewing resume:", error);
      setViewStatus("error");
      setTimeout(() => setViewStatus(""), 3000);
    }
  };

  const getDownloadButtonContent = () => {
    switch (downloadStatus) {
      case "downloading":
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
            <span>Downloading...</span>
          </>
        );
      case "success":
        return (
          <>
            <span>✅</span>
            <span>Downloaded!</span>
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle size={16} />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Download size={16} />
            <span>Download PDF</span>
          </>
        );
    }
  };

  const getViewButtonContent = () => {
    switch (viewStatus) {
      case "loading":
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Loading...</span>
          </>
        );
      case "success":
        return (
          <>
            <span>✅</span>
            <span>Opened!</span>
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle size={16} />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Eye size={16} />
            <span>View Online</span>
          </>
        );
    }
  };

  return (
    <div className="relative">
      <div
        className={`group rounded-[34px] p-[1px] bg-gradient-to-br from-rose-300 via-white to-orange-100 shadow-strong cursor-pointer transition-all duration-500 ${
          open ? "min-h-96" : "h-56"
        }`}
        onClick={toggle}
      >
        <div
          className={`relative h-full rounded-[32px] overflow-hidden bg-white/95 border border-white/70 transition-all duration-500 ${
            open ? "shadow-2xl" : "shadow-lg"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(244,114,182,0.18),transparent_65%)] opacity-80"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
                resume
              </div>
              <div className="text-xl">📦</div>
            </div>
            <h2 className="text-3xl font-extrabold text-rose-900 tracking-tight">Resume</h2>
            <p className="text-sm text-rose-500 uppercase tracking-[0.4em] mt-1">
              open carefully
            </p>

            {open ? (
              <div className="mt-6 space-y-4 animate-fadeIn">
                <button
                  onClick={viewCV}
                  disabled={viewStatus === "loading"}
                  className={`w-full rounded-2xl border border-rose-100 px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-soft hover:-translate-y-1 transition-all ${
                    viewStatus === "error"
                      ? "bg-red-50 text-red-600"
                      : viewStatus === "success"
                      ? "bg-green-50 text-green-600"
                      : "bg-blue-50 text-blue-700"
                  } ${viewStatus === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {getViewButtonContent()}
                </button>
                <button
                  onClick={downloadCV}
                  disabled={downloadStatus === "downloading"}
                  className={`w-full rounded-2xl border border-rose-100 px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-soft hover:-translate-y-1 transition-all ${
                    downloadStatus === "error"
                      ? "bg-red-50 text-red-600"
                      : downloadStatus === "success"
                      ? "bg-green-50 text-green-600"
                      : "bg-rose-50 text-rose-700"
                  } ${downloadStatus === "downloading" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {getDownloadButtonContent()}
                </button>

                {(downloadStatus === "error" || viewStatus === "error") && (
                  <p className="text-rose-600/80 text-xs text-center">
                    Resume file not available. Please ensure SandhyaResume.pdf is in the public/assets folder.
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center text-rose-600 opacity-90 mt-8">
                <div className="text-5xl mb-2 animate-bounce">👆🏻</div>
                <div className="text-sm font-semibold tracking-wide">Tap to unwrap the CV</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBox;