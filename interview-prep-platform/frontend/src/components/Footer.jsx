import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png?v=2"
                alt="InterviewPrep Logo"
                className="w-10 h-10 rounded-full object-cover shadow-md shadow-blue-500/20 ring-2 ring-blue-500/30"
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white">InterviewPrep</span>
                <span className="text-[9px] font-extrabold tracking-wider text-amber-400 uppercase -mt-1">
                  Learn • Practice • Get Hired
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering engineers and tech candidates to crack top tech company online assessments and interviews.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#why-join-us" className="hover:text-white transition-colors">
                  Why Join Us (About)
                </a>
              </li>
              <li>
                <Link to="/notes" className="hover:text-white transition-colors">
                  Browse Notes
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-white transition-colors">
                  Company OA Kits
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular Topics</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Data Structures & Algorithms</li>
              <li className="hover:text-white transition-colors cursor-pointer">System Design (HLD/LLD)</li>
              <li className="hover:text-white transition-colors cursor-pointer">TCS NQT & Infosys InfyTQ</li>
              <li className="hover:text-white transition-colors cursor-pointer">Amazon & Google OA Questions</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Security & Verification</h4>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Verified Razorpay Payments</span>
              </div>
              <p className="text-slate-400">
                100% Secure backend token verification and instant digital resource access upon purchase.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} InterviewPrep. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for tech career success</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
