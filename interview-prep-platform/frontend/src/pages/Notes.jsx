import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import { Search, Filter, SlidersHorizontal, BookOpen, Loader2, PlusCircle, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'All',
  'DSA',
  'C++',
  'Java',
  'JavaScript',
  'React',
  'Node.js',
  'SQL',
  'DBMS',
  'Operating System',
  'Computer Networks',
  'System Design',
  'Aptitude',
  'HR Interview',
  'Web Development',
  'AI/ML',
  'Data Analytics',
];

const Notes = () => {
  const { isAdmin } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('latest');

  const fetchNotes = async () => {
    setLoading(true);
    try {
      let url = `/notes?search=${encodeURIComponent(search)}`;
      if (selectedCategory !== 'All') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (sortOption === 'price-low') {
        url += '&sort=price-low';
      } else if (sortOption === 'price-high') {
        url += '&sort=price-high';
      }

      const res = await API.get(url);
      let data = res.data;

      // Apply price filter client-side if selected
      if (priceFilter === 'free') {
        data = data.filter((n) => n.price === 0);
      } else if (priceFilter === 're1') {
        data = data.filter((n) => n.price === 1);
      } else if (priceFilter === 'under99') {
        data = data.filter((n) => n.price <= 99);
      } else if (priceFilter === '99to149') {
        data = data.filter((n) => n.price >= 99 && n.price <= 149);
      }

      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotes();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedCategory, priceFilter, sortOption]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Study Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interview & Subject Notes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Handwritten formulas, algorithm breakdowns, and topic cheat sheets for placement exams.
          </p>
        </div>

        {/* Admin Quick Action Banner */}
        {isAdmin && (
          <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl shadow-lg border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-base text-white">Admin Portal</h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">
                  Upload new subject notes (Google Drive PDF / local file) or manage catalog.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Link
                to="/admin/upload"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-blue-500/30 whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Upload New Note</span>
              </Link>
              <Link
                to="/admin/notes"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all whitespace-nowrap"
              >
                <span>Manage Notes</span>
              </Link>
            </div>
          </div>
        )}

        {/* All-Access Pass Banner (Sab Kuch Access @ ₹149) */}
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl shadow-xl shadow-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-950">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-black text-base text-slate-950">Unlock ALL Notes & OA Kits (Sab Kuch Access)</h3>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-950 text-amber-400">
                  Flat ₹149 Only
                </span>
              </div>
              <p className="text-xs text-slate-900 font-medium mt-0.5">
                Get full permanent access to all DSA, System Design, React & technical notes + all company kits for just ₹149!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-all-access-modal'))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:scale-105"
          >
            <span>Get All-Access @ ₹149</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes by title, topic, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Price Filter */}
            <div className="sm:col-span-3">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800"
              >
                <option value="all">All Prices (Max ₹149)</option>
                <option value="re1">🔥 ₹1 Special Test Kit</option>
                <option value="free">Free Notes</option>
                <option value="under99">Under ₹99</option>
                <option value="99to149">₹99 - ₹149 (Max)</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="sm:col-span-3">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800"
              >
                <option value="latest">Sort: Newest First</option>
                <option value="price-low">Sort: Price Low to High</option>
                <option value="price-high">Sort: Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 custom-scrollbar">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0 uppercase tracking-wider pr-1">
              Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading notes catalog...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto my-12 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No notes found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search query or clearing category filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setPriceFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
