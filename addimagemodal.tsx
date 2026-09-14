import React, { useState } from 'react';
import { TargetImage } from '../data/scannerData';
import { cyberAudio } from '../utils/cyberSound';
import {
  PlusCircle,
  X,
  Play,
  Layers,
  HardDrive,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Terminal,
  Zap,
  Box
} from 'lucide-react';

interface AddImageModalProps {
  open: boolean;
  onClose: () => void;
  onAddImage: (newImage: TargetImage, scanImmediately: boolean) => void;
}

interface QuickPreset {
  name: string;
  tag: string;
  base: string;
  distro: string;
  layers: number;
  sizeMb: number;
  criticalLabel: string;
  clean?: boolean;
}

const QUICK_PRESETS: QuickPreset[] = [
  {
    name: 'Nginx Web Proxy',
    tag: 'docker.io/library/nginx:1.25.4-alpine',
    base: 'nginx:1.25-alpine',
    distro: 'Alpine Linux 3.19',
    layers: 5,
    sizeMb: 42,
    criticalLabel: 'CLEAN // 0 CRIT',
    clean: true,
  },
  {
    name: 'Node.js Microservice',
    tag: 'ghcr.io/org/payments-api:v2.1.0',
    base: 'node:20.11-bookworm-slim',
    distro: 'Debian 12 (bookworm)',
    layers: 9,
    sizeMb: 198,
    criticalLabel: '3 CRITICAL',
    clean: false,
  },
  {
    name: 'Python FastAPI App',
    tag: 'quay.io/mlops/inference-gateway:v1.4',
    base: 'python:3.11-slim',
    distro: 'Debian 12 (bookworm)',
    layers: 12,
    sizeMb: 345,
    criticalLabel: '2 CRITICAL',
    clean: false,
  },
  {
    name: 'Go Kubernetes Operator',
    tag: 'registry.k8s.io/custom-controller:v0.8.2',
    base: 'golang:1.22-alpine',
    distro: 'Alpine Linux 3.19',
    layers: 4,
    sizeMb: 68,
    criticalLabel: 'CLEAN // 0 CRIT',
    clean: true,
  },
  {
    name: 'Redis Cache Cluster',
    tag: 'docker.io/library/redis:7.2.4-alpine',
    base: 'redis:7.2-alpine',
    distro: 'Alpine Linux 3.19',
    layers: 6,
    sizeMb: 52,
    criticalLabel: 'CLEAN // 0 CRIT',
    clean: true,
  },
  {
    name: 'Legacy Ubuntu Monolith',
    tag: 'docker.io/legacy/crm-core:v3.9-unpatched',
    base: 'ubuntu:20.04',
    distro: 'Ubuntu 20.04 LTS (focal)',
    layers: 16,
    sizeMb: 680,
    criticalLabel: '6 CRITICAL',
    clean: false,
  }
];

export const AddImageModal: React.FC<AddImageModalProps> = ({
  open,
  onClose,
  onAddImage,
}) => {
  const [tag, setTag] = useState<string>('docker.io/my-team/auth-service:v2.3');
  const [base, setBase] = useState<string>('node:18-alpine');
  const [distro, setDistro] = useState<string>('Alpine Linux 3.19');
  const [layers, setLayers] = useState<number>(8);
  const [sizeMb, setSizeMb] = useState<number>(185);
  const [vulnerabilityProfile, setVulnerabilityProfile] = useState<'vulnerable' | 'clean' | 'leaks'>('vulnerable');

  if (!open) return null;

  const handleApplyPreset = (preset: QuickPreset) => {
    cyberAudio.playSwitch();
    setTag(preset.tag);
    setBase(preset.base);
    setDistro(preset.distro);
    setLayers(preset.layers);
    setSizeMb(preset.sizeMb);
    setVulnerabilityProfile(preset.clean ? 'clean' : 'vulnerable');
  };

  const handleSubmit = (scanImmediately: boolean) => {
    cyberAudio.playConfirm();

    let criticalLabel = '2 CRITICAL';
    let clean = false;

    if (vulnerabilityProfile === 'clean') {
      criticalLabel = 'CLEAN // 0 CRIT';
      clean = true;
    } else if (vulnerabilityProfile === 'leaks') {
      criticalLabel = 'SECRETS DETECTED';
      clean = false;
    } else {
      criticalLabel = layers > 10 ? '4 CRITICAL' : '2 CRITICAL';
      clean = false;
    }

    const newImage: TargetImage = {
      id: `custom-${Date.now()}`,
      tag: tag.trim() || 'custom-image:latest',
      base: base.trim() || 'alpine:3.19',
      distro: distro.trim() || 'Alpine Linux 3.19',
      layers,
      sizeMb,
      criticalLabel,
      clean,
    };

    onAddImage(newImage, scanImmediately);
    onClose();
  };

  return (
    <div
      id="add-image-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fade-up"
        onClick={onClose}
      />

      {/* Cyberpunk Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-image-title"
        className="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-cyan-500/40 bg-[#040a17] shadow-[0_0_50px_rgba(0,240,255,0.25)] animate-fade-up"
      >
        {/* Cyber Corner Accents */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 bg-[#02050e] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/50 bg-cyan-950/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <PlusCircle className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_#00f0ff]" />
            </div>
            <div>
              <h3 id="add-image-title" className="text-base font-mono font-bold text-white flex items-center gap-2">
                ADD CONTAINER IMAGE &amp; SCAN
                <span className="text-[10px] rounded bg-cyan-500/20 px-1.5 py-0.5 text-cyan-300 font-mono">
                  OCI-REGISTRY
                </span>
              </h3>
              <p className="text-xs font-mono text-cyan-200/70">
                Register custom Docker / OCI image for deep forensic layer analysis
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playKey();
              onClose();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 font-mono text-xs">
          {/* Quick Presets Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                1-CLICK IMAGE PRESETS
              </span>
              <span className="text-[10px] text-slate-500">CLICK TO POPULATE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {QUICK_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`rounded-lg border p-2 text-left transition-all text-[11px] ${
                    tag === preset.tag
                      ? 'border-cyan-400 bg-cyan-950/50 shadow-[0_0_12px_rgba(0,240,255,0.2)] text-white'
                      : 'border-cyan-500/20 bg-[#030914] text-slate-300 hover:border-cyan-400/40 hover:bg-[#071324]'
                  }`}
                >
                  <p className="font-bold truncate text-cyan-300">{preset.name}</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{preset.tag}</p>
                  <div className="mt-1 flex items-center justify-between text-[9px]">
                    <span className="text-slate-400">{preset.layers} layers</span>
                    <span className={preset.clean ? 'text-emerald-400 font-bold' : 'text-pink-400 font-bold'}>
                      {preset.sizeMb}MB
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5 border-t border-cyan-500/15 pt-4">
            {/* Image Tag Field */}
            <div>
              <label htmlFor="input-image-tag" className="block text-[11px] font-bold text-slate-300 mb-1">
                CONTAINER IMAGE REFERENCE / TAG <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <Box className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-cyan-400" />
                <input
                  id="input-image-tag"
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. docker.io/library/nginx:1.25-alpine or myorg/app:v1"
                  className="w-full rounded-lg border border-cyan-500/30 bg-[#02050f] py-2 pl-9 pr-3 font-mono text-xs text-white placeholder:text-slate-600 outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                />
              </div>
            </div>

            {/* Base Image & Distro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="input-base-image" className="block text-[11px] font-bold text-slate-300 mb-1">
                  BASE IMAGE
                </label>
                <input
                  id="input-base-image"
                  type="text"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  placeholder="e.g. node:18-alpine, python:3.11"
                  className="w-full rounded-lg border border-cyan-500/30 bg-[#02050f] py-2 px-3 font-mono text-xs text-slate-200 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="input-base-distro" className="block text-[11px] font-bold text-slate-300 mb-1">
                  UNDERLYING OS / DISTRO
                </label>
                <select
                  id="input-base-distro"
                  value={distro}
                  onChange={(e) => setDistro(e.target.value)}
                  className="w-full rounded-lg border border-cyan-500/30 bg-[#02050f] py-2 px-3 font-mono text-xs text-slate-200 outline-none focus:border-cyan-400"
                >
                  <option value="Alpine Linux 3.19">Alpine Linux 3.19 (Minimal)</option>
                  <option value="Debian 12 (bookworm)">Debian 12 (bookworm)</option>
                  <option value="Debian 11 (bullseye)">Debian 11 (bullseye)</option>
                  <option value="Ubuntu 22.04 LTS (jammy)">Ubuntu 22.04 LTS (jammy)</option>
                  <option value="Red Hat UBI 9">Red Hat UBI 9 (Universal Base Image)</option>
                  <option value="Google Distroless">Google Distroless (Static)</option>
                </select>
              </div>
            </div>

            {/* Sliders: Layers & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-cyan-500/20 bg-[#02050e] p-3.5">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-slate-300 font-bold flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    OCI LAYERS
                  </span>
                  <span className="text-cyan-400 font-bold">{layers} Layers</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={24}
                  value={layers}
                  onChange={(e) => setLayers(Number(e.target.value))}
                  className="w-full h-1.5 cursor-pointer accent-cyan-400 bg-slate-800 rounded"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-slate-300 font-bold flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                    APPROX SIZE
                  </span>
                  <span className="text-emerald-400 font-bold">{sizeMb} MB</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={900}
                  step={5}
                  value={sizeMb}
                  onChange={(e) => setSizeMb(Number(e.target.value))}
                  className="w-full h-1.5 cursor-pointer accent-emerald-400 bg-slate-800 rounded"
                />
              </div>
            </div>

            {/* Vulnerability Profile */}
            <div>
              <span className="block text-[11px] font-bold text-slate-300 mb-2">
                SECURITY &amp; COMPLIANCE POSTURE FOR AUDIT
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playKey();
                    setVulnerabilityProfile('vulnerable');
                  }}
                  className={`rounded-lg border p-2.5 text-left transition-all ${
                    vulnerabilityProfile === 'vulnerable'
                      ? 'border-pink-500 bg-pink-950/30 text-pink-300 shadow-[0_0_12px_rgba(255,0,85,0.25)]'
                      : 'border-cyan-500/20 bg-[#02050f] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-[11px] text-pink-400">Vulnerable Target</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Critical CVEs in rootfs packages</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playKey();
                    setVulnerabilityProfile('leaks');
                  }}
                  className={`rounded-lg border p-2.5 text-left transition-all ${
                    vulnerabilityProfile === 'leaks'
                      ? 'border-amber-500 bg-amber-950/30 text-amber-300 shadow-[0_0_12px_rgba(255,230,0,0.25)]'
                      : 'border-cyan-500/20 bg-[#02050f] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-[11px] text-amber-400">Secret Leak Target</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Embedded API token &amp; keys</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playKey();
                    setVulnerabilityProfile('clean');
                  }}
                  className={`rounded-lg border p-2.5 text-left transition-all ${
                    vulnerabilityProfile === 'clean'
                      ? 'border-emerald-400 bg-emerald-950/30 text-emerald-300 shadow-[0_0_12px_rgba(0,255,157,0.25)]'
                      : 'border-cyan-500/20 bg-[#02050f] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-bold text-[11px] text-emerald-400">Hardened Target</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Minimal footprint, 0 CVEs</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-cyan-500/25 bg-[#02050e] px-5 py-3.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACTION READY FOR DAEMON DISPATCH</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playKey();
                onClose();
              }}
              className="flex-1 sm:flex-none rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="flex-1 sm:flex-none rounded-lg border border-cyan-500/40 bg-cyan-950/50 px-4 py-2 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all"
            >
              Add Only
            </button>

            <button
              type="button"
              id="btn-confirm-add-and-scan"
              onClick={() => handleSubmit(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 px-5 py-2 text-xs font-mono font-black text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:shadow-[0_0_30px_#00f0ff] hover:scale-102 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              ADD &amp; SCAN IMAGE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
