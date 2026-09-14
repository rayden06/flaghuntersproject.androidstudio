import React, { useState, useRef, useEffect } from 'react';
import { BaseModal } from './BaseModal';
import { DEMO_CHAPTERS } from '../data/scannerData';
import { PlayCircle, Play, Pause, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ open, onClose }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [activeLineCount, setActiveLineCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const totalChapters = DEMO_CHAPTERS.length;
  const currentChapter = DEMO_CHAPTERS[activeChapterIndex];

  useEffect(() => {
    if (!open) {
      setActiveChapterIndex(0);
      setActiveLineCount(0);
      setIsPlaying(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isPlaying) return;

    if (activeLineCount < currentChapter.lines.length) {
      const timer = setTimeout(() => {
        setActiveLineCount(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }

    // Move to next chapter after pause
    const chapterTimer = setTimeout(() => {
      if (activeChapterIndex < totalChapters - 1) {
        setActiveChapterIndex(prev => prev + 1);
        setActiveLineCount(0);
      } else {
        setIsPlaying(false);
      }
    }, 1200);

    return () => clearTimeout(chapterTimer);
  }, [open, isPlaying, activeChapterIndex, activeLineCount, currentChapter.lines.length, totalChapters]);

  useEffect(() => {
    terminalScrollRef.current?.scrollTo({
      top: terminalScrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [activeLineCount, activeChapterIndex]);

  const progressPercent =
    ((activeChapterIndex + activeLineCount / currentChapter.lines.length) / totalChapters) * 100;

  const isFinished = !isPlaying && activeChapterIndex === totalChapters - 1 && activeLineCount >= currentChapter.lines.length;

  const handleRestart = () => {
    setActiveChapterIndex(0);
    setActiveLineCount(0);
    setIsPlaying(true);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="FLAGHUNTERS ARCHITECTURE DEMO VIDEO"
      subtitle="Duration 3m 48s // Container Security & OCI Inspection Walkthrough"
      icon={<PlayCircle className="h-5 w-5" />}
      footer={
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] tracking-widest text-muted-foreground font-mono">
            CHAPTERS:
          </span>
          {DEMO_CHAPTERS.map((chap, idx) => (
            <button
              key={chap.title}
              onClick={() => {
                setActiveChapterIndex(idx);
                setActiveLineCount(0);
                setIsPlaying(true);
              }}
              className={`rounded px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer ${
                idx === activeChapterIndex
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'bg-background/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {chap.title}
            </button>
          ))}
        </div>
      }
    >
      <div className="overflow-hidden rounded-md border border-border bg-[#0d0707]">
        {/* Top Status */}
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="flex items-center gap-2 text-[11px] tracking-wide text-foreground">
            <span className="h-2 w-2 rounded-full bg-crit animate-glow-pulse" />
            LIVE WORKFLOW SIMULATION
          </span>
          <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary font-mono">
            {currentChapter.title}
          </span>
        </div>

        {/* Terminal Screen */}
        <div
          ref={terminalScrollRef}
          className="relative h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
        >
          <div className="pointer-events-none absolute inset-0 grid-noise opacity-40" />

          <p className="text-muted-foreground">
            <span className="text-clean">$</span> flaghunters-daemon // pipeline-audit{" "}
            <span className="float-right text-muted-foreground/70">STATUS: 0 ERR</span>
          </p>

          {currentChapter.lines.slice(0, activeLineCount).map((line, idx) => {
            const isCmd = line.startsWith('$');
            const isCrit = line.startsWith('[!]');
            const isWarn = line.startsWith('[*]');
            return (
              <p
                key={`${activeChapterIndex}-${idx}`}
                className={`mt-1.5 animate-fade-up ${
                  isCmd
                    ? 'text-foreground font-semibold'
                    : isCrit
                    ? 'text-crit font-bold'
                    : isWarn
                    ? 'text-medium font-medium'
                    : 'text-clean/90'
                }`}
              >
                {line}
              </p>
            );
          })}

          {isPlaying && (
            <span className="mt-1 inline-block h-3.5 w-2 animate-blink bg-primary align-middle" />
          )}
        </div>

        {/* Video Scrubber & Controls */}
        <div className="flex items-center gap-3 border-t border-border px-3 py-2.5 bg-background/50">
          <button
            onClick={() => {
              if (isFinished) {
                handleRestart();
              } else {
                setIsPlaying(prev => !prev);
              }
            }}
            className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground transition-transform hover:scale-105 cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isFinished ? (
              <RotateCcw className="h-4 w-4" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
          </button>

          <button
            onClick={handleRestart}
            className="text-muted-foreground transition-colors hover:text-primary cursor-pointer"
            aria-label="Restart"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Scrubber Bar */}
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-background">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="font-mono text-[10px] text-muted-foreground">
            {isFinished ? '3:48 / 3:48' : `CH ${activeChapterIndex + 1}/${totalChapters}`}
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Demo walkthrough provided by{" "}
        <span className="font-semibold text-foreground">FlagHunters Research Laboratory</span>
      </p>
    </BaseModal>
  );
};
