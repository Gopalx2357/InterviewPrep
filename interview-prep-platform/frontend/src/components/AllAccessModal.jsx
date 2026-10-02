import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import {
  X,
  Sparkles,
  CheckCircle2,
  Building2,
  BookOpen,
  FileCheck2,
  Award,
  Zap,
  Lock,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export default function AllAccessModal() {
  const { user, showToast } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [simulatedModalOpen, setSimulatedModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-all-access-modal', handleOpen);
    return () => window.removeEventListener('open-all-access-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleBuyPass = async () => {
    if (!user) {
      if (showToast) showToast('Please sign in to get the All-Access Pass', 'info');
      setIsOpen(false);
      navigate('/login', { state: { from: { pathname: '/companies' } } });
      return;
    }

    if (user.hasAllAccess) {
      if (showToast) showToast('Aapke paas pehle se All-Access Pass active hai! Sab kuch unlocked hai.', 'info');
      setIsOpen(false);
      return;
    }

    setPurchasing(true);
    try {
      const res = await API.post('/payments/create-order', {
        itemType: 'all-access',
      });

      if (res.data.isFree) {
        if (showToast) showToast(res.data.message || 'Admin All-Access Granted!', 'success');
        setPurchasing(false);
        setIsOpen(false);
        window.location.reload();
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
          description: itemTitle || 'All-Access Pass (Sab Kuch Access)',
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
            color: '#F59E0B',
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
        setSimulatedModalOpen(true);
        setPurchasing(false);
      }
    } catch (error) {
      console.error('All-Access Purchase error:', error);
      const msg = error.response?.data?.message || 'Failed to initiate purchase';
      if (showToast) showToast(msg, 'error');
      setPurchasing(false);
    }
  };

  const handlePaymentVerification = async (paymentDetails) => {
    setPurchasing(true);
    try {
      const verifyRes = await API.post('/payments/verify', {
        ...paymentDetails,
        itemType: 'all-access',
      });

      if (verifyRes.data.success) {
        if (showToast) showToast('🎉 All-Access Pass Activated! Sab kuch unlocked ho gaya!', 'success');
        setIsOpen(false);
        setSimulatedModalOpen(false);
        // Refresh to re-evaluate unlocked states across app
        window.location.reload();
      }
    } catch (verifyErr) {
      console.error('Verification error:', verifyErr);
      if (showToast) showToast('Payment verification failed.', 'error');
    } finally {
      setPurchasing(false);
    }
  };

  const features = [
    {
      icon: Building2,
      color: 'text-amber-400 bg-amber-500/10',
      title: 'All 10+ Company OA Prep Packages',
      desc: 'TCS, Amazon, Google, Microsoft, Accenture, Infosys, Deloitte, Goldman Sachs, Wipro & Cognizant.',
    },
    {
      icon: BookOpen,
      color: 'text-blue-400 bg-blue-500/10',
      title: 'All Comprehensive Handbooks & Notes',
      desc: 'DSA Masterclass, System Design (HLD/LLD), React 18, SQL & DBMS, OS & Networks, Aptitude.',
    },
    {
      icon: Zap,
      color: 'text-yellow-400 bg-yellow-500/10',
      title: 'All Revision Cheat Sheets & Formula Cards',
      desc: 'Top 50 DSA patterns, Relational SQL Joins, Linux/Git & Fast Placement Trick Formulas.',
    },
    {
      icon: FileCheck2,
      color: 'text-emerald-400 bg-emerald-500/10',
      title: 'AI ATS Resume Checker & Builder',
      desc: 'Unlimited real-time keyword analysis, format check, and recruiter score optimization.',
    },
    {
      icon: Award,
      color: 'text-purple-400 bg-purple-500/10',
      title: 'Official Certificate of Enrollment Unlocked',
      desc: 'Lifetime verified certificate with tamper-proof QR code & Gopal’s official digital signature.',
    },
    {
      icon: Clock,
      color: 'text-indigo-400 bg-indigo-500/10',
      title: 'Lifetime Validity & Free Future Updates',
      desc: 'No monthly subscription, no hidden charges. Pay once, access forever.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0F172A] to-[#090D1A] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-white">
        
        {/* Glowing Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-amber-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sab Kuch Access • Limited Offer</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            VIP All-Access Super Pass
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Get 100% unrestricted lifetime access to everything on InterviewPrep for just one small payment.
          </p>

          {/* Pricing Highlight */}
          <div className="mt-4 inline-flex items-baseline gap-3 bg-slate-900/80 border border-amber-500/30 px-6 py-2.5 rounded-2xl shadow-inner">
            <span className="text-xs text-slate-400 font-bold line-through">₹2,999</span>
            <div className="flex items-baseline">
              <span className="text-3xl sm:text-4xl font-black text-amber-400">₹149</span>
              <span className="text-xs text-amber-200/80 font-bold ml-1.5">Only (One-Time)</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase">
              Save 95%
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="px-6 sm:px-8 py-3 max-h-[320px] overflow-y-auto space-y-2.5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40 hover:border-amber-500/30 transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${feat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{feat.title}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer / Action Button */}
        <div className="p-6 sm:p-8 pt-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant Razorpay Payment • 100% Safe & Instant Unlock</span>
          </div>

          <button
            onClick={handleBuyPass}
            disabled={purchasing}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {purchasing ? (
              <span>Activating Pass...</span>
            ) : (
              <>
                <span>Get Sab Kuch Access @ ₹149</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Fallback Simulation Modal if Razorpay script is blocked or in test */}
        {simulatedModalOpen && orderData && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 p-6 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Test Razorpay Payment Confirmation</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              Simulating live payment for <b>₹149 All-Access Pass</b>.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() =>
                  handlePaymentVerification({
                    razorpay_order_id: orderData.orderId,
                    razorpay_payment_id: 'pay_test_' + Date.now(),
                    razorpay_signature: 'test_sig_' + Date.now(),
                  })
                }
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md"
              >
                Confirm ₹149 Payment
              </button>
              <button
                onClick={() => setSimulatedModalOpen(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
