import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from '@/components/LogoutButton';
import { User, Mail, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = createClient();

  // 1. Authenticate user on Server Side
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // 2. Query RLS protected profiles table for user identity
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const fullName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'Authenticated User';
  const email = profile?.email || user.email || '';
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const createdAt = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'Today';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation / Header Bar */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Protected User Dashboard</h1>
              <p className="text-xs text-slate-400">Server-Side Authenticated with Supabase Auth</p>
            </div>
          </div>

          <LogoutButton />
        </div>

        {/* User Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
            {/* Avatar Image or Initials Fallback */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full border-4 border-indigo-500/30 shadow-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Google Identity</span>
              </div>
              <h2 className="text-2xl font-black text-white">{fullName}</h2>
              <p className="text-slate-400 text-sm">{email}</p>
            </div>
          </div>

          {/* Identity & Metadata Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Full Name
              </span>
              <p className="text-sm font-bold text-slate-200">{fullName}</p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                Primary Email
              </span>
              <p className="text-sm font-bold text-slate-200">{email}</p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Supabase User ID (UUID)
              </span>
              <p className="text-xs font-mono text-slate-300 truncate">{user.id}</p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Account Member Since
              </span>
              <p className="text-sm font-bold text-slate-200">{createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
