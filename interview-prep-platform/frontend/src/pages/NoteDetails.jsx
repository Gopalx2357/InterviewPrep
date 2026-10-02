import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import FeedbackSection from '../components/FeedbackSection';
import PaymentModal from '../components/PaymentModal';
import PdfViewerModal from '../components/PdfViewerModal';
import {
  BookOpen,
  FileText,
  CheckCircle2,
  Lock,
  Download,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Tag,
  Clock,
  Sparkles,
} from 'lucide-react';

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, showToast } = useContext(AuthContext);

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  const fetchNoteDetails = async () => {
    try {
      const res = await API.get(`/notes/${id}`);
      setNote(res.data);
    } catch (error) {
      console.error('Error loading note details:', error);
      showToast('Note not found or server error.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoteDetails();
  }, [id]);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const isUserAdmin = user?.role === 'admin' || (user?.email && user.email.toLowerCase() === 'gopal.x235@gmail.com');

  const handleBuyNow = async () => {
    if (!user) {
      showToast('Please log in to purchase resources', 'info');
      navigate('/login', { state: { from: { pathname: `/notes/${id}` } } });
      return;
    }

    if (isUserAdmin) {
      showToast('Admin Free Access Granted! Opening PDF...', 'success');
      setPdfModalOpen(true);
      return;
    }

    setPurchasing(true);
    try {
      const res = await API.post('/payments/create-order', {
        noteId: note._id,
        itemType: 'note',
      });

      if (res.data.isFree) {
        showToast(res.data.message, 'success');
        fetchNoteDetails();
        setPurchasing(false);
        return;
      }

      const { orderId, amount, currency, keyId, itemTitle } = res.data;

      // Check if real Razorpay Key is provided
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
        // Open custom Razorpay Test Payment Modal
        setOrderData({ orderId, amount, currency, keyId, itemTitle });
        setPaymentModalOpen(true);
        setPurchasing(false);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message;
      if (errMsg && errMsg.toLowerCase().includes('already purchased')) {
        showToast('You already own this note! Opening PDF...', 'success');
        setPdfModalOpen(true);
        setPurchasing(false);
        return;
      }
      console.error('Purchase error:', error);
      showToast(errMsg || 'Order creation failed.', 'error');
      setPurchasing(false);
    }
  };

  const handlePaymentVerification = async (paymentDetails) => {
    setPurchasing(true);
    try {
      const verifyRes = await API.post('/payments/verify', {
        ...paymentDetails,
        noteId: note._id,
        itemType: 'note',
      });

      if (verifyRes.data.success) {
        showToast('Payment successful! Access granted to notes.', 'success');
        fetchNoteDetails();
      }
    } catch (verifyErr) {
      console.error('Verification error:', verifyErr);
      showToast('Payment verification failed. Contact support.', 'error');
    } finally {
      setPurchasing(false);
    }
  };

  const handleDownloadPdf = () => {
    setPdfModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-xl font-bold text-slate-800">Note Not Found</h2>
        <Link to="/notes" className="text-sm font-semibold text-blue-600 hover:underline">
          Back to Notes Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/notes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notes</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                  {note.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {note.pages} Pages • Digital PDF Resource
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {note.title}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {note.description}
              </p>

              {/* What You'll Learn */}
              {note.whatYouWillLearn && note.whatYouWillLearn.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>What You'll Learn & Key Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {note.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Resource Preview</h3>
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-8 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-200">
                    High-resolution PDF document with clear diagrams and structured code snippets.
                  </p>
                  <p className="text-xs text-slate-400">
                    {note.isPurchased
                      ? 'Full resource unlocked for your account.'
                      : 'Purchase this note to unlock the full un-watermarked PDF download.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews / Feedback */}
            <FeedbackSection targetType="note" targetId={note._id} />
          </div>

          {/* Sidebar Purchase Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl sticky top-24 space-y-6">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 relative">
                {note.thumbnail ? (
                  <img
                    src={note.thumbnail}
                    alt={note.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <BookOpen className="w-12 h-12" />
                  </div>
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price</span>
                <div className="text-3xl font-black text-slate-900 mt-0.5">
                  {note.price === 0 ? 'FREE' : `₹${note.price}`}
                </div>
              </div>

              {note.isPurchased || isUserAdmin ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isUserAdmin ? 'Admin Free Access Granted' : 'Unlocked & Purchased'}</span>
                    </span>
                    {isUserAdmin && (
                      <Link to="/admin/notes" className="text-blue-600 hover:underline font-bold text-[11px]">
                        Edit Note
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={handleDownloadPdf}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isUserAdmin ? 'Read / Access PDF (Admin Free)' : 'Download / Access PDF'}</span>
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
                  <span>Verified Razorpay Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Lifetime Unlimited Access</span>
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

      <PdfViewerModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={note?.pdfUrl || '/uploads/notes/test_1rupee_handbook.pdf'}
        title={note?.title}
      />
    </div>
  );
};

export default NoteDetails;
