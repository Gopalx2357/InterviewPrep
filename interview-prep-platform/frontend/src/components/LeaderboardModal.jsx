import React, { useState } from 'react';

const TOP_PREPPERS = [
  { rank: 1, name: "Aarav Sharma", company: "Capgemini Selected", streak: 14, xp: 2450, badge: "🥇 Top 1% Ninja" },
  { rank: 2, name: "Ananya Roy", company: "Deloitte Placed", streak: 12, xp: 2180, badge: "🥈 System Architect" },
  { rank: 3, name: "Rohan Verma", company: "TCS Digital", streak: 10, xp: 1940, badge: "🥉 Code Master" },
  { rank: 4, name: "Sneha Patel", company: "Amazon SDE 1", streak: 9, xp: 1820, badge: "⚡ Problem Solver" },
  { rank: 5, name: "Vikram Singh", company: "Infosys Power", streak: 8, xp: 1650, badge: "🔥 Streak Warrior" }
];

export default function LeaderboardModal({ isOpen, onClose }) {
  const [userStreak] = useState(7);
  const [userXP] = useState(1420);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-white relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center pb-4 border-b border-slate-800">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            Gamified Community
          </span>
          <h2 className="text-2xl font-black mt-2 text-slate-100">Prep Leaderboard & Streaks</h2>
          <p className="text-slate-400 text-xs mt-1">Practice daily to build your streak, earn XP, and climb the placement rank!</p>
        </div>

        {/* User Personal Stat Cards */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3">
            <span className="text-3xl animate-bounce">🔥</span>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Current Streak</span>
              <span className="text-lg font-black text-amber-400">{userStreak} Days Active</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Prep XP</span>
              <span className="text-lg font-black text-indigo-400">{userXP} XP Points</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-2 mt-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Top Candidate Leaderboard</span>
          
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {TOP_PREPPERS.map((user) => (
              <div key={user.rank} className="p-3 bg-slate-950/50 hover:bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                    user.rank === 2 ? 'bg-slate-400/20 text-slate-300' :
                    user.rank === 3 ? 'bg-amber-700/20 text-amber-500' : 'text-slate-500'
                  }`}>
                    #{user.rank}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{user.name}</h4>
                    <span className="text-[10px] text-slate-400">{user.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-amber-400">🔥 {user.streak}d</span>
                  <span className="text-indigo-400 font-mono">{user.xp} XP</span>
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded text-[10px]">
                    {user.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
        >
          Keep Practicing to Rank Up →
        </button>
      </div>
    </div>
  );
}
