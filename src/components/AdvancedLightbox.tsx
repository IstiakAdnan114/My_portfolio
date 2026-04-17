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
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

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

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoom(0.1);
    } else {
      handleZoom(-0.1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistance !== null) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (distance - touchDistance) / 80;
      handleZoom(delta);
      setTouchDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    setTouchDistance(null);
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
      className="fixed inset-0 z-[1000] bg-black/95 flex flex-col select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsGrabbing(false)}
      onMouseLeave={() => setIsGrabbing(false)}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Simple Floating Close Button - Guaranteed Visibility Above All */}
      <button 
        onClick={onClose}
        className="fixed top-20 right-6 z-[1100] group flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full transition-all hover:scale-110 active:scale-95 border-2 border-white/40 glow-red"
        title="Close (Esc)"
      >
        <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="text-gray-400 text-sm">
          {index + 1} / {images.length}
        </div>
        <div className="flex-1 text-center px-4 font-medium text-white truncate max-w-md mx-auto">
          {images[index].caption}
        </div>
        {/* Secondary Close Button in Header for extra safety */}
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors block sm:hidden"
        >
          <X size={20} />
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
