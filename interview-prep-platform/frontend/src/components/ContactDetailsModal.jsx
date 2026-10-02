import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserCheck, Phone, GraduationCap, ShieldCheck, Award, X } from 'lucide-react';

const ContactDetailsModal = () => {
  const { user, updateContactDetails } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [officialName, setOfficialName] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Show modal if user is logged in but missing officialName, phone, or college
    if (user) {
      const isRandomOrEmailName = !user.officialName && (!user.name || user.name.includes('@') || user.name.length < 3);
      const isMissingContact = !user.phone || !user.officialName || !user.college;

      // Check if user has explicitly dismissed this session
      const dismissedSession = sessionStorage.getItem(`dismissed_contact_${user._id}`);

      if ((isMissingContact || isRandomOrEmailName) && !dismissedSession) {
        setOfficialName(user.officialName || user.name || '');
        setPhone(user.phone || '');
        setCollege(user.college || '');
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!officialName.trim() || officialName.trim().length < 3) {
      setError('Please enter your complete official full name (at least 3 characters).');
      return;
    }
    if (!college.trim() || college.trim().length < 3) {
      setError('Please enter your College or University name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile contact number.');
      return;
    }

    setError('');
    updateContactDetails({
      officialName: officialName.trim(),
      phone: phone.trim(),
      college: college.trim(),
    });
    setIsOpen(false);
  };

  const handleDismiss = () => {
    if (user?._id) {
      sessionStorage.setItem(`dismissed_contact_${user._id}`, 'true');
    }
    setIsOpen(false);
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 relative">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase rounded-full tracking-wider">
                Official Verification
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Candidate Details & College Info</h3>
            </div>
          </div>
          <p className="text-xs text-blue-100 mt-2 leading-relaxed">
            Please provide your official full name, college/university name, and contact number for correct certificate issuance & campus placement updates.
          </p>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-medium">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-600" />
              Official Full Name (for Certificates)
            </label>
            <input
              type="text"
              value={officialName}
              onChange={(e) => setOfficialName(e.target.value)}
              placeholder="e.g. Rahul Yadav"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs text-slate-900 font-medium"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              This exact name will be printed on all your verified completion certificates.
            </span>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              College / University Name
            </label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. GL Bajaj / IIT Delhi / LPU / SRM"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs text-slate-900 font-medium"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Your college tier & campus name for student placement analytics.
            </span>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" />
              Mobile / WhatsApp Contact Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-slate-900 font-medium"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Used for placement drive notifications & certificate verification.
            </span>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDismiss}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Save Profile & College Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetailsModal;
