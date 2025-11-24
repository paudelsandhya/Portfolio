import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";

const GalleryBox = ({ open, toggle }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  
  // Photo paths - using correct paths for GitHub Pages with proper case
  const photos = [
    { src: import.meta.env.BASE_URL + 'assets/photo1.jpg', alt: "Photo 1" },
    { src: import.meta.env.BASE_URL + 'assets/photo2.jpg', alt: "Photo 2" },
    { src: import.meta.env.BASE_URL + 'assets/photo3.jpg', alt: "Photo 3" },
    { src: import.meta.env.BASE_URL + 'assets/photo4.jpg', alt: "Photo 4" },
    { src: import.meta.env.BASE_URL + 'assets/photo5.jpg', alt: "Photo 5" },
    { src: import.meta.env.BASE_URL + 'assets/photo6.jpg', alt: "Photo 6" }
  ];
  
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

  const startSlideshow = (e) => {
    e.stopPropagation();
    if (photos.length > 0) {
      openModal(photos[0], 0);
    }
  };

  return (
    <div className="relative">
      <div
        className={`group rounded-[34px] p-[1px] bg-gradient-to-br from-indigo-300 via-white to-blue-100 shadow-strong cursor-pointer transition-all duration-500 ${
          open ? "min-h-96" : "h-56"
        }`}
        onClick={toggle}
      >
        <div
          className={`relative h-full rounded-[32px] overflow-hidden bg-white/95 border border-white/70 transition-all duration-500 ${
            open ? "shadow-2xl" : "shadow-lg"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),transparent_60%)] opacity-80"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                gallery
              </div>
              <div className="text-xl">📦</div>
            </div>
            <h2 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Gallery</h2>
            <p className="text-sm text-indigo-500 uppercase tracking-[0.4em] mt-1">
              sneak peek
            </p>

            {open ? (
              <div className="mt-6 animate-fadeIn">
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer border border-indigo-100 bg-white/80 shadow-soft hover:-translate-y-1 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(photo, index);
                      }}
                    >
                      {!imageErrors[index] ? (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          onError={() => handleImageError(index)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-indigo-50 flex flex-col items-center justify-center text-indigo-400">
                          <ImageIcon size={24} className="mb-2" />
                          <span className="text-xs uppercase tracking-[0.3em]">photo {index + 1}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-5">
                  <button
                    onClick={startSlideshow}
                    className="bg-indigo-100/80 text-indigo-700 px-5 py-2 rounded-full font-semibold hover:bg-indigo-200 transition-colors inline-flex items-center space-x-2 text-sm shadow-soft"
                  >
                    <span>🎞️</span>
                    <span>View Slideshow</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-indigo-600 opacity-90 mt-8">
                <div className="text-5xl mb-2 animate-bounce">👆🏻</div>
                <div className="text-sm font-semibold tracking-wide">Tap for memories</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Modal/Slideshow */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Main Image */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
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
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            
            {/* Photo Counter */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              Photo {selectedPhoto.index + 1} of {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryBox;