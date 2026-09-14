import React from 'react';
import { Shield, Terminal } from 'lucide-react';
import { cyberAudio } from '../utils/cyberSound';

interface FooterProps {
  onDeck: () => void;
  onVideo: () => void;
  onDossier: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDeck, onVideo, onDossier }) => {
  return (
    <footer id="app-footer" className="mt-12 border-t border-cyan-500/20 bg-[#02050c]/90 px-4 py-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Shield className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_#00f0ff]" />
          </div>
          <div>
            <p className="text-xs font-mono font-black tracking-wider text-white">
              FLAGHUNTERS OCI SHIELD <span className="text-cyan-400">// v2.4-CYBER</span>
            </p>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
              Container Forensics &bull; Lead Architect &amp; Captain:{" "}
              <strong className="text-emerald-400 font-bold tracking-wider drop-shadow-[0_0_8px_rgba(0,255,157,0.4)]">
                VARNIK CHOUDHARY
              </strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
          <button
            onClick={() => {
              cyberAudio.playKey();
              onDeck();
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            // PRESENTATION [D]
          </button>
          <button
            onClick={() => {
              cyberAudio.playKey();
              onVideo();
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            // DEMO-VIDEO [V]
          </button>
          <button
            onClick={() => {
              cyberAudio.playKey();
              onDossier();
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            // TEAM-DOSSIER [T]
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-6 pt-4 border-t border-cyan-500/15 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500">
        <span>
          &copy; {new Date().getFullYear()} Team FlagHunters. Built for container-native DevSecOps pipelines.
        </span>
        <span className="mt-2 sm:mt-0 text-[10px] text-cyan-400/70">
          SPDX 2.3 &bull; CycloneDX 1.5 &bull; CIS Docker Benchmark 1.6
        </span>
      </div>
    </footer>
  );
};
