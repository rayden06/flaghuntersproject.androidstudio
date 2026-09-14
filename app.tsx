import React, { useState } from 'react';
import { Header } from './components/Header';
import { Ticker } from './components/Ticker';
import { CyberHotkeysBar } from './components/CyberHotkeysBar';
import { MetricCards } from './components/MetricCards';
import { ScannerEngine } from './components/ScannerEngine';
import { TriageDashboard } from './components/TriageDashboard';
import { TeamDossier } from './components/TeamDossier';
import { PresentationModal } from './components/PresentationModal';
import { VideoModal } from './components/VideoModal';
import { AuditPromptModal } from './components/AuditPromptModal';
import { AddImageModal } from './components/AddImageModal';
import { WelcomeSlide } from './components/WelcomeSlide';
import { Footer } from './components/Footer';
import { TARGET_IMAGES, TargetImage } from './data/scannerData';
import { exportCycloneDxSbom } from './utils/exportSbom';
import { CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { cyberAudio } from './utils/cyberSound';

export function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [images, setImages] = useState<TargetImage[]>(TARGET_IMAGES);
  const [selectedImage, setSelectedImage] = useState<TargetImage>(TARGET_IMAGES[0]);
  const [deckOpen, setDeckOpen] = useState<boolean>(false);
  const [videoOpen, setVideoOpen] = useState<boolean>(false);
  const [auditPromptOpen, setAuditPromptOpen] = useState<boolean>(false);
  const [addImageOpen, setAddImageOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active tab state for Triage Dashboard and keyboard hotkeys
  const [activeTab, setActiveTab] = useState<'cve' | 'secrets' | 'misconfig' | 'sbom'>('cve');
  const [triggerScanSignal, setTriggerScanSignal] = useState<number>(0);

  const showToast = (msg: string) => {
    cyberAudio.playConfirm();
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3800);
  };

  const handleExportSbom = () => {
    exportCycloneDxSbom();
    showToast("Downloaded flaghunters-sbom.cyclonedx.json (CycloneDX 1.5 format)");
  };

  const handleTriggerScan = () => {
    setTriggerScanSignal(prev => prev + 1);
    showToast("Triggered deep OCI inspection scan via hotkey [S]");
  };

  const handleAddImage = (newImage: TargetImage, scanImmediately: boolean) => {
    setImages(prev => [newImage, ...prev]);
    setSelectedImage(newImage);

    if (scanImmediately) {
      setTimeout(() => {
        setTriggerScanSignal(prev => prev + 1);
      }, 150);
      showToast(`Added target "${newImage.tag}" and initiated deep layer scan!`);
    } else {
      showToast(`Added target "${newImage.tag}" to OCI inventory`);
    }
  };

  const scrollToDossier = () => {
    const el = document.getElementById('dossier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#02050c] text-slate-200 selection:bg-cyan-500 selection:text-black flex flex-col font-sans relative overflow-x-hidden">
      {/* Welcome Holographic Splash Slide - Pops up before display */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeSlide onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Cyberpunk Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-cyan-400 bg-[#050e1c]/95 px-4 py-3 text-xs font-mono font-bold text-cyan-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-md animate-fade-up"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_6px_#00ff9d] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Cyber Header */}
      <Header
        onDeck={() => setDeckOpen(true)}
        onVideo={() => setVideoOpen(true)}
        onDossier={scrollToDossier}
        onExport={handleExportSbom}
        onAuditPrompt={() => setAuditPromptOpen(true)}
        onReplayIntro={() => setShowWelcome(true)}
      />

      {/* Live Cyber Ticker */}
      <Ticker />

      {/* Working Physical Keys HUD */}
      <CyberHotkeysBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onTriggerScan={handleTriggerScan}
        onOpenDeck={() => setDeckOpen(true)}
        onOpenVideo={() => setVideoOpen(true)}
        onExportSbom={handleExportSbom}
        onOpenPrompt={() => setAuditPromptOpen(true)}
        onReplayIntro={() => setShowWelcome(true)}
        onOpenAddImage={() => setAddImageOpen(true)}
      />

      {/* Main Dashboard Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 space-y-6">
        {/* KPI Metrics */}
        <MetricCards />

        {/* OCI Inspection Engine */}
        <ScannerEngine
          selectedImage={selectedImage}
          images={images}
          triggerScanSignal={triggerScanSignal}
          onOpenAddModal={() => setAddImageOpen(true)}
          onSelectImage={(img) => {
            setSelectedImage(img);
            showToast(`Switched active scan target to ${img.tag}`);
          }}
          onScanComplete={() => {
            showToast("Deep inspection complete: 0 unhandled vulnerabilities remaining");
          }}
        />

        {/* Triage Dashboard: CVEs, Secrets, Misconfigurations, SBOM */}
        <TriageDashboard
          currentTab={activeTab}
          onTabChange={setActiveTab}
          onExport={handleExportSbom}
          onToast={showToast}
        />

        {/* Team Dossier */}
        <TeamDossier />
      </main>

      {/* Add Container Image & Scan Modal */}
      <AddImageModal
        open={addImageOpen}
        onClose={() => setAddImageOpen(false)}
        onAddImage={handleAddImage}
      />

      {/* Presentation Deck Modal */}
      <PresentationModal
        open={deckOpen}
        onClose={() => setDeckOpen(false)}
      />

      {/* Video Demonstration Modal */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      {/* Audit Prompt / Problem Statement Modal */}
      <AuditPromptModal
        open={auditPromptOpen}
        onClose={() => setAuditPromptOpen(false)}
      />

      {/* App Footer */}
      <Footer
        onDeck={() => setDeckOpen(true)}
        onVideo={() => setVideoOpen(true)}
        onDossier={scrollToDossier}
      />
    </div>
  );
}

export default App;
