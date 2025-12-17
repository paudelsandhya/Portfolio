import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import Header from "./Header.jsx";

const Gallery = () => {
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState({});

    // Photo paths - using correct paths for GitHub Pages
    const photos = [
        { src: `${import.meta.env.BASE_URL}assets/photo1.jpg`, alt: "Photo 1" },
        { src: `${import.meta.env.BASE_URL}assets/photo2.jpg`, alt: "Photo 2" },
        { src: `${import.meta.env.BASE_URL}assets/photo3.jpg`, alt: "Photo 3" },
        { src: `${import.meta.env.BASE_URL}assets/photo4.jpg`, alt: "Photo 4" },
        { src: `${import.meta.env.BASE_URL}assets/photo5.jpg`, alt: "Photo 5" },
        { src: `${import.meta.env.BASE_URL}assets/photo6.jpg`, alt: "Photo 6" }
    ];

    const handleBack = () => {
        navigate("/");
    };

    const openModal = (photo, index) => {
        setSelectedPhoto({ ...photo, index });
        setCurrentSlideIndex(index);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    const nextSlide = () => {
        const nextIndex = (currentSlideIndex + 1) % photos.length;
        setCurrentSlideIndex(nextIndex);
        setSelectedPhoto({ ...photos[nextIndex], index: nextIndex });
    };

    const prevSlide = () => {
        const prevIndex = currentSlideIndex === 0 ? photos.length - 1 : currentSlideIndex - 1;
        setCurrentSlideIndex(prevIndex);
        setSelectedPhoto({ ...photos[prevIndex], index: prevIndex });
    };

    const handleImageError = (index) => {
        setImageErrors(prev => ({ ...prev, [index]: true }));
        console.log(`Failed to load image: ${photos[index].src}`);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedPhoto) return;

            if (e.key === "ArrowRight") {
                nextSlide();
            } else if (e.key === "ArrowLeft") {
                prevSlide();
            } else if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedPhoto, currentSlideIndex]);

    return (
        <div className="min-h-screen bg-[#FFC5D3] font-sans relative overflow-hidden">
            <Header />

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-300/15 rounded-full blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="relative pt-36 md:pt-44 pb-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Gallery Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.4em] text-purple-400 mb-4">
                            
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4">
                            Photo Gallery
                        </h1>
                        <p className="text-lg text-purple-700">
                            A collection of moments and memories 📸
                        </p>
                        <p className="text-lg text-red-700">
                            (This page will soon be updated to include my artworks and blogs as well.)
                        </p>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className="group aspect-square rounded-3xl overflow-hidden cursor-pointer border-4 border-white bg-white shadow-strong hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                onClick={() => openModal(photo, index)}
                            >
                                {!imageErrors[index] ? (
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={() => handleImageError(index)}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-purple-50 flex flex-col items-center justify-center text-purple-400">
                                        <ImageIcon size={48} className="mb-4" />
                                        <span className="text-sm uppercase tracking-[0.3em] font-semibold">
                                            Photo {index + 1}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Photo Modal/Slideshow */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-5xl max-h-full p-4">
                        {/* Main Image */}
                        <img
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 bg-purple-600/80 hover:bg-purple-700 text-white rounded-full p-3 backdrop-blur-sm transition-colors shadow-xl"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation Arrows */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevSlide();
                                    }}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 text-white rounded-full p-3 backdrop-blur-sm transition-colors shadow-xl"
                                    aria-label="Previous photo"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextSlide();
                                    }}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 text-white rounded-full p-3 backdrop-blur-sm transition-colors shadow-xl"
                                    aria-label="Next photo"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </>
                        )}

                        {/* Photo Counter & Keyboard Hint */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                            <div className="bg-purple-600/90 text-white px-5 py-2 rounded-full backdrop-blur-sm font-semibold shadow-xl">
                                Photo {selectedPhoto.index + 1} of {photos.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
