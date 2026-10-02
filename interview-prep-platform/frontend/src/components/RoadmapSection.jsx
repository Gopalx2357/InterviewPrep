import React from 'react';
import { Calendar, Clock, CheckCircle, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DRIVES = [
  {
    title: 'TCS NQT 2026 Hiring Drive',
    date: 'Active Registration',
    badge: 'Mass & Digital Hiring',
    badgeColor: 'bg-blue-100 text-blue-800',
    description: 'Foundation + Advanced Section testing Quant, Verbal, Pseudocode & Advanced Coding (DP/Graphs).',
    link: '/companies',
  },
  {
    title: 'Infosys HackWithInfy & InfyTQ',
    date: 'Upcoming Off-Campus',
    badge: 'Specialist Programmer (₹9.5 LPA)',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    description: '3 Coding questions in 3 hours. Top scorers get direct interview calls for SP and DSE roles.',
    link: '/companies',
  },
  {
    title: 'Accenture AAEA Hiring Drive',
    date: 'Ongoing Campus Drives',
    badge: 'Advanced Engineer',
    badgeColor: 'bg-amber-100 text-amber-800',
    description: 'Cognitive & Technical Assessment + 18 Pseudo Code questions + Mandatory Communication Assessment.',
    link: '/companies',
  },
  {
    title: 'Amazon SDE-1 Off-Campus',
    date: 'Quarterly Hiring',
    badge: 'SDE-1 (₹44 LPA)',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'HackerRank 2 Medium-Hard LeetCode problems + Work Style LP Behavioral Assessment.',
    link: '/companies',
  },
];

const RoadmapSection = () => {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2026 Placement Hiring Radar</span>
        </div>
        <h3 className="text-3xl font-black text-slate-900">Upcoming Placement Drives & Roadmaps</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Track upcoming recruitment drives and prepare with verified previous year test packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DRIVES.map((drive, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${drive.badgeColor}`}>
                  {drive.badge}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {drive.date}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{drive.title}</h4>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {drive.description}
              </p>
            </div>

            <Link
              to={drive.link}
              className="inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800 pt-2 border-t border-slate-200/60"
            >
              <span>View Exam Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSection;
