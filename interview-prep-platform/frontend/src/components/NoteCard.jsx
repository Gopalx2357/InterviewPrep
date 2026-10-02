import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2, Tag } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const NoteCard = ({ note }) => {
  const { user } = useContext(AuthContext);
  const isUserAdmin = user?.role === 'admin' || (user?.email && user.email.toLowerCase() === 'gopal.x235@gmail.com');
  const isUnlocked = note.isPurchased || isUserAdmin;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Thumbnail Header */}
      <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {note.thumbnail ? (
          <img
            src={note.thumbnail}
            alt={note.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1516116211223-4c7141467477?w=600&auto=format&fit=crop&q=60';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center text-slate-400">
            <FileText className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-sm">
          <Tag className="w-3 h-3 text-blue-400" />
          <span>{note.category}</span>
        </div>

        {isUnlocked && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isUserAdmin ? 'Admin Free' : 'Unlocked'}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {note.title}
        </h3>

        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
          {note.description}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            {note.pages || 1} Pages
          </span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Digital PDF</span>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              {note.price === 0 ? 'FREE' : `₹${note.price}`}
            </span>
          </div>

          <Link
            to={`/notes/${note._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl transition-all shadow-sm"
          >
            <span>{isUnlocked ? (isUserAdmin ? 'Access Note (Admin)' : 'Access Note') : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
