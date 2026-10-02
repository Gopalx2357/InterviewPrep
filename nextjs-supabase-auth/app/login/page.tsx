import GoogleLoginButton from '@/components/GoogleLoginButton';
import { ShieldCheck, Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Centered Auth Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mt-4">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-xs font-normal">
            Sign in with your verified Google account to access your secure profile dashboard.
          </p>
        </div>

        {/* OAuth Button Container */}
        <div className="pt-2">
          <GoogleLoginButton />
        </div>

        {/* Security Assurance Badge */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-bit OAuth 2.0 Encrypted Auth & RLS Protected</span>
        </div>
      </div>
    </div>
  );
}
