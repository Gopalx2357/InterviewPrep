import React from 'react';
import CertificateGenerator from '../components/CertificateGenerator';
import { Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Official Verification Portal</span>
            </span>
          </div>
        </div>

        {/* Certificate Component */}
        <CertificateGenerator defaultName="Gopal Yadav" />
      </div>
    </div>
  );
}
