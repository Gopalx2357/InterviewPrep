import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import {
  Lock,
  CheckCircle2,
  Calendar,
  BookOpen,
  CreditCard,
  Printer,
  ArrowRight,
  Sparkles,
  Download,
} from 'lucide-react';

export default function CertificateGenerator({ defaultName = "Gopal Yadav" }) {
  const { user, isAdmin, showToast } = useContext(AuthContext);
  const [candidateName, setCandidateName] = useState(
    user?.officialName || user?.name || defaultName
  );
  const [enrollmentId] = useState("IP-ENR-2026-403137");
  const [enrolledDate] = useState("September 20, 2026");
  const [programTitle, setProgramTitle] = useState("Software Development & Interview Preparation Program");
  const [programBadge, setProgramBadge] = useState("Interview Preparation");
  const [signatureColor, setSignatureColor] = useState('white'); // 'white' | 'gold'

  const [purchasedCompanies, setPurchasedCompanies] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);

  // Sync candidate name with logged in user
  useEffect(() => {
    if (user?.officialName || user?.name) {
      setCandidateName(user.officialName || user.name);
    }
  }, [user]);

  // Fetch purchases to verify Company OA ownership
  useEffect(() => {
    const checkCompanyPurchases = async () => {
      if (!user) {
        setPurchasedCompanies([]);
        setLoadingPurchases(false);
        return;
      }

      try {
        const res = await API.get('/payments/my-purchases');
        const companies = (res.data || [])
          .filter((p) => (p.itemType === 'company' && p.companyId) || p.itemType === 'all-access')
          .map((p) =>
            p.itemType === 'all-access'
              ? { _id: 'all-access', name: 'VIP All-Access Pass' }
              : (typeof p.companyId === 'object' ? p.companyId : { _id: p.companyId, name: 'Company OA' })
          );

        setPurchasedCompanies(companies);
      } catch (error) {
        console.warn('Could not fetch user purchases for certificate verification:', error);
      } finally {
        setLoadingPurchases(false);
      }
    };

    checkCompanyPurchases();
  }, [user]);

  // Sole Super Admin, user with All-Access, or users who purchased at least 1 company OA can download
  const hasPurchasedOA = Boolean(isAdmin || user?.hasAllAccess || (user && purchasedCompanies.length > 0));

  const handlePrintCertificate = () => {
    if (!hasPurchasedOA) {
      if (showToast) {
        showToast('🔒 Certificate Locked: Please purchase a Company OA kit or All-Access Pass (₹149) to unlock!', 'warning');
      } else {
        alert('🔒 Certificate Locked: Please purchase a Company OA kit or All-Access Pass (₹149) to unlock!');
      }
      return;
    }
    window.print();
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl text-white">
      {/* Control Bar on Top (Hidden during printing) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 border rounded-full text-xs font-semibold uppercase tracking-wider ${
                hasPurchasedOA
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}
            >
              {hasPurchasedOA ? '✅ Official Certificate Unlocked' : '🔒 Verified Enrollment Certificate'}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              ISO Certified • Tamper-Proof Verification
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-slate-100">Official Certificate of Enrollment</h2>
          <p className="text-slate-400 text-sm">
            Issued to candidate upon enrolling in the Software Development & Interview Preparation Program.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {hasPurchasedOA && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 font-medium">Candidate Name:</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter Candidate Name"
                  className="bg-slate-800 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400 font-semibold"
                />
              </div>

              {/* Digital Signature Ink Color Toggle */}
              <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold px-2">Signature:</span>
                <button
                  type="button"
                  onClick={() => setSignatureColor('white')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    signatureColor === 'white'
                      ? 'bg-slate-700 text-white shadow-sm border border-slate-600'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Silver White
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureColor('gold')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    signatureColor === 'gold'
                      ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Royal Gold
                </button>
              </div>
            </>
          )}

          {hasPurchasedOA ? (
            <button
              onClick={handlePrintCertificate}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 whitespace-nowrap hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Certificate</span>
            </button>
          ) : (
            <button
              onClick={handlePrintCertificate}
              className="px-4 py-2.5 bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-not-allowed"
              title="Purchase a company OA package to unlock"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Locked (Purchase OA to Download)</span>
            </button>
          )}
        </div>
      </div>

      {/* Locked Notice Banner (Only shown if user hasn't purchased an OA) */}
      {!hasPurchasedOA && !loadingPurchases && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
                <span>Certificate Download is Locked</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] uppercase font-bold">
                  Rule: Buy 1 OA Kit or All-Access Pass (₹149)
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {user
                  ? 'Certificate download karne ke liye aap koi bhi Company OA package ya ₹149 All-Access Pass purchase kar sakte hain.'
                  : 'Pehle Sign In karein aur Company OA package ya ₹149 All-Access Pass purchase karein apna official verified certificate claim karne ke liye.'}
              </p>
            </div>
          </div>

          <Link
            to={user ? '/companies' : '/login'}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <span>{user ? 'Browse OA Kits / All-Access' : 'Sign In to Unlock'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* THE OFFICIAL CERTIFICATE CANVAS */}
      <div className="mt-6 flex justify-center overflow-x-auto p-2">
        <div
          id="certificate-print-area"
          className={`relative w-full max-w-[960px] aspect-[1.414/1] min-h-[620px] md:min-h-[670px] bg-[#0A0F1D] text-white p-3 sm:p-5 shadow-2xl rounded-2xl select-none overflow-hidden flex flex-col justify-between border border-[#B88E3E]/40 ${
            !hasPurchasedOA ? 'print:hidden' : ''
          }`}
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 30%, #111A30 0%, #080C17 75%, #050810 100%)`,
          }}
        >
          {/* Watermark Overlay for Unlocked Preview */}
          {!hasPurchasedOA && (
            <div className="absolute inset-0 bg-[#080C17]/85 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center text-center p-6 print:hidden">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/20">
                <Lock className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                LOCKED CREDENTIAL PREVIEW
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white max-w-md">
                Purchase any Company OA Kit or ₹149 All-Access Pass to Download Your Certificate
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-sm leading-relaxed">
                Includes tamper-proof Verification QR, Enrollment ID, and official InterviewPrep stamp.
              </p>
              <Link
                to={user ? '/companies' : '/login'}
                className="mt-5 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>{user ? 'Unlock via OA Kits / All-Access' : 'Sign In & Unlock'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. LUXURY GOLD CORNER FACETED RIBBONS (Top-Left & Bottom-Right) */}
          {/* ======================================================== */}
          
          {/* Top-Left Corner Geometric Gold Ribbons */}
          <div className="absolute top-0 left-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none z-10">
            <svg viewBox="0 0 144 144" className="w-full h-full">
              <polygon points="0,0 60,0 0,60" fill="#78531A" />
              <polygon points="0,35 95,0 120,0 0,120 0,95" fill="url(#goldRibbonGrad1)" />
              <polygon points="0,15 130,0 144,0 0,144 0,130" fill="url(#goldRibbonGrad2)" />
              <defs>
                <linearGradient id="goldRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E29D" />
                  <stop offset="50%" stopColor="#D8A33F" />
                  <stop offset="100%" stopColor="#9C6B1C" />
                </linearGradient>
                <linearGradient id="goldRibbonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C99738" />
                  <stop offset="50%" stopColor="#FFEAA7" />
                  <stop offset="100%" stopColor="#8A5A14" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bottom-Right Corner Geometric Gold Ribbons */}
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none z-10 rotate-180">
            <svg viewBox="0 0 144 144" className="w-full h-full">
              <polygon points="0,0 60,0 0,60" fill="#78531A" />
              <polygon points="0,35 95,0 120,0 0,120 0,95" fill="url(#goldRibbonGrad1)" />
              <polygon points="0,15 130,0 144,0 0,144 0,130" fill="url(#goldRibbonGrad2)" />
            </svg>
          </div>

          {/* ======================================================== */}
          {/* 2. ORNATE DOUBLE GOLD BORDER & CORNER ACCENTS */}
          {/* ======================================================== */}
          <div className="absolute inset-3 sm:inset-5 border-[2px] border-[#D4AF37]/85 rounded-xl pointer-events-none z-10 shadow-[0_0_15px_rgba(212,175,55,0.12)]">
            {/* Inner Border Line */}
            <div className="absolute inset-1 sm:inset-1.5 border border-[#F3E5AB]/40 rounded-lg"></div>

            {/* Corner Decorative Ornaments (4 Corners) */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#FFE58F]"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#FFE58F]"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#FFE58F]"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#FFE58F]"></div>
          </div>

          {/* ======================================================== */}
          {/* 3. CERTIFICATE BODY CONTENT */}
          {/* ======================================================== */}
          <div className="relative z-20 flex flex-col justify-between h-full w-full py-4 sm:py-5 px-6 sm:px-10 md:px-12">
            
            {/* Header: Brand Logo & Tagline */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2.5">
                {/* Official Circular Brand Logo */}
                <img
                  src="/logo.png?v=2"
                  alt="InterviewPrep Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 shadow-md ring-2 ring-[#E5B54F]/50"
                />

                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black tracking-tight flex items-baseline">
                    <span className="text-white font-sans font-extrabold">Interview</span>
                    <span className="text-[#E5B54F] font-sans font-extrabold ml-0.5">Prep</span>
                  </div>
                </div>
              </div>

              {/* Sub-tagline */}
              <div className="text-[8px] sm:text-[9.5px] tracking-[0.28em] font-semibold text-slate-300 uppercase mt-0.5">
                L E A R N &nbsp;•&nbsp; P R A C T I C E &nbsp;•&nbsp; G E T &nbsp; H I R E D
              </div>
            </div>

            {/* Title: CERTIFICATE OF ENROLLMENT */}
            <div className="text-center my-1.5 sm:my-2">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.06em] font-serif uppercase"
                style={{
                  background: 'linear-gradient(180deg, #FFF1C5 0%, #ECC368 40%, #B88928 85%, #E8C163 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(212, 175, 55, 0.25)',
                }}
              >
                CERTIFICATE OF ENROLLMENT
              </h1>

              {/* Centered Diamond Node */}
              <div className="flex items-center justify-center gap-2 mt-1 text-[#D4AF37]">
                <span className="text-xs">◆</span>
              </div>
            </div>

            {/* Recipient Section */}
            <div className="text-center my-1 sm:my-1.5">
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[#C5A880] uppercase">
                THIS CERTIFICATE IS PROUDLY PRESENTED TO
              </p>

              {/* Recipient Name in Regal Serif Italic */}
              <div className="my-1 sm:my-1.5">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-serif italic tracking-wide"
                  style={{
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF2CC 35%, #F5D061 75%, #D49B24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {candidateName || "Gopal Yadav"}
                </h2>

                {/* Delicate Gold Underline Bar */}
                <div className="w-48 sm:w-72 h-[1.5px] bg-gradient-to-r from-transparent via-[#E5B54F] to-transparent mx-auto mt-1 sm:mt-1.5"></div>
              </div>
            </div>

            {/* Citation & Program Statement */}
            <div className="text-center space-y-0.5 my-1 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-slate-300 font-sans italic">
                for successfully enrolling in the
              </p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">
                {programTitle}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-300 font-sans">
                Your journey towards a better future in tech starts here.
              </p>
              <p className="text-[10px] sm:text-xs text-[#F7DE98] font-medium font-sans">
                Keep learning, keep growing!
              </p>
            </div>

            {/* 4 Metadata Badges Bar */}
            <div className="my-1.5 sm:my-2 max-w-3xl mx-auto w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 py-2 px-3 sm:px-4 rounded-xl bg-white/[0.03] border border-white/5">
                {/* Column 1: Enrollment ID */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-3.5 h-3.5 text-[#F5C451]" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="block text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">
                      Enrollment ID
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-white font-mono whitespace-nowrap">
                      {enrollmentId}
                    </span>
                  </div>
                </div>

                {/* Column 2: Enrolled On */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#F5C451]" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="block text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">
                      Enrolled On
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-white whitespace-nowrap">
                      {enrolledDate}
                    </span>
                  </div>
                </div>

                {/* Column 3: Program */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-[#F5C451]" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="block text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">
                      Program
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-white whitespace-nowrap">
                      {programBadge}
                    </span>
                  </div>
                </div>

                {/* Column 4: Status */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="block text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 tracking-wider">
                      Status
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-[#22C55E] whitespace-nowrap">
                      Active Enrollment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section: QR Code | Official Seal | Authorized Signatory */}
            <div className="pt-2 sm:pt-3 border-t border-slate-800/80 flex items-end justify-between gap-4">
              
              {/* Left Column: QR Code & Verification Link */}
              <div className="flex items-center gap-2.5 text-left shrink-0 max-w-[280px] sm:max-w-[320px]">
                {/* Real Authentic High-Density Scannable QR Code */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white p-1 rounded-lg shadow-md shrink-0 flex items-center justify-center">
                  <img
                    src="/signatures/certificate_qr.svg"
                    alt="Official Verification QR"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <span className="block text-[10px] sm:text-xs font-bold text-white tracking-tight">
                    Verify Certificate
                  </span>
                  <span className="block text-[8.5px] sm:text-[10px] text-amber-200/90 font-mono whitespace-nowrap">
                    interviewprep.in/verify/{enrollmentId}
                  </span>
                  <span className="hidden sm:block text-[8px] text-slate-400 leading-tight mt-0.5 whitespace-nowrap">
                    Scan QR to authenticate official record
                  </span>
                </div>
              </div>

              {/* Center Column: Scalloped Gold Foil Starburst Seal */}
              <div className="flex justify-center items-center shrink-0">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
                    {/* 24-point Scalloped Rosette Starburst */}
                    <path
                      d="M50 0 L56 6 L64 3 L68 11 L77 10 L79 19 L88 20 L87 29 L95 32 L92 41 L99 46 L94 54 L99 61 L92 67 L95 75 L87 79 L88 88 L79 89 L77 98 L68 97 L64 105 L56 102 L50 108 L44 102 L36 105 L32 97 L23 98 L21 89 L12 88 L13 79 L5 75 L8 67 L1 61 L6 54 L1 46 L8 41 L5 32 L13 29 L12 20 L21 19 L23 10 L32 11 L36 3 L44 6 Z"
                      fill="url(#sealGoldGradient)"
                    />

                    {/* Outer Gold Ring */}
                    <circle cx="50" cy="54" r="38" fill="none" stroke="#FFEAA7" strokeWidth="1.5" />

                    {/* Inner Deep Navy Circle */}
                    <circle cx="50" cy="54" r="35" fill="#090E1B" stroke="#D4AF37" strokeWidth="1" />

                    {/* Inner Gold Dotted Ring */}
                    <circle cx="50" cy="54" r="32" fill="none" stroke="#FFE58F" strokeWidth="1" strokeDasharray="1.5, 2.5" />

                    {/* Center Graduation Cap Icon */}
                    <path
                      d="M50 36 L39 42 L50 48 L61 42 Z"
                      fill="#F5C451"
                      stroke="#FFF"
                      strokeWidth="0.75"
                    />
                    <path
                      d="M43 45 V50 C43 50 46 53 50 53 C54 53 57 50 57 50 V45"
                      stroke="#F5C451"
                      strokeWidth="1"
                      fill="none"
                    />

                    {/* Brand Name */}
                    <text
                      x="50"
                      y="61"
                      textAnchor="middle"
                      fill="#FFE58F"
                      fontSize="6.5"
                      fontWeight="bold"
                      letterSpacing="0.4"
                    >
                      InterviewPrep
                    </text>

                    {/* VERIFIED Banner */}
                    <text
                      x="50"
                      y="68"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="5"
                      fontWeight="900"
                      letterSpacing="1"
                    >
                      VERIFIED
                    </text>

                    {/* 3 Gold Stars */}
                    <text
                      x="50"
                      y="75"
                      textAnchor="middle"
                      fill="#F5C451"
                      fontSize="6"
                      fontWeight="bold"
                    >
                      ★★★
                    </text>

                    <defs>
                      <linearGradient id="sealGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF2B2" />
                        <stop offset="25%" stopColor="#ECC368" />
                        <stop offset="50%" stopColor="#F9D976" />
                        <stop offset="75%" stopColor="#C8972E" />
                        <stop offset="100%" stopColor="#8A5A14" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Right Column: Signature & Authority */}
              <div className="text-right shrink-0 space-y-0.5">
                {/* Authentic Digital Signature of Founder/Admin Gopal */}
                <div className="flex justify-end items-end h-10 sm:h-12 mb-0.5">
                  <img
                    src={signatureColor === 'gold' ? '/signatures/gopal_signature_gold.png' : '/signatures/gopal_signature_white.png'}
                    alt="Authorized Signature (Gopal)"
                    className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)] filter brightness-110"
                  />
                </div>

                {/* Underline */}
                <div className="w-28 sm:w-36 h-px bg-slate-600/80 ml-auto"></div>

                <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  InterviewPrep
                </div>
                <div className="text-[8px] sm:text-[9px] text-slate-400 font-sans tracking-wider uppercase">
                  Authorized Signatory
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Embedded CSS for Exact Landscape A4 Printing */}
      <style>{`
        @media print {
          body {
            background: #0A0F1D !important;
            color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav, header, footer, .print\\:hidden {
            display: none !important;
          }
          #certificate-print-area {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: landscape;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
