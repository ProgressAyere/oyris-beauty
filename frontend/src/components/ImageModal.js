"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageModal({ isOpen, onClose, imageSrc, title }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setZoom(1); // Reset zoom when modal opens
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative w-full max-w-4xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="flex-1 overflow-auto bg-black/50 rounded-lg">
          <div
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.2s ease-out",
            }}
            className="origin-center"
          >
            <Image
              src={imageSrc}
              alt={title}
              width={1200}
              height={1600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="mt-4 flex items-center justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl"
          >
            −
          </button>
          
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.25"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF66C4]"
            />
            <span className="text-white text-sm font-medium min-w-[3rem]">
              {Math.round(zoom * 100)}%
            </span>
          </div>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl"
          >
            +
          </button>
        </div>

        {/* Image Title */}
        {title && (
          <p className="mt-4 text-center text-white text-lg font-serif">{title}</p>
        )}
      </div>
    </div>
  );
}
