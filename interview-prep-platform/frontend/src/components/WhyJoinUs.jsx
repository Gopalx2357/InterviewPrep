import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  BookOpen,
  FileCheck2,
  Terminal,
  Award,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Target,
  Users,
  Sparkles,
  XCircle,
  Briefcase,
  TrendingUp,
  Brain
} from 'lucide-react';

const WhyJoinUs = () => {
  const reasons = [
    {
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
      badge: '50+ Top Tech Companies',
      title: 'Company-Specific OA & Interview Kits',
      description:
        'Access real previous year online assessment questions, coding patterns, and interview transcripts specifically curated for companies like Wipro, TCS, Google, Amazon, Deloitte, & Accenture.',
    },
    {
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      badge: 'SDE Verified Notes',
      title: 'High-Yield Handwritten & Digital Notes',
      description:
        'Skip 500-page textbooks. Read concise, high-yield notes for DSA, System Design, SQL, DBMS, Operating Systems, and Aptitude written by engineers placed at top tech product companies.',
    },
    {
      icon: FileCheck2,
      color: 'from-purple-500 to-violet-600',
      shadow: 'shadow-purple-500/20',
      badge: 'ATS Scanner Built-in',
      title: 'AI ATS Resume Match Score',
      description:
        'Scan your resume against target company job descriptions. Get real-time match scores, missing keyword suggestions, and structural fixes so your resume never gets filtered out by ATS.',
    },
    {
      icon: Target,
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      badge: '100% Free Resources',
      title: 'Free Placement Sheets & Roadmaps',
      description:
        'Access curated step-by-step hiring roadmaps, company drive notifications, and downloadable cheat sheets for fast-track revision before online assessments.',
    },
    {
      icon: Award,
      color: 'from-rose-500 to-pink-600',
      shadow: 'shadow-rose-500/20',
      badge: 'Verified Credentials',
      title: 'Verified Certificate Generator',
      description:
        'Complete placement readiness milestones and generate official, shareable certificates with unique candidate IDs to showcase on LinkedIn and resume portfolios.',
    },
    {
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600',
      shadow: 'shadow-cyan-500/20',
      badge: 'Salary & Quiz Arena',
      title: 'Daily Placement Quizzes & Salary Calculator',
      description:
        'Compete in daily timed placement quizzes to earn leaderboard ranks, and calculate your exact in-hand monthly salary breakdown from CTC offers.',
    },
  ];

  const comparisons = [
    {
      feature: 'Company OA Patterns',
      traditional: 'Scattered & outdated YouTube video links',
      interviewPrep: 'Curated company kits with real previous year questions & solutions',
    },
    {
      feature: 'Notes & Study Material',
      traditional: 'Lengthy 500-page books or low quality PDFs',
      interviewPrep: 'Concise, high-yield digital & handwritten SDE notes',
    },
    {
      feature: 'Resume Optimization',
      traditional: 'Blind guessing what HR/ATS looks for',
      interviewPrep: 'Instant AI ATS scanner with targeted keyword recommendations',
    },
    {
      feature: 'Placement Roadmap & Guidance',
      traditional: 'Scattered timelines & exam date confusion',
      interviewPrep: 'Structured 2026 hiring roadmap & company drive notifications',
    },
    {
      feature: 'Resource Lifetime Access',
      traditional: 'Monthly subscriptions with expiring access',
      interviewPrep: 'Lifetime access in personal candidate Dashboard',
    },
  ];

  return (
    <section id="why-join-us" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Why Join InterviewPrep</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Designed for Students & Engineers Who Want to <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">Get Placed</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Stop wasting hundreds of hours searching across fragmented resources. InterviewPrep brings company-specific exam prep, notes, AI ATS resume scoring, and verified certificates into one unified platform.
          </p>
        </div>

        {/* 6 Core Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 hover:border-blue-500/50 rounded-3xl p-7 transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 bg-slate-700/60 border border-slate-600 text-blue-300 text-[11px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
                  <span>Proven Campus & Off-Campus Strategy</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table: Traditional Prep vs InterviewPrep */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">
              The Placement Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Traditional Preparation vs InterviewPrep
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              See why top performers switch to our structured placement platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-bold uppercase text-xs">
                  <th className="py-4 px-4">Feature / Need</th>
                  <th className="py-4 px-4 text-rose-400">Traditional Preparation</th>
                  <th className="py-4 px-4 text-emerald-400 bg-blue-950/40 rounded-t-xl">InterviewPrep Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {comparisons.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{row.feature}</td>
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-emerald-300 bg-blue-950/40 font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.interviewPrep}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick About Stats & Student Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Interview Preparation?
            </h3>
            <p className="mt-3 text-blue-100 text-sm sm:text-base leading-relaxed">
              Join 5,000+ candidates who transformed their technical interview outcomes with targeted company kits and verified notes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>

              <Link
                to="/companies"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold text-white bg-blue-800/60 hover:bg-blue-800 rounded-xl border border-white/20 transition-all hover:scale-105"
              >
                Explore Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
