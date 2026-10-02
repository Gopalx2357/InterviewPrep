import React from 'react';
import { X, Download, ExternalLink, ShieldCheck, FileText, Cloud } from 'lucide-react';

export const parseGoogleDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  // Match /file/d/FILE_ID
  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1 && match1[1]) {
    const id = match1[1];
    return {
      id,
      previewUrl: `https://drive.google.com/file/d/${id}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
      viewUrl: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
    };
  }
  // Match ?id=FILE_ID or &id=FILE_ID
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2 && match2[1]) {
    const id = match2[1];
    return {
      id,
      previewUrl: `https://drive.google.com/file/d/${id}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
      viewUrl: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
    };
  }
  return null;
};

const PdfViewerModal = ({ isOpen, onClose, pdfUrl, title }) => {
  if (!isOpen || !pdfUrl) return null;

  const driveInfo = parseGoogleDriveUrl(pdfUrl);
  const isGoogleDrive = !!driveInfo;

  const previewUrl = isGoogleDrive
    ? driveInfo.previewUrl
    : (pdfUrl.startsWith('http') ? pdfUrl : `http://localhost:5001${pdfUrl}`);

  const downloadUrl = isGoogleDrive
    ? driveInfo.downloadUrl
    : (pdfUrl.startsWith('http') ? pdfUrl : `http://localhost:5001${pdfUrl}`);

  const externalViewUrl = isGoogleDrive
    ? driveInfo.viewUrl
    : (pdfUrl.startsWith('http') ? pdfUrl : `http://localhost:5001${pdfUrl}`);

  const handleDownload = () => {
    if (isGoogleDrive) {
      window.open(downloadUrl, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = `${(title || 'InterviewPrep_Notes').replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 max-w-5xl w-full h-[90vh] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative">
        {/* Header Bar */}
        <div className="bg-slate-800/90 border-b border-slate-700 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">
                {title || 'Placement Interview Notes'}
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Unlocked & Access Verified
                </span>
                {isGoogleDrive && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold flex items-center gap-1">
                    <Cloud className="w-2.5 h-2.5" /> Google Drive
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <a
              href={externalViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embedded Frame */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          <iframe
            src={previewUrl}
            title={title || 'PDF Preview'}
            className="w-full h-full border-none"
            allow="autoplay"
            onError={() => {
              window.open(externalViewUrl, '_blank');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;
