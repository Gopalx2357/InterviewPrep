import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ProfileEditModal from './ProfileEditModal';
import {
  BookOpen,
  Building2,
  LayoutDashboard,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Sparkles,
  Download,
  Code,
  Mic,
  Edit3,
  HelpCircle,
  FileCheck2,
  PlusCircle,
  Sun,
  Moon,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/logo.png?v=2"
                alt="InterviewPrep Logo"
                className="w-10 h-10 rounded-full object-cover shadow-md shadow-blue-500/20 ring-2 ring-blue-500/20 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-lg font-black bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
                  InterviewPrep
                </span>
                <span className="text-[8px] font-extrabold tracking-wider text-amber-600 dark:text-amber-400 uppercase leading-none mt-0.5">
                  Learn • Practice • Get Hired
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive('/')
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Home
              </Link>

              <Link
                to="/notes"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive('/notes')
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Notes
              </Link>

              <Link
                to="/companies"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive('/companies')
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                Companies
              </Link>

              <Link
                to="/free-resources"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive('/free-resources')
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Cheat Sheets</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 leading-none">
                  ₹1
                </span>
              </Link>

              <Link
                to="/resume-checker"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive('/resume-checker')
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Resume ATS</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 leading-none">
                  Free
                </span>
              </Link>

              {/* All-Access Pass (Sab Kuch Access @ ₹149) */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-all-access-modal'))}
                className="px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 shadow-md shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
                title="Unlock All Notes, Company OAs, ATS Checker & Certificate for ₹149"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>All-Access Pass ₹149</span>
              </button>

              {user && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isActive('/dashboard') || isActive('/my-purchases')
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              {/* Day / Night Mode Switcher Button - ONLY Symbol */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl transition-all border shadow-sm flex items-center justify-center shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 hover:scale-105 active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-300 dark:border-slate-700 select-none"
                title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400/30 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 fill-slate-700/30 transition-transform duration-300 -rotate-12 hover:rotate-0" />
                )}
              </button>

              {isAdmin && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <Link
                    to="/admin/upload"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                    title="Upload Notes or Company Packages"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Upload Notes</span>
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all flex items-center gap-1 whitespace-nowrap shadow-sm"
                    title="Super Admin Control Panel"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Admin</span>
                  </Link>
                </div>
              )}

              {user ? (
                <div className="flex items-center gap-2">
                  {/* Clickable Profile Badge with Avatar */}
                  <button
                    onClick={() => setProfileModalOpen(true)}
                    className="group flex items-center gap-2 pl-2.5 border-l border-slate-200 dark:border-slate-800 hover:opacity-90 transition-all cursor-pointer text-left shrink-0"
                    title="Click to edit profile & photo"
                  >
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = 'flex';
                            }
                          }}
                          className="w-8 h-8 rounded-full object-cover border-2 border-blue-600 shadow-sm"
                        />
                      ) : null}

                      {(!user.avatar || true) && (
                        <div
                          style={{ display: user.avatar ? 'none' : 'flex' }}
                          className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-black items-center justify-center text-xs shadow-sm uppercase"
                        >
                          {(user.officialName || user.name || user.email || 'U').trim().charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center border border-white dark:border-slate-900">
                        <Edit3 className="w-2 h-2" />
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-[95px] xl:max-w-[125px] whitespace-nowrap">
                        {user.officialName || (user.name && !user.name.includes('@') ? user.name : user.email?.split('@')[0])}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium leading-none">Edit Profile</span>
                    </div>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1 shrink-0 whitespace-nowrap"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all hover:shadow-md whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions: Day/Night Toggle + Menu Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl transition-all border shadow-sm flex items-center justify-center shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 hover:scale-105 active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-300 dark:border-slate-700 select-none"
                title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 fill-slate-700/30" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
            {/* Quick Day/Night Switcher in Drawer - ONLY Symbol */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            >
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 fill-slate-700/30" />
                )}
                <span>Appearance</span>
              </div>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-700 fill-slate-700" />
                )}
              </div>
            </button>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Home
            </Link>
            <Link
              to="/notes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Notes
            </Link>
            <Link
              to="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Companies
            </Link>
            <a
              href="/#why-join-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Why Join Us (About)
            </a>
            <Link
              to="/free-resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
            >
              ₹1 Cheat Sheets
            </Link>
            <Link
              to="/resume-checker"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium flex items-center justify-between ${
                isActive('/resume-checker') ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Resume ATS Score</span>
              </div>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                Free
              </span>
            </Link>

            {/* All-Access Pass (Sab Kuch Access @ ₹149) Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-all-access-modal'));
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-base font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-md flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>⭐ All-Access Pass (Sab Kuch)</span>
              </div>
              <span className="text-xs bg-slate-950 text-amber-300 font-bold px-2 py-0.5 rounded-lg">
                ₹149
              </span>
            </button>

            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                Dashboard
              </Link>
            )}
            {isAdmin && (
              <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <Link
                  to="/admin/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <PlusCircle className="w-5 h-5 text-blue-200" />
                  <span>+ Upload Notes / OA Kits</span>
                </Link>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                >
                  <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Profile Edit Modal */}
      <ProfileEditModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </>
  );
};

export default Navbar;

