import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Zap,
  Target,
  Copy,
  Printer,
  RotateCcw,
  BookOpen,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  ROLE_KEYWORD_BENCHMARKS,
  SAMPLE_TECH_RESUME,
  analyzeResume,
} from '../utils/resumeAnalyzer';

const ResumeChecker = () => {
  const [selectedRole, setSelectedRole] = useState('sde');
  const [resumeText, setResumeText] = useState('');
  const [inputMode, setInputMode] = useState('paste'); // 'upload' | 'paste'
  const [fileName, setFileName] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedKeyword, setCopiedKeyword] = useState('');

  // Auto-run analysis when text changes or role changes (if text exists)
  useEffect(() => {
    if (resumeText.trim().length >= 50) {
      handleAnalyze(resumeText, selectedRole);
    }
  }, [selectedRole]);

  const handleAnalyze = (textToAnalyze, roleKey) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeResume(textToAnalyze, roleKey);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 300);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    if (file.name.endsWith('.pdf')) {
      // Basic text extraction from PDF or instruct text paste
      reader.onload = (event) => {
        const raw = event.target.result;
        // Simple printable string extraction from binary stream
        const textContent = raw.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        if (textContent.length > 80) {
          setResumeText(textContent);
          handleAnalyze(textContent, selectedRole);
        } else {
          // Fallback notice
          alert('For scanned or complex PDFs, pasting the extracted text provides the highest ATS accuracy.');
        }
      };
      reader.readAsText(file);
    } else {
      // For TXT, MD, DOCX plain text
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        handleAnalyze(text, selectedRole);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = () => {
    setFileName('sample_tech_resume.txt');
    setResumeText(SAMPLE_TECH_RESUME);
    handleAnalyze(SAMPLE_TECH_RESUME, selectedRole);
  };

  const handleClear = () => {
    setResumeText('');
    setFileName('');
    setAnalysis(null);
  };

  const handleCopyKeyword = (keyword) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(''), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Free ATS Placement Resume Analyzer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Test Your Resume ATS Score Before Campus Drives
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Evaluate your resume against real tech industry applicant tracking systems (ATS).
              Get an instant 0–100 score, missing keywords for your target role, and quantified bullet point fixes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> 100% Private & In-Browser
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Target className="w-4 h-4 text-blue-400" /> Role Benchmarks: SDE-1, Full Stack, TCS, Amazon
              </span>
            </div>
          </div>
        </div>

        {/* Input & Target Role Configuration Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Step 1: Choose Your Target Placement Role</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ATS engines match your skills against specific job descriptions. Select your target track:
              </p>
            </div>

            <div className="w-full sm:w-80">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 shadow-xs"
              >
                {Object.entries(ROLE_KEYWORD_BENCHMARKS).map(([key, role]) => (
                  <option key={key} value={key}>
                    {role.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input Method Toggle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setInputMode('paste')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    inputMode === 'paste' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Paste Resume Text
                </button>
                <button
                  onClick={() => setInputMode('upload')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    inputMode === 'upload' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Upload File (.pdf / .txt)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadSample}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Load Sample Tech Resume</span>
                </button>

                {resumeText && (
                  <button
                    onClick={handleClear}
                    className="px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-600 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {inputMode === 'paste' ? (
              <div>
                <textarea
                  rows="7"
                  value={resumeText}
                  onChange={(e) => {
                    setResumeText(e.target.value);
                    if (e.target.value.length >= 50) {
                      handleAnalyze(e.target.value, selectedRole);
                    }
                  }}
                  placeholder="Paste your full resume text here (including Education, Skills, Projects, and Experience sections)..."
                  className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-mono text-slate-800 dark:text-slate-100 leading-relaxed custom-scrollbar placeholder:text-slate-400 dark:placeholder:text-slate-500"
                ></textarea>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 px-1">
                  <span>Minimum 50 characters required for automated ATS scoring.</span>
                  <span>{resumeText.trim().split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center transition-colors bg-slate-50/50 relative">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {fileName ? `Uploaded: ${fileName}` : 'Click or drag your Resume file here'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Supports PDF, TXT, DOCX files</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {analysis && analysis.isValid && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-300">
            {/* Top Score Summary Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Radial Score Gauge */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/40 border border-slate-200/80">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                  Overall ATS Score
                </span>

                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={
                        analysis.totalScore >= 80
                          ? 'text-emerald-500'
                          : analysis.totalScore >= 65
                          ? 'text-blue-600'
                          : analysis.totalScore >= 50
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }
                      strokeDasharray={`${analysis.totalScore}, 100`}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{analysis.totalScore}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase -mt-0.5">/ 100</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${analysis.verdictColor}`}
                  >
                    {analysis.verdict}
                  </span>
                </div>
              </div>

              {/* 4 Pillars Breakdown */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>ATS Assessment Breakdown</span>
                  </h3>
                  <button
                    onClick={() => window.print()}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save Report</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pillar 1 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{analysis.breakdown.structure.label}</span>
                      <span className="font-black text-blue-600">
                        {analysis.breakdown.structure.score} / {analysis.breakdown.structure.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(analysis.breakdown.structure.score / analysis.breakdown.structure.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Contact links, header details, & standard section hierarchy.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{analysis.breakdown.impact.label}</span>
                      <span className="font-black text-indigo-600">
                        {analysis.breakdown.impact.score} / {analysis.breakdown.impact.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(analysis.breakdown.impact.score / analysis.breakdown.impact.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Action verb variety & quantified data results (%, metrics).
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{analysis.breakdown.keywords.label}</span>
                      <span className="font-black text-emerald-600">
                        {analysis.breakdown.keywords.score} / {analysis.breakdown.keywords.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(analysis.breakdown.keywords.score / analysis.breakdown.keywords.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {analysis.breakdown.keywords.matchedCount} of {analysis.breakdown.keywords.totalCount} essential keywords matched.
                    </p>
                  </div>

                  {/* Pillar 4 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{analysis.breakdown.depth.label}</span>
                      <span className="font-black text-purple-600">
                        {analysis.breakdown.depth.score} / {analysis.breakdown.depth.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(analysis.breakdown.depth.score / analysis.breakdown.depth.max) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Total {analysis.wordCount} words. Tech stack depth across projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyword Match Radar */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Target Role Keyword Alignment ({analysis.targetRole})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  ATS parsers scan for exact keyword tokens. Click any missing keyword to copy it into your resume.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Matched Keywords */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Keywords Found in Your Resume ({analysis.matchedKeywords.length})</span>
                  </span>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {analysis.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Missing High-Demand Keywords ({analysis.missingKeywords.length})</span>
                  </span>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {analysis.missingKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => handleCopyKeyword(kw)}
                        className="group px-2.5 py-1 rounded-xl bg-white border border-amber-200 text-amber-900 hover:border-amber-400 text-xs font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                        title="Click to copy keyword"
                      >
                        <Copy className="w-3 h-3 text-amber-600 group-hover:scale-110 transition-transform" />
                        <span>{kw}</span>
                        {copiedKeyword === kw && (
                          <span className="text-[10px] text-emerald-600 font-bold ml-1">Copied!</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Fixes & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Critical Fixes */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>High Priority Fixes</span>
                </div>
                {analysis.criticalFixes.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-medium">No critical blockers found. Great job!</p>
                ) : (
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {analysis.criticalFixes.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 font-medium">
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recommended Improvements */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>Suggested Enhancements</span>
                </div>
                {analysis.improvements.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-medium">Resume is well-optimized.</p>
                ) : (
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {analysis.improvements.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 font-medium">
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Strengths */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Resume Strengths</span>
                </div>
                {analysis.strengths.length === 0 ? (
                  <p className="text-xs text-slate-400">Implement improvements above to build strengths.</p>
                ) : (
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {analysis.strengths.map((item, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 font-medium">
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* STAR Method Bullet Point Transformation */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
                  <span>STAR Method Bullet Point Rewriting Guide</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Transform passive task descriptions into quantified, high-impact accomplishments that recruiters love:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.sampleBulletRewrites.map((example, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                        Weak / Passive
                      </span>
                      <p className="text-xs text-slate-600 mt-1.5 italic">"{example.before}"</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Optimized ATS Bullet
                      </span>
                      <p className="text-xs font-semibold text-slate-900 mt-1.5">"{example.after}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Recommendations Linking To Platform Marketplaces */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Next Step In Your Placement Prep
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Bridge Your Missing Technical Keywords with Verified Kits
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Explore handwritten DSA formula sheets, System Design playbooks, and company-specific OA past sets.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/notes"
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Browse Notes
                </Link>
                <Link
                  to="/companies"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Company OA Kits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeChecker;
