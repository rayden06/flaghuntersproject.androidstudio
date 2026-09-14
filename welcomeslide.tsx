import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Shield, Terminal, Zap, Cpu, Sparkles, Play, Pause, ArrowRight, ShieldCheck, Bug, KeyRound } from "lucide-react";
import { cyberAudio } from "../utils/cyberSound";

interface WelcomeSlideProps {
  onComplete: () => void;
}

export const WelcomeSlide: React.FC<WelcomeSlideProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  useEffect(() => {
    // Play cyber boot sequence sound on popup
    cyberAudio.playScan();

    const duration = 3500; // 3.5s comfortable reading time
    let elapsed = 0;
    const stepMs = 30;

    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        elapsed += stepMs;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setProgress(pct);

        if (elapsed >= duration) {
          clearInterval(interval);
          cyberAudio.playConfirm();
          onComplete();
        }
      }
    }, stepMs);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter" || e.code === "Escape") {
        e.preventDefault();
        clearInterval(interval);
        cyberAudio.playConfirm();
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleManualEnter = () => {
    cyberAudio.playConfirm();
    onComplete();
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playKey();
    setIsPaused((prev) => !prev);
  };

  return (
    <motion.div
      id="welcome-slide-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02050e] select-none overflow-y-auto p-4"
    >
      {/* Background Cyber Grid & Glowing Radial Beams */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-cyan-500/20 via-emerald-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 cyber-scanlines pointer-events-none opacity-60" />

      {/* Animated Matrix Laser Scan Lines */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f0ff]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#00ff9d]"
        animate={{ top: ["100%", "0%", "100%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Central Holographic Cyber Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative z-10 max-w-2xl w-full mx-auto p-6 sm:p-8 rounded-2xl bg-[#040c1a]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_70px_rgba(0,240,255,0.25)] flex flex-col items-center text-center my-auto"
      >
        {/* Cyber Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Top Cyber HUD Bar */}
        <div className="w-full flex items-center justify-between border-b border-cyan-500/20 pb-3 text-[10px] font-mono tracking-widest">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>SYSTEM BOOT // OCI FORENSIC RADAR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              CYBER DEFENSE READY
            </span>
          </div>
        </div>

        {/* Holographic Shield Icon with Orbiting Rings */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-dashed border-cyan-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          {/* Counter-rotating ring */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border border-emerald-400/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          {/* Glowing Shield Icon */}
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 border border-cyan-400/70 flex items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.6)]">
            <Shield className="w-9 h-9 text-cyan-300 drop-shadow-[0_0_12px_#00f0ff]" />
          </div>
        </div>

        {/* Project Title and Sub-header */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-1 mt-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>OCI CONTAINER VULNERABILITY RADAR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mt-2 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 neon-text-cyan">
              FLAG HUNTERS
            </span>{" "}
            <span className="text-white">// PROJECT</span>
          </h1>

          <p className="text-xs sm:text-sm text-cyan-200/80 font-mono tracking-wide max-w-lg mx-auto">
            CONTAINER FORENSICS, DEEP LAYER INSPECTION &amp; RUNTIME DEFENSE PLATFORM
          </p>
        </motion.div>

        {/* Lead Creator / Architect in CAPITAL */}
        <div className="mt-4 py-2 px-4 rounded-xl bg-[#02050f] border border-emerald-500/40 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,157,0.15)]">
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 tracking-wider">
            LEAD ARCHITECT &amp; CAPTAIN: <strong className="text-white font-extrabold tracking-widest drop-shadow-[0_0_6px_rgba(0,255,157,0.6)]">VARNIK CHOUDHARY</strong>
          </span>
          <span className="text-emerald-500/50">|</span>
          <span className="text-[11px] font-mono text-cyan-400 tracking-widest font-bold">
            TEAM FLAGHUNTERS
          </span>
        </div>

        {/* 3 Core Capability Briefing Cards */}
        <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left font-mono">
          <div className="rounded-lg border border-cyan-500/25 bg-[#030914] p-2.5 shadow-[0_0_10px_rgba(0,240,255,0.08)]">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Layer Forensics</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">
              Static layer-by-layer rootfs inspection &amp; Dockerfile auditor
            </p>
          </div>

          <div className="rounded-lg border border-cyan-500/25 bg-[#030914] p-2.5 shadow-[0_0_10px_rgba(0,240,255,0.08)]">
            <div className="flex items-center gap-1.5 text-pink-400 font-bold text-[11px]">
              <Bug className="w-3.5 h-3.5 text-pink-400" />
              <span>CVE &amp; Secrets</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">
              CVSS 3.1 severity triage and Shannon entropy token sniffer
            </p>
          </div>

          <div className="rounded-lg border border-cyan-500/25 bg-[#030914] p-2.5 shadow-[0_0_10px_rgba(0,240,255,0.08)]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>CycloneDX SBOM</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">
              Full Software Bill of Materials &amp; CIS Docker benchmark
            </p>
          </div>
        </div>

        {/* Progress HUD Bar */}
        <div className="w-full mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300/90">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              AUTO-INITIALIZING DISPLAY: <span className="text-emerald-300 font-bold">{progress}%</span>
              {isPaused && (
                <span className="text-amber-400 font-bold text-[10px] px-1 rounded bg-amber-950/60 border border-amber-500/40">
                  PAUSED
                </span>
              )}
            </span>
            <button
              onClick={togglePause}
              className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {isPaused ? "Resume Countdown" : "Pause Timer"}
            </button>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-900 border border-cyan-500/40 overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_12px_#00f0ff]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        {/* Prominent Action Button: ENTER DISPLAY NOW */}
        <div className="w-full mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <kbd className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-bold">
              SPACE / ENTER
            </kbd>
            <span>Auto-launching in {Math.max(0, Math.ceil((100 - progress) / 30))}s</span>
          </div>

          <button
            id="btn-enter-dashboard-slide"
            onClick={handleManualEnter}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 px-6 py-2.5 text-xs font-mono font-black tracking-wider text-black shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all hover:shadow-[0_0_35px_#00f0ff] hover:scale-102 cursor-pointer"
          >
            <span>ENTER OCI SHIELD DISPLAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
