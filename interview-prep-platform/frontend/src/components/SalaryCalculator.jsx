import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Award, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROLES = [
  { name: 'TCS Ninja (Standard)', ctc: 3.36, category: 'Mass Hiring' },
  { name: 'TCS Digital (Advanced)', ctc: 7.0, category: 'High Package' },
  { name: 'TCS Prime (Top Tier)', ctc: 9.0, category: 'Prime Role' },
  { name: 'Infosys Specialist Programmer', ctc: 9.5, category: 'SP Hiring' },
  { name: 'Accenture AAEA', ctc: 4.5, category: 'Advanced Associate' },
  { name: 'Amazon SDE-1', ctc: 44.0, category: 'Product Giant' },
  { name: 'Google L3 Engineer', ctc: 38.0, category: 'Product Giant' },
];

const SalaryCalculator = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES[1]);
  const [currentPackage, setCurrentPackage] = useState(3.36);

  const salaryDifference = Math.max(0, (selectedRole.ctc - currentPackage).toFixed(2));
  const yearlyGainInLakhs = salaryDifference;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Intro */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Placement ROI Tool</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            Calculate Your Placement Package Bump
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Clearing Advanced OA rounds (like TCS Digital vs Ninja, or Infosys SP vs SE) instantly doubles or triples your starting package.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Real hiring data</span>
            <span>•</span>
            <span>Updated 2026 Salary brackets</span>
          </div>
        </div>

        {/* Right Calculator Card */}
        <div className="lg:col-span-6 bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-5 backdrop-blur-md">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select Your Target Hiring Role:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ROLES.map((role, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRole(role)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                    selectedRole.name === role.name
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-bold">{role.name}</div>
                  <div className="text-[11px] opacity-80">₹{role.ctc} LPA</div>
                </button>
              ))}
            </div>
          </div>

          {/* Outcome Display */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-medium uppercase block">Potential Annual Increase</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                +₹{yearlyGainInLakhs} Lakhs / year
              </span>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <Link
            to="/companies"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Unlock {selectedRole.name} OA Kit Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
