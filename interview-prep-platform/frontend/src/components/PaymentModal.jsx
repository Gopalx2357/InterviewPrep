import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Smartphone, Building2, CheckCircle2, Lock, X, Loader2 } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, orderData, onPaymentSuccess, user }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !orderData) return null;

  const amountInRupees = (orderData.amount / 100).toFixed(2);

  const handleSimulatePayment = async () => {
    setProcessing(true);
    setTimeout(async () => {
      await onPaymentSuccess({
        razorpay_order_id: orderData.orderId,
        razorpay_payment_id: 'pay_rzp_test_' + Date.now(),
        razorpay_signature: 'verified_signature_' + Date.now(),
      });
      setProcessing(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-md w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-xs text-white border border-white/20">
              RZP
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Razorpay Secure Checkout
            </span>
          </div>

          <h3 className="text-lg font-bold text-white line-clamp-1">
            {orderData.itemTitle}
          </h3>

          <div className="mt-4 flex items-baseline justify-between pt-3 border-t border-white/15">
            <span className="text-xs text-blue-100 font-medium">Total Amount Due</span>
            <span className="text-2xl font-black text-white">₹{amountInRupees}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Select Payment Method
            </label>

            {/* UPI Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('upi')}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                selectedMethod === 'upi'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">UPI / GPay / PhonePe / Paytm</div>
                  <div className="text-[11px] text-slate-500">Instant approval test payment</div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'upi' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'upi' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>

            {/* Card Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                selectedMethod === 'card'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Credit / Debit Card</div>
                  <div className="text-[11px] text-slate-500">Visa, Mastercard, RuPay</div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'card' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>

            {/* Netbanking Option */}
            <button
              type="button"
              onClick={() => setSelectedMethod('netbanking')}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                selectedMethod === 'netbanking'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Net Banking</div>
                  <div className="text-[11px] text-slate-500">All major Indian Banks</div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'netbanking' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'netbanking' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span>Customer:</span>
              <span className="font-bold text-slate-800">{user?.email || 'Candidate'}</span>
            </div>
            <div className="flex items-center justify-between font-medium">
              <span>Status:</span>
              <span className="font-bold text-emerald-600">Ready to Pay ₹{amountInRupees}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSimulatePayment}
            disabled={processing}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Pay ₹{amountInRupees} Now</span>
              </>
            )}
          </button>

          <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            <span>256-Bit SSL Encrypted Razorpay Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
