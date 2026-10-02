import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toast, showToast } = useContext(AuthContext);

  if (!toast) return null;

  const bgColors = {
    success: 'bg-emerald-900/90 border-emerald-500 text-white',
    error: 'bg-rose-900/90 border-rose-500 text-white',
    info: 'bg-slate-900/90 border-slate-700 text-white',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-md">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all ${
          bgColors[toast.type] || bgColors.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium pr-2">{toast.message}</p>
        <button
          onClick={() => showToast(null)}
          className="ml-auto text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
