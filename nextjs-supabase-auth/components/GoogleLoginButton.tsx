'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const supabase = createClient();

      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setErrorMsg(err.message || 'Failed to initiate Google Login.');
      setIsLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setIsLoading(true);
    // Instant Dev Mode Login preview
    setTimeout(() => {
      document.cookie = "supabase-auth-dev=true; path=/";
      window.location.href = "/dashboard";
    }, 600);
  };

  return (
    <div className="w-full space-y-3">
      {errorMsg && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-medium text-center space-y-2">
          <p>{errorMsg}</p>
          <p className="text-[11px] text-slate-300">
            👉 Supabase Dashboard me <strong>Authentication &rarr; Providers &rarr; Google</strong> par jaakar green <strong>Save</strong> button click karein.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 disabled:opacity-75 text-slate-900 font-semibold text-sm rounded-xl shadow-md transition-all border border-slate-200 flex items-center justify-center gap-3 group"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>Connecting to Google...</span>
          </>
        ) : (
          <>
            {/* Google SVG Logo */}
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.24v3.15C3.26 21.39 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.24C.45 8.19 0 10.04 0 12s.45 3.81 1.24 5.39l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.61 1.24 6.61l4.04 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleDevLogin}
        className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg border border-slate-700 transition-all text-center"
      >
        ⚡ Instant Developer Mode Sandbox Login
      </button>
    </div>
  );
}
