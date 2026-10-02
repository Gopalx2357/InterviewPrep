import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import CompanyCard from '../components/CompanyCard';
import { Building2, Search, Loader2, PlusCircle, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const Companies = () => {
  const { isAdmin } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/companies?search=${encodeURIComponent(search)}`);
      setCompanies(res.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Targeted Hiring Packages</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Company-Wise OA & Interview Preparation
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Cracking Online Assessments for Amazon, TCS, Infosys, Google, Microsoft, Wipro & more.
          </p>
        </div>

        {/* All-Access Pass Banner (Sab Kuch Access @ ₹149) */}
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl shadow-xl shadow-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-950">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-black text-base text-slate-950">Unlock ALL 10+ Company OA Packages</h3>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-950 text-amber-400">
                  Max ₹149 Offer
                </span>
              </div>
              <p className="text-xs text-slate-900 font-medium mt-0.5">
                Don't buy single companies. Get <b>Sab Kuch Access</b> (All Company OAs + All Notes + Certificate) for just ₹149!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-all-access-modal'))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:scale-105"
          >
            <span>Get All-Access @ ₹149</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Quick Action Banner */}
        {isAdmin && (
          <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl shadow-lg border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-base text-white">Admin Portal</h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">
                  Publish new company hiring guides, test patterns, syllabus & resource materials.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Link
                to="/admin/upload"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-blue-500/30 whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add Company OA Kit</span>
              </Link>
              <Link
                to="/admin/companies"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all whitespace-nowrap"
              >
                <span>Manage Companies</span>
              </Link>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name (e.g. TCS, Amazon, Infosys)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading target companies...</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto my-12 shadow-sm">
            <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No companies found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try searching with another company name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
