import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ProfileEditModal from '../components/ProfileEditModal';
import {
  BookOpen,
  Building2,
  ShoppingBag,
  Download,
  Calendar,
  CreditCard,
  ArrowRight,
  Loader2,
  CheckCircle2,
  FileText,
  User,
  Edit3,
  Sparkles,
  FileCheck2,
  Award,
  PlusCircle,
} from 'lucide-react';

import PdfViewerModal from '../components/PdfViewerModal';

const Dashboard = () => {
  const { user, showToast, isAdmin } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [activePdfUrl, setActivePdfUrl] = useState('');
  const [activePdfTitle, setActivePdfTitle] = useState('');

  const fetchPurchases = async () => {
    try {
      const res = await API.get('/payments/my-purchases');
      setPurchases(res.data);
    } catch (error) {
      console.error('Error loading purchases:', error);
      showToast('Failed to load purchase history.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const hasAllAccess = user?.hasAllAccess || purchases.some((p) => p.itemType === 'all-access');
  const purchasedNotesCount = purchases.filter((p) => p.itemType === 'note' && p.noteId).length;
  const purchasedCompaniesCount = purchases.filter((p) => p.itemType === 'company' && p.companyId).length;

  const handleDownloadResource = async (itemType, itemId, title) => {
    try {
      const endpoint = itemType === 'note' ? `/notes/${itemId}` : `/companies/${itemId}`;
      const res = await API.get(endpoint);
      const pdfUrl = res.data.pdfUrl || res.data.resources || '/uploads/notes/test_1rupee_handbook.pdf';

      setActivePdfUrl(pdfUrl);
      setActivePdfTitle(title);
      setPdfModalOpen(true);
    } catch (error) {
      console.warn('Fallback to direct test PDF:', error);
      setActivePdfUrl('/uploads/notes/test_1rupee_handbook.pdf');
      setActivePdfTitle(title);
      setPdfModalOpen(true);
    }
  };

  const displayName = user?.officialName || (user?.name && !user.name.includes('@') ? user.name : user?.email?.split('@')[0] || 'Student');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
          <div className="flex items-center gap-4">
            {/* Candidate Avatar Photo or First Letter Badge */}
            <div className="relative shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
                />
              ) : null}

              {(!user?.avatar || true) && (
                <div
                  style={{ display: user?.avatar ? 'none' : 'flex' }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-black items-center justify-center text-2xl shadow-md uppercase"
                >
                  {displayName.trim().charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                {hasAllAccess ? (
                  <span className="px-3 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    ⭐ VIP All-Access Member
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {user?.officialName ? 'Verified Candidate' : 'Candidate Account'}
                  </span>
                )}
                {user?.phone && (
                  <span className="text-[10px] text-slate-400 font-semibold">
                    • Contact: {user.phone}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Welcome back, <span className="text-blue-600 dark:text-blue-400">{displayName}</span> 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {hasAllAccess
                  ? 'Sab Kuch Access Active: You have permanent unlocked access to all Company OAs, Notes & Official Certificate.'
                  : 'Access all your unlocked notes, certificates, and company preparation materials below.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <Link
                to="/admin/upload"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                title="Upload Notes or Company OA Kits"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Upload Content</span>
              </Link>
            )}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
            <Link
              to="/resume-checker"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5 border border-emerald-200/60 dark:border-emerald-800/60"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Resume ATS Score
            </Link>
            <Link
              to="/certificate"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors flex items-center gap-1.5 border border-amber-200/60 dark:border-amber-800/60"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{hasAllAccess || purchasedCompaniesCount > 0 || user?.role === 'admin' ? 'Enrollment Certificate' : 'Certificate 🔒'}</span>
            </Link>
            <Link
              to="/notes"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
            >
              Browse Notes
            </Link>
            <Link
              to="/companies"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Explore Companies
            </Link>
          </div>
        </div>

        {/* VIP Member Banner OR Sab Kuch All-Access ₹149 Banner */}
        {hasAllAccess ? (
          <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border border-amber-400/40 rounded-3xl p-6 sm:p-7 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-black text-xl">
                ⭐
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-1.5 border border-amber-400/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>VIP Sab Kuch Access Active • Flat ₹149 Member</span>
                </div>
                <h3 className="text-xl font-black text-white">Full Platform Access Unlocked!</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  You have permanent access to all 10+ Company Online Assessment Kits (Amazon, Google, Microsoft, TCS, Infosys, Accenture, etc.), all Technical Notes, Cheat Sheets, AI Resume audit, and your Official Certificate of Enrollment!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/certificate"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>View Certificate</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 sm:p-7 text-slate-950 shadow-xl shadow-amber-500/15 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black uppercase tracking-wider mb-1.5">
                  <span>🔥 Sab Kuch Access Deal • Flat ₹149</span>
                </div>
                <h3 className="text-xl font-black text-slate-950">Unlock Everything On Platform For ₹149 Only</h3>
                <p className="text-xs text-slate-950/80 font-medium mt-1 max-w-2xl leading-relaxed">
                  Why pay separately? Unlock all 10+ Company OA packages (Amazon, Google, TCS, Infosys, etc.), all Notes & formula sheets, AI Resume checker, and your official enrollment certificate with Gopal's digital signature!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-all-access-modal'))}
              className="shrink-0 px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-400 rounded-xl font-black text-xs shadow-xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Sab Kuch Access @ ₹149</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ATS Resume Score Quick Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-500/10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>100% Free AI Tool</span>
              </div>
              <h3 className="text-xl font-black">Check Your Resume ATS Score (0 - 100)</h3>
              <p className="text-xs text-emerald-100 mt-1 max-w-xl leading-relaxed">
                Benchmark your tech resume against SDE-1, Frontend, Backend, and Campus IT requirements. Discover missing keywords, bullet point rewrites, and download your free audit report.
              </p>
            </div>
          </div>
          <Link
            to="/resume-checker"
            className="shrink-0 px-6 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Scan My Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Purchased Notes</span>
              <BookOpen className="w-6 h-6 text-blue-200" />
            </div>
            <div className="text-4xl font-extrabold mt-3">{purchasedNotesCount}</div>
            <p className="text-xs text-blue-100 mt-1">Digital Handbooks & Sheets</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Company Preps</span>
              <Building2 className="w-6 h-6 text-indigo-200" />
            </div>
            <div className="text-4xl font-extrabold mt-3">{purchasedCompaniesCount}</div>
            <p className="text-xs text-indigo-100 mt-1">OA & Interview Kits</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Purchases</span>
              <ShoppingBag className="w-6 h-6 text-slate-300" />
            </div>
            <div className="text-4xl font-extrabold mt-3">{purchases.length}</div>
            <p className="text-xs text-slate-400 mt-1">Unlocked Unrestricted Items</p>
          </div>
        </div>

        {/* My Purchased Content List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">My Purchased Content</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchPurchases}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all"
              >
                🔄 Refresh List
              </button>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                Showing {purchases.length} item(s)
              </span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Loading purchases...</p>
            </div>
          ) : purchases.length === 0 ? (
            <div className="py-12 text-center max-w-sm mx-auto">
              <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No purchases yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                You have not purchased any interview preparation material yet. Browse our marketplace to get started.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Link
                  to="/notes"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Browse Notes
                </Link>
                <Link
                  to="/companies"
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Explore Companies
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {purchases.map((purchase) => {
                const isAllAccess = purchase.itemType === 'all-access';
                const isNote = purchase.itemType === 'note' || (!purchase.companyId && !isAllAccess);
                const item = isNote ? purchase.noteId : purchase.companyId;

                const title = isAllAccess
                  ? '⭐ Sab Kuch All-Access Pass (Everything Unlocked)'
                  : (item && (item.title || item.name)) || '🔥 Special Test PDF Handbook ( ₹1 Special Kit )';
                const categoryOrRole = isAllAccess
                  ? 'VIP ALL-ACCESS'
                  : (item && (item.category || item.role)) || 'DSA Core';
                const targetId = (item && item._id) || '6aa470558e42ed64c78dbcb9';

                return (
                  <div
                    key={purchase._id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 p-3 rounded-2xl transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-1 ${
                          isAllAccess
                            ? 'bg-gradient-to-tr from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md'
                            : isNote
                            ? 'bg-blue-600'
                            : 'bg-indigo-600'
                        }`}
                      >
                        {isAllAccess ? <Sparkles className="w-5 h-5 text-slate-950" /> : isNote ? <FileText className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                              isAllAccess
                                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {categoryOrRole}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(purchase.purchasedAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{title}</h4>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>Amount: ₹{purchase.amount}</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Payment Verified</span>
                          {isAllAccess && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 dark:text-amber-400 font-bold">Unlocks 100% Platform</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {isAllAccess ? (
                        <div className="flex items-center gap-2">
                          <Link
                            to="/companies"
                            className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all flex items-center gap-1"
                          >
                            <span>Browse OAs</span>
                          </Link>
                          <Link
                            to="/certificate"
                            className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl shadow-sm transition-all flex items-center gap-1 border border-slate-700"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            <span>Certificate</span>
                          </Link>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownloadResource(purchase.itemType || 'note', targetId, title)}
                          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Access PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Candidate Profile Modal */}
      <ProfileEditModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />

      {/* Interactive PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={activePdfUrl}
        title={activePdfTitle}
      />
    </div>
  );
};

export default Dashboard;
