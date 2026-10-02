import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import NoteCard from '../components/NoteCard';
import CompanyCard from '../components/CompanyCard';
import FeedbackSection from '../components/FeedbackSection';
import CompanyLogosCloud from '../components/CompanyLogosCloud';
import SalaryCalculator from '../components/SalaryCalculator';
import QuizArena from '../components/QuizArena';
import RoadmapSection from '../components/RoadmapSection';
import MockInterviewSimulator from '../components/MockInterviewSimulator';
import ResumeATSChecker from '../components/ResumeATSChecker';
import CertificateGenerator from '../components/CertificateGenerator';
import WhyJoinUs from '../components/WhyJoinUs';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Users,
  CheckCircle,
  Code2,
  Brain,
  FileCheck2,
  Search,
  Download,
  Terminal,
  FileText,
  Mic,
  Award as AwardIcon
} from 'lucide-react';

const Home = () => {
  const [featuredNotes, setFeaturedNotes] = useState([]);
  const [popularCompanies, setPopularCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSuiteTab, setActiveSuiteTab] = useState(
    window.location.hash.includes('certificate') ? 'certificate' : 'ats'
  );

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.includes('certificate')) {
        setActiveSuiteTab('certificate');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notesRes, companiesRes] = await Promise.all([
          API.get('/notes'),
          API.get('/companies'),
        ]);

        setFeaturedNotes(notesRes.data.slice(0, 3));
        setPopularCompanies(companiesRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Updated for 2026 Enterprise Campus & Off-Campus Drives</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Crack Your Next <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">Interview</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Company-wise interview preparation, ATS resume scanner, handwritten notes & verified certificates — all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/companies"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl shadow-lg shadow-white/10 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Explore Companies</span>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </Link>

            <Link
              to="/resume-checker"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2 border border-emerald-400/30"
            >
              <FileCheck2 className="w-5 h-5" />
              <span>Check ATS Score (Free)</span>
            </Link>

            <Link
              to="/notes"
              className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 border border-slate-700"
            >
              <span>Browse Notes</span>
              <Search className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">5,000+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Students Placed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">50+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Top Tech Companies</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">100+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">Verified Note Sets</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">98%</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-medium">OA Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL-ACCESS PASS (SAB KUCH ACCESS @ ₹149) HERO BANNER */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-1 shadow-2xl shadow-amber-500/20">
          <div className="bg-slate-950 rounded-[22px] p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] uppercase font-black tracking-wider">
                    ⭐ Sab Kuch Access Pass
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    • 100% Unrestricted Lifetime Access
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Sab Kuch Access Pass @ Just <span className="text-amber-400">₹149</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Unlock <b>All 10+ Company OA Kits</b> (Amazon, Google, TCS), <b>All Notes</b>, <b>Formula Cheat Sheets</b>, <b>ATS Resume Scanner</b> & <b>Verified Certificate</b> in one click!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-end gap-2.5 shrink-0 w-full md:w-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 line-through">₹2,999</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400">₹149</span>
                <span className="text-[10px] text-slate-300 uppercase font-bold">One-Time</span>
              </div>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-all-access-modal'))}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Unlock Sab Kuch @ ₹149</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Company Logos Cloud */}
      <CompanyLogosCloud />

      {/* ENTERPRISE AI & CAREER SUITE SHOWCASE - Clean Theme */}
      <section id="certificate-section" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="px-3.5 py-1 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 rounded-full text-xs font-extrabold uppercase tracking-wider">
              Interactive Placement Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
              AI Powered Preparation Suite
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Test your resume ATS score and earn verified credentials.
            </p>

            {/* Suite Navigation Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-2xl mx-auto">
              <button
                onClick={() => setActiveSuiteTab('ats')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSuiteTab === 'ats'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>ATS Resume Scanner</span>
              </button>

              <button
                onClick={() => setActiveSuiteTab('certificate')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSuiteTab === 'certificate'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <AwardIcon className="w-4 h-4" />
                <span>Certificate Generator</span>
              </button>
            </div>
          </div>

          {/* Render Active Enterprise Module */}
          <div className="mt-8">
            {activeSuiteTab === 'ats' && <ResumeATSChecker />}
            {activeSuiteTab === 'certificate' && <CertificateGenerator />}
          </div>
        </div>
      </section>

      {/* Popular Companies Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Target Companies</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Popular Company Preparation
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Real previous year Online Assessment questions, interview transcripts, and exam strategies.
            </p>
          </div>
          <Link
            to="/companies"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <span>View All Companies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCompanies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </section>

      {/* Interactive Salary & CTC Calculator Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SalaryCalculator />
      </section>

      {/* Featured Notes Section */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Handwritten & Digital Notes</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                Featured Preparation Notes
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
                Curated by SDEs from top product-based companies. High-yield formulas, algorithms, & architecture guides.
              </p>
            </div>
            <Link
              to="/notes"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-72 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNotes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Placement Daily Quiz Arena */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuizArena />
      </section>

      {/* 2026 Placement Hiring Roadmap Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoadmapSection />
      </section>

      {/* Why Join Us / About Section */}
      <WhyJoinUs />

      {/* Student Feedback & 1000+ Reviews Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeedbackSection targetType="platform" />
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Seamless Experience</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            How InterviewPrep Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
            Get instant access to premium interview preparation material in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative group hover:shadow-lg transition-all">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-6 font-extrabold text-xl group-hover:scale-110 transition-transform">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">1. Browse & Select</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore targeted company OA packages or subject notes (DSA, System Design, SQL, Aptitude).
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative group hover:shadow-lg transition-all">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-6 font-extrabold text-xl group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. Secure Payment</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Checkout safely via Razorpay using UPI, Cards, NetBanking, or Wallet options.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative group hover:shadow-lg transition-all">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6 font-extrabold text-xl group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">3. Instant Access</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlock PDFs and resources instantly in your personal student Dashboard for lifetime reading.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl shadow-blue-500/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Accelerate Your Prep?
            </h2>
            <p className="mt-4 text-blue-100 text-sm sm:text-base leading-relaxed">
              Join thousands of engineering students and software developers preparing with InterviewPrep resources.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-blue-700 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md"
              >
                Create Free Account
              </Link>
              <Link
                to="/notes"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-white bg-blue-800/60 hover:bg-blue-800 rounded-xl border border-white/20 transition-all"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

