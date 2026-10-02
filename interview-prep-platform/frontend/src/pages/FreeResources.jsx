import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';
import { FileText, Download, Sparkles, CheckCircle2, ShieldCheck, Tag, Loader2, BookOpen } from 'lucide-react';

const STATIC_SHEETS = [
  {
    _id: 'static_dsa_1',
    title: '🔥 Special Test PDF Handbook ( ₹1 Special Kit )',
    category: 'DSA Core',
    price: 1,
    pages: 25,
    description: 'Instant ₹1 test placement PDF handbook with top 50 array, tree, graph, and DP formulas.',
    pdfUrl: '/uploads/notes/test_1rupee_handbook.pdf',
  },
  {
    _id: 'static_dsa_2',
    title: 'Ultimate Data Structures & Algorithms Handbook ( ₹1 Kit )',
    category: 'DSA Patterns',
    price: 1,
    pages: 145,
    description: 'Master arrays, linked lists, trees, graphs, dynamic programming, and greedy algorithms with clean C++ & Java code.',
    pdfUrl: '/uploads/notes/test_1rupee_handbook.pdf',
  },
  {
    _id: 'static_sql_3',
    title: 'Top 50 Relational SQL Queries & Join Formulas ( ₹1 Kit )',
    category: 'Database SQL',
    price: 1,
    pages: 64,
    description: 'Complex subqueries, Window functions (ROW_NUMBER, DENSE_RANK), Normalization (1NF-BCNF) cheat sheet.',
    pdfUrl: '/uploads/notes/test_1rupee_handbook.pdf',
  },
  {
    _id: 'static_sys_4',
    title: 'Git, Linux Shell & Command Line Reference Card ( ₹1 Kit )',
    category: 'Developer Tools',
    price: 1,
    pages: 50,
    description: 'Essential Linux terminal commands, process management, and Git rebase/merge conflict resolution.',
    pdfUrl: '/uploads/notes/test_1rupee_handbook.pdf',
  },
];

const FreeResources = () => {
  const { user, showToast } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState(STATIC_SHEETS);
  const [loading, setLoading] = useState(false);
  const [purchasingId, setPurchasingId] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const loadBackendNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/notes');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const re1Notes = res.data.filter((n) => n.price === 1);
          if (re1Notes.length > 0) {
            setNotes(re1Notes);
          } else {
            setNotes(res.data);
          }
        }
      } catch (err) {
        console.warn('Backend notes fetch fallback to static sheets:', err.message);
      }
    };
    loadBackendNotes();
  }, []);

  const handleBuyRe1Note = async (sheet) => {
    if (!user) {
      showToast('Please log in to purchase ₹1 resources', 'info');
      navigate('/login', { state: { from: { pathname: '/free-resources' } } });
      return;
    }

    setPurchasingId(sheet._id);
    try {
      // Find actual note ID from backend
      let noteIdToUse = sheet._id;
      if (sheet._id.startsWith('static_')) {
        try {
          const res = await axios.get('http://localhost:5001/api/notes');
          if (Array.isArray(res.data) && res.data.length > 0) {
            noteIdToUse = res.data[0]._id;
          }
        } catch (e) {}
      }

      const token = localStorage.getItem('token');
      const orderRes = await axios.post(
        'http://localhost:5001/api/payments/create-order',
        { noteId: noteIdToUse, itemType: 'note' },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );

      if (orderRes.data.isFree) {
        showToast(orderRes.data.message, 'success');
        setPurchasingId(null);
        navigate('/dashboard');
        return;
      }

      const { orderId, amount, currency, keyId, itemTitle } = orderRes.data;
      const isRealRazorpayKey = keyId && !keyId.includes('mockkey') && keyId.startsWith('rzp_');

      if (isRealRazorpayKey && window.Razorpay) {
        const options = {
          key: keyId,
          amount: amount,
          currency: currency,
          name: 'InterviewPrep Platform',
          description: `Purchase: ${itemTitle}`,
          order_id: orderId,
          handler: async function (response) {
            await handlePaymentVerification(response, noteIdToUse);
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
              setPurchasingId(null);
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setOrderData({ orderId, amount, currency, keyId, itemTitle, noteId: noteIdToUse });
        setPaymentModalOpen(true);
        setPurchasingId(null);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message;
      if (errMsg && errMsg.toLowerCase().includes('already purchased')) {
        showToast('You already own this note! Opening PDF...', 'success');
        navigate('/dashboard');
        setPurchasingId(null);
        return;
      }
      console.error('Order creation error:', error);
      showToast(errMsg || 'Order creation failed.', 'error');
      setPurchasingId(null);
    }
  };

  const handlePaymentVerification = async (paymentDetails, targetNoteId) => {
    const noteIdToUse = targetNoteId || orderData?.noteId;
    try {
      const token = localStorage.getItem('token');
      const verifyRes = await axios.post(
        'http://localhost:5001/api/payments/verify',
        {
          ...paymentDetails,
          noteId: noteIdToUse,
          itemType: 'note',
        },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );

      if (verifyRes.data.success) {
        showToast('Payment successful! Access granted.', 'success');
        navigate('/dashboard');
      }
    } catch (verifyErr) {
      console.error('Verification error:', verifyErr);
      showToast('Payment verification failed.', 'error');
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>🔥 ₹1 Special Placement Formula Resources</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ₹1 Quick Revision Cheat Sheets & Formula Cards
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Click "Get for ₹1" to initiate live Razorpay ₹1 checkout & instant PDF unlock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((sheet, idx) => (
            <div
              key={sheet._id || idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
                    {sheet.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Special Price: ₹1 Only
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{sheet.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sheet.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900">₹1</span>
                  <span className="text-xs font-semibold text-slate-400">({sheet.pages || 25} Pages PDF)</span>
                </div>
                <button
                  onClick={() => handleBuyRe1Note(sheet)}
                  disabled={purchasingId === sheet._id}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-75"
                >
                  {purchasingId === sheet._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Tag className="w-4 h-4" />
                      <span>Get for ₹1</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
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

export default FreeResources;
