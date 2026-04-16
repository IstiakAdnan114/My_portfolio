import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, 
  ChevronRight, Maximize2, Minimize2 
} from 'lucide-react';

interface Image {
  src: string;
  caption: string;
}

interface Props {
  images: Image[];
  initialIndex: number;
  onClose: () => void;
}

const AdvancedLightbox: React.FC<Props> = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const resetTransform = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetTransform();
  }, [index, resetTransform]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsGrabbing(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isGrabbing) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/95 flex flex-col select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsGrabbing(false)}
      onMouseLeave={() => setIsGrabbing(false)}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="text-gray-400 text-sm">
          {index + 1} / {images.length}
        </div>
        <div className="flex-1 text-center px-4 font-medium text-white truncate">
          {images[index].caption}
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-center gap-2 p-2 bg-black/30 backdrop-blur-sm border-b border-white/5 overflow-x-auto">
        <button onClick={() => handleZoom(-0.25)} className="p-2 hover:bg-white/10 rounded-lg text-gray-300"><ZoomOut size={20} /></button>
        <button onClick={resetTransform} className="px-3 py-1 hover:bg-white/10 rounded-lg text-gray-300 text-xs font-bold">1:1</button>
        <button onClick={() => handleZoom(0.25)} className="p-2 hover:bg-white/10 rounded-lg text-gray-300"><ZoomIn size={20} /></button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button onClick={handleRotate} className="p-2 hover:bg-white/10 rounded-lg text-gray-300"><RotateCw size={20} /></button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-lg text-gray-300"><ChevronLeft size={20} /></button>
        <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-lg text-gray-300"><ChevronRight size={20} /></button>
      </div>

      {/* Image View */}
      <div 
        className={`flex-1 relative flex items-center justify-center overflow-hidden h-full ${isGrabbing ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : 'cursor-default'}`}
        onMouseDown={handleMouseDown}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: zoom,
              rotate: rotation,
              x: pan.x,
              y: pan.y
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
            className="flex items-center justify-center h-full w-full"
          >
            <img 
              src={images[index].src} 
              alt={images[index].caption}
              className="max-w-[70%] max-h-[70%] object-contain pointer-events-none shadow-2xl"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Nav Buttons */}
        <button 
          onClick={handlePrev} 
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-indigo-600/50 rounded-full text-white backdrop-blur-md transition-all hover:scale-110"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={handleNext} 
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-indigo-600/50 rounded-full text-white backdrop-blur-md transition-all hover:scale-110"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2 p-4 bg-black/50 border-t border-white/10 overflow-x-auto scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === index ? 'border-indigo-500 scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
          >
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedLightbox;
