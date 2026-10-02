import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import FeedbackSection from '../components/FeedbackSection';
import PaymentModal from '../components/PaymentModal';
import {
  Building2,
  Briefcase,
  CheckCircle2,
  Lock,
  Download,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Brain,
  Code2,
  HelpCircle,
  FileCheck2,
  Sparkles,
} from 'lucide-react';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, showToast } = useContext(AuthContext);

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const fetchCompanyDetails = async () => {
    try {
      const res = await API.get(`/companies/${id}`);
      setCompany(res.data);
    } catch (error) {
      console.error('Error loading company details:', error);
      showToast('Company prep not found or server error.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, [id]);

  const isUserAdmin = user?.role === 'admin' || (user?.email && user.email.toLowerCase() === 'gopal.x235@gmail.com');

  const handleBuyNow = async () => {
    if (!user) {
      showToast('Please log in to purchase resources', 'info');
      navigate('/login', { state: { from: { pathname: `/companies/${id}` } } });
      return;
    }

    if (isUserAdmin) {
      showToast('Admin Free Access Granted! Accessing prep resource...', 'success');
      handleDownloadResource();
      return;
    }

    setPurchasing(true);
    try {
      const res = await API.post('/payments/create-order', {
        companyId: company._id,
        itemType: 'company',
      });

      if (res.data.isFree) {
        showToast(res.data.message, 'success');
        fetchCompanyDetails();
        setPurchasing(false);
        return;
      }

      const { orderId, amount, currency, keyId, itemTitle } = res.data;
      const isRealRazorpayKey = keyId && !keyId.includes('mockkey') && keyId.startsWith('rzp_');

      if (isRealRazorpayKey && window.Razorpay) {
        const options = {
          key: keyId,
          amount: amount,
          currency: currency,
          name: 'InterviewPrep Platform',
          description: `Company OA Package: ${itemTitle}`,
          order_id: orderId,
          handler: async function (response) {
            await handlePaymentVerification({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: '#2563eb',
          },
          modal: {
            ondismiss: function () {
              setPurchasing(false);
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setOrderData({ orderId, amount, currency, keyId, itemTitle });
        setPaymentModalOpen(true);
        setPurchasing(false);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      showToast(error.response?.data?.message || 'Order creation failed.', 'error');
      setPurchasing(false);
    }
  };

  const handlePaymentVerification = async (paymentDetails) => {
    setPurchasing(true);
    try {
      const verifyRes = await API.post('/payments/verify', {
        ...paymentDetails,
        companyId: company._id,
        itemType: 'company',
      });

      if (verifyRes.data.success) {
        showToast('Payment verified! Company prep package unlocked.', 'success');
        fetchCompanyDetails();
      }
    } catch (verifyErr) {
      console.error('Verification error:', verifyErr);
      showToast('Payment verification failed.', 'error');
    } finally {
      setPurchasing(false);
    }
  };

  const handleDownloadResource = async () => {
    try {
      const response = await API.get(`/companies/${id}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${company.name.replace(/\s+/g, '_')}_Preparation_Kit.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      showToast('Could not download package resource. Verify purchase.', 'error');
    }
  };

  const handlePreventCopy = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast('⚠️ Copy-Paste & Right-Click are disabled for OA content to maintain exam integrity', 'warning');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-xl font-bold text-slate-800">Company Package Not Found</h2>
        <Link to="/companies" className="text-sm font-semibold text-blue-600 hover:underline">
          Back to Companies List
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/companies"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Companies</span>
        </Link>

        {/* Company Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-md flex items-center justify-center shrink-0 border border-slate-100">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Building2 className="w-10 h-10 text-slate-700" />
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold">{company.name}</h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200 mt-1 font-semibold">
                  <Briefcase className="w-4 h-4" />
                  <span>Target Role: {company.role}</span>
                </div>
              </div>
            </div>

            {company.isPurchased && (
              <div className="bg-emerald-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-4 h-4" />
                <span>Unlocked & Active</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Package Description</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{company.description}</p>
            </div>

            {/* Online Assessment Breakdown (Copy-Paste Protected) */}
            <div
              onCopy={handlePreventCopy}
              onCut={handlePreventCopy}
              onPaste={handlePreventCopy}
              onContextMenu={handlePreventCopy}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 select-none"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900">Online Assessment (OA) Breakdown</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Anti Copy-Paste Enabled
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Aptitude & Quant</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {company.oaDetails?.aptitude || 'Detailed numerical and logical reasoning breakdown.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Coding Round</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {company.oaDetails?.coding || 'Coding questions, data structures, & time constraints.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">MCQs & Pseudocode</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {company.oaDetails?.mcqs || 'Technical MCQs, debugging, and CS fundamentals.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">OA Format & Rules</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {company.oaDetails?.details || 'Exam rules, cutoff strategy, and platform guidelines.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Interview Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Technical & HR Interview Experience</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase">Technical Rounds</h4>
                  <p className="text-xs text-indigo-950 leading-relaxed">
                    {company.interviewDetails?.technical || 'Deep dive into project architecture, live coding, and core CS questions.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
                  <h4 className="text-xs font-bold text-rose-900 uppercase">HR & Behavioral Rounds</h4>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    {company.interviewDetails?.hr || 'Cultural fitment, situational scenarios, and STAR methodology.'}
                  </p>
                </div>

                {company.interviewDetails?.faqs && company.interviewDetails.faqs.length > 0 && (
                  <div className="pt-3 space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                      <span>Frequently Asked Interview Questions</span>
                    </h4>
                    <ul className="space-y-2">
                      {company.interviewDetails.faqs.map((faq, idx) => (
                        <li key={idx} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 border border-slate-200/60 font-medium">
                          • {faq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews / Feedback */}
            <FeedbackSection targetType="company" targetId={company._id} />
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl sticky top-24 space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Package Price</span>
                <div className="text-3xl font-black text-slate-900 mt-0.5">
                  {company.price === 0 ? 'FREE' : `₹${company.price}`}
                </div>
              </div>

              {company.isPurchased || isUserAdmin ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isUserAdmin ? 'Admin Free Access Granted' : 'Unlocked for your account'}</span>
                    </span>
                    {isUserAdmin && (
                      <Link to="/admin/companies" className="text-blue-600 hover:underline font-bold text-[11px]">
                        Edit Company
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={handleDownloadResource}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isUserAdmin ? 'Access / Read Prep (Admin Free)' : 'Access / Download Prep Resource'}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleBuyNow}
                  disabled={purchasing}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:shadow-xl disabled:opacity-70"
                >
                  {purchasing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Buy Now - Instant Access</span>
                    </>
                  )}
                </button>
              )}

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Razorpay Verified Signature Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  <span>Complete Solved Question Sets Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderData={orderData}
        onPaymentSuccess={handlePaymentVerification}
        user={user}
      />
    </div>
  );
};

export default CompanyDetails;
