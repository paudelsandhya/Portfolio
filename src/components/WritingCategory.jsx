import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Eye, AlertCircle, FileText } from 'lucide-react';
import Header from './Header.jsx';

const CATEGORY_FILES = {
    Monologues: ['The Shape Of Yes.pdf'],
    Poems: ['all my love..pdf', 'floor.pdf', 'so, bitter..pdf', 'whispers.pdf'],
    Researches: ['Data Privacy and Security in Health Technologies.pdf'],
    'Short-Stories': ['The Invitation.pdf'],
};

const CATEGORY_META = {
    Monologues: { label: 'Monologues', emoji: '🎭' },
    Poems: { label: 'Poems', emoji: ' 🕊️' },
    Researches: { label: 'Researches', emoji: '🔬' },
    'Short-Stories': { label: 'Short Stories', emoji: '📖' },
};

const PdfCard = ({ filename, pdfPath }) => {
    const [viewStatus, setViewStatus] = useState('');
    const [downloadStatus, setDownloadStatus] = useState('');

    const displayName = filename.replace(/\.pdf$/i, '');

    const handleView = async () => {
        setViewStatus('loading');
        try {
            const res = await fetch(pdfPath, { method: 'HEAD' });
            if (!res.ok) throw new Error('not found');
            window.open(pdfPath, '_blank');
            setViewStatus('success');
        } catch {
            setViewStatus('error');
        } finally {
            setTimeout(() => setViewStatus(''), 2500);
        }
    };

    const handleDownload = async () => {
        setDownloadStatus('downloading');
        try {
            const res = await fetch(pdfPath);
            if (!res.ok) throw new Error('not found');
            const blob = await res.blob();
            if (blob.size === 0) throw new Error('empty');
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setDownloadStatus('success');
        } catch {
            setDownloadStatus('error');
        } finally {
            setTimeout(() => setDownloadStatus(''), 2500);
        }
    };

    const viewLabel = {
        loading: 'Loading…',
        success: '✅ Opened!',
        error: 'Try Again',
        '': 'View Online',
    }[viewStatus];

    const downloadLabel = {
        downloading: 'Downloading…',
        success: '✅ Downloaded!',
        error: 'Try Again',
        '': 'Download',
    }[downloadStatus];

    return (
        <div
            className="rounded-2xl p-6 text-center"
            style={{ backgroundColor: '#f5e4dc' }}
        >

            <p className="font-semibold text-grey-crimson mb-5 leading-snug">{displayName}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* View Online — blue */}
                <button
                    onClick={handleView}
                    disabled={viewStatus === 'loading'}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all duration-300
            ${viewStatus === 'error' ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : viewStatus === 'success' ? 'bg-green-100 text-green-600'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'}
            ${viewStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {viewStatus === 'loading'
                        ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-200" /><span>{viewLabel}</span></>
                        : <><Eye size={16} /><span>{viewLabel}</span></>}
                </button>

                {/* Download — red */}
                <button
                    onClick={handleDownload}
                    disabled={downloadStatus === 'downloading'}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all duration-300
            ${downloadStatus === 'error' ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : downloadStatus === 'success' ? 'bg-green-100 text-green-600'
                                : 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg hover:-translate-y-0.5'}
            ${downloadStatus === 'downloading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {downloadStatus === 'downloading'
                        ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-200" /><span>{downloadLabel}</span></>
                        : <><Download size={16} /><span>{downloadLabel}</span></>}
                </button>
            </div>
        </div>
    );
};

const WritingCategory = () => {
    const { category } = useParams();
    const files = CATEGORY_FILES[category];
    const meta = CATEGORY_META[category];

    if (!files || !meta) {
        return (
            <div
                className="min-h-screen font-sans relative overflow-hidden"
                style={{ backgroundImage: 'url(/Background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
            >
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-grey-crimson text-xl">Category not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{ backgroundImage: 'url(/Background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <Header />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(251,207,232,0.3),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(253,164,175,0.25),transparent_40%)]" />

            <div className="container mx-auto px-4 pt-36 md:pt-44 pb-20 relative max-w-2xl">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-grey-crimson">
                        {meta.label}
                    </h1>
                </motion.div>

                {/* One PDF per row, centered */}
                <div className="flex flex-col gap-5">
                    {files.map((filename, i) => (
                        <motion.div
                            key={filename}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                        >
                            <PdfCard
                                filename={filename}
                                pdfPath={`/Workspace/Writing/${category}/${filename}`}
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WritingCategory;
