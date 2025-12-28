import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, AlertCircle, Eye, FileText } from 'lucide-react'

export default function ResumeDisplay() {
    const [downloadStatus, setDownloadStatus] = useState("")
    const [viewStatus, setViewStatus] = useState("")

    // Correct path for GitHub Pages
    const resumePath = `${import.meta.env.BASE_URL}assets/SandhyaResume.pdf`

    const downloadCV = async () => {
        setDownloadStatus("downloading")

        try {
            const response = await fetch(resumePath)

            if (response.ok) {
                const blob = await response.blob()

                // Verify the blob is not empty
                if (blob.size === 0) {
                    throw new Error("PDF file is empty")
                }

                const url = window.URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.download = "Sandhya_Poudel_Resume.pdf"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)

                setDownloadStatus("success")
                setTimeout(() => setDownloadStatus(""), 2000)
            } else {
                throw new Error("File not found")
            }
        } catch (error) {
            console.error("Error downloading resume:", error)
            setDownloadStatus("error")
            setTimeout(() => setDownloadStatus(""), 3000)
        }
    }

    const viewCV = async () => {
        setViewStatus("loading")

        try {
            // Check if the file exists by making a HEAD request
            const response = await fetch(resumePath, { method: 'HEAD' })

            if (response.ok) {
                // Open the PDF directly using its actual URL
                // This preserves the original filename in the browser
                window.open(resumePath, '_blank')

                setViewStatus("success")
                setTimeout(() => setViewStatus(""), 2000)
            } else {
                throw new Error("File not found")
            }
        } catch (error) {
            console.error("Error viewing resume:", error)
            setViewStatus("error")
            setTimeout(() => setViewStatus(""), 3000)
        }
    }

    const getDownloadButtonContent = () => {
        switch (downloadStatus) {
            case "downloading":
                return (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-rose-600"></div>
                        <span>Downloading...</span>
                    </>
                )
            case "success":
                return (
                    <>
                        <span>✅</span>
                        <span>Downloaded!</span>
                    </>
                )
            case "error":
                return (
                    <>
                        <AlertCircle size={20} />
                        <span>Try Again</span>
                    </>
                )
            default:
                return (
                    <>
                        <Download size={20} />
                        <span>Download Resume</span>
                    </>
                )
        }
    }

    const getViewButtonContent = () => {
        switch (viewStatus) {
            case "loading":
                return (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span>Loading...</span>
                    </>
                )
            case "success":
                return (
                    <>
                        <span>✅</span>
                        <span>Opened!</span>
                    </>
                )
            case "error":
                return (
                    <>
                        <AlertCircle size={20} />
                        <span>Try Again</span>
                    </>
                )
            default:
                return (
                    <>
                        <Eye size={20} />
                        <span>View Online</span>
                    </>
                )
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >

            {/* Resume Preview Area */}
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#f5e4dc' }}>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4" style={{ backgroundColor: 'rgba(95, 73, 80, 0.1)' }}>
                    <FileText className="text-grey-crimson" size={60} />
                </div>
                <p className="text-grey-crimson mb-6">
                    View online or download my complete resume in PDF format
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <button
                        onClick={viewCV}
                        disabled={viewStatus === "loading"}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${viewStatus === "error"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : viewStatus === "success"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1"
                            } ${viewStatus === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {getViewButtonContent()}
                    </button>

                    <button
                        onClick={downloadCV}
                        disabled={downloadStatus === "downloading"}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${downloadStatus === "error"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : downloadStatus === "success"
                                ? "bg-green-100 text-green-600"
                                : "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1"
                            } ${downloadStatus === "downloading" ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {getDownloadButtonContent()}
                    </button>
                </div>

                {(downloadStatus === "error" || viewStatus === "error") && (
                    <p className="text-red-600 text-sm mt-4">
                        Resume file not available. Please ensure SandhyaResume.pdf is in the public/assets folder.
                    </p>
                )}
            </div>
        </motion.div>
    )
}
