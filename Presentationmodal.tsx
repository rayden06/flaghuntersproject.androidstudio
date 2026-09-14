import React, { useState, useEffect } from 'react';
import { BaseModal } from './BaseModal';
import { PRESENTATION_SLIDES } from '../data/scannerData';
import { Presentation, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface PresentationModalProps {
  open: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ open, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = PRESENTATION_SLIDES.length;

  useEffect(() => {
    if (!open) {
      setCurrentSlide(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, totalSlides]);

  const slide = PRESENTATION_SLIDES[currentSlide];

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="PRESENTATION DECK // OCI SHIELD"
      subtitle={`Slide ${currentSlide + 1} of ${totalSlides} — Container Scanning Methodology`}
      icon={<Presentation className="h-5 w-5" />}
      footer={
        <div className="flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {PRESENTATION_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
              disabled={currentSlide === totalSlides - 1}
              className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40 cursor-pointer"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      }
    >
      <div key={currentSlide} className="animate-fade-up">
        <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 grid-noise opacity-30" />

          <span className="font-mono text-xs font-bold tracking-widest text-primary">
            {slide.kicker}
          </span>
          <h3 className="mt-2 text-xl font-bold leading-tight text-foreground sm:text-2xl">
            {slide.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {slide.body}
          </p>

          <ul className="mt-6 space-y-2.5">
            {slide.points.map((point, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-sm text-foreground/90">
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground font-mono">
            <span className="h-px flex-1 bg-border" />
            <span>FLAGHUNTERS // CONTAINER SECURITY &amp; VULNERABILITY SCANNER</span>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
