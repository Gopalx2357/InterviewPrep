import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Zap, CheckCircle2 } from 'lucide-react';

const RECENT_PURCHASES = [
  {
    name: 'Rahul Y.',
    location: 'Delhi NCR',
    item: 'Sab Kuch All-Access Pass (Everything Unlocked)',
    price: '₹149',
    time: 'Just now',
  },
  {
    name: 'Priya S.',
    location: 'Bangalore',
    item: 'Ultimate DSA & Algorithms Handbook',
    price: '₹99',
    time: '2 mins ago',
  },
  {
    name: 'Ankit M.',
    location: 'Pune',
    item: 'Amazon SDE-1 OA Prep Kit',
    price: '₹149',
    time: '4 mins ago',
  },
  {
    name: 'Sneha K.',
    location: 'Hyderabad',
    item: 'Sab Kuch All-Access Pass (Everything Unlocked)',
    price: '₹149',
    time: '6 mins ago',
  },
  {
    name: 'Vikas R.',
    location: 'Chennai',
    item: 'TCS NQT Ninja & Digital Package',
    price: '₹99',
    time: '7 mins ago',
  },
  {
    name: 'Aarav N.',
    location: 'Noida',
    item: 'System Design Interview Playbook',
    price: '₹149',
    time: '9 mins ago',
  },
  {
    name: 'Kavya B.',
    location: 'Kolkata',
    item: 'Google Online Challenge (GOC) Kit',
    price: '₹149',
    time: '11 mins ago',
  },
  {
    name: 'Rohan P.',
    location: 'Ahmedabad',
    item: 'Sab Kuch All-Access Pass (Everything Unlocked)',
    price: '₹149',
    time: '13 mins ago',
  },
];

const PurchaseTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      // Hide briefly then switch to next purchase item
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setVisible(true);
      }, 500);
    }, 9000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-xl shadow-slate-900/10 flex items-start gap-3 relative overflow-hidden group">
        {/* Highlight accent line */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600"></div>

        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
        </div>

        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
            <span>{current.name}</span>
            <span className="text-slate-400 font-normal">({current.location})</span>
          </div>

          <p className="text-xs font-semibold text-slate-900 line-clamp-1 mt-0.5">
            Purchased <span className="text-blue-600 font-bold">{current.item}</span>
          </p>

          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
            <span className="font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              {current.price} Verified
            </span>
            <span>•</span>
            <span className="text-slate-400">{current.time}</span>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          title="Dismiss popup notifications"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default PurchaseTicker;
