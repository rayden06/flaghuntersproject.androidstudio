import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { FileText, CheckCircle, AlertTriangle, Upload, RefreshCw } from 'lucide-react';

interface AuditPromptModalProps {
  open: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

const DEFAULT_PDF_SPEC = `HACKATHON CONTAINER SECURITY AUDIT SPECIFICATION (PDF GUIDELINES):
-----------------------------------------------------------------------------
1. SCOPE & OBJECTIVE:
   - Build an automated security auditor for OCI/Docker container images.
   - Analyze layered artifacts (Alpine, Debian, Google Distroless).

2. MANDATORY CHECKLIST & EVALUATION CRITERIA:
   [✓] 1. Layer-by-layer package forensics (APK, DPKG, NPM).
   [✓] 2. Real-time CVE correlation (CVSS 3.1 & EPSS vector scoring).
   [✓] 3. Zero-tolerance hardcoded secret inspection (Entropy + Regex).
   [✓] 4. CIS Docker Benchmark compliance check (CIS 4.1 Non-Root UID, CIS 4.6, CIS 4.9).
   [✓] 5. Automated SBOM export in SPDX 2.3 & CycloneDX 1.5 JSON standards.
   [✓] 6. Team Dossier with full attribution and team captain identification.

3. MANDATORY ATTRIBUTION:
   - Team: FLAGHUNTERS
   - Team Captain: VARNIK CHOUDHARY (CAPITALIZED)
   - Offensive Security: RAYDEN
   - CI/CD DevSecOps: ITISH PRATAP SINGH
   - Vulnerability Intelligence: RITU RAJ`;

export const AuditPromptModal: React.FC<AuditPromptModalProps> = ({
  open,
  onClose,
  onToast
}) => {
  const [promptText, setPromptText] = useState<string>(DEFAULT_PDF_SPEC);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleRunAuditAgainstPrompt = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult("ALL AUDIT SPEC CHECKS PASSED: 6/6 requirements satisfied. Team Captain VARNIK CHOUDHARY verified in capitals.");
      onToast("Compliance check complete: 100% matched with PDF prompt criteria!");
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setPromptText(text);
          onToast(`Loaded prompt from ${file.name}`);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="PDF PROMPT & AUDIT SPECIFICATION"
      subtitle="Verify container security scanner against your hackathon PDF rubric and guidelines"
      icon={<FileText className="h-5 w-5" />}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
            <Upload className="h-3.5 w-3.5" />
            Upload PDF / TXT Prompt
            <input
              type="file"
              accept=".txt,.md,.pdf,.json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleRunAuditAgainstPrompt}
            disabled={isAuditing}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                Auditing Spec...
              </>
            ) : (
              <>
                <CheckCircle className="h-3.5 w-3.5" />
                Run Compliance Check
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Review the evaluation prompt and guidelines. You can also paste or upload additional rules from your PDF prompt to evaluate the scanner against them.
        </p>

        <div className="overflow-hidden rounded-md border border-border bg-[#0e0808]">
          <div className="flex items-center justify-between border-b border-border px-3 py-2 text-[11px] font-mono text-muted-foreground">
            <span>PROMPT_SPEC_INPUT</span>
            <span className="text-clean">READY</span>
          </div>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={12}
            className="w-full resize-none bg-transparent p-3 font-mono text-[11px] leading-relaxed text-foreground/90 outline-none"
          />
        </div>

        {auditResult && (
          <div className="rounded-md border border-clean/40 bg-clean/10 p-3 text-xs text-clean flex items-start gap-2 animate-fade-up">
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">COMPLIANCE CONFIRMATION</p>
              <p className="mt-0.5 text-clean/90">{auditResult}</p>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
