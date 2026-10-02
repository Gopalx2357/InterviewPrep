import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, CheckCircle2, Briefcase, Award } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LOGO_MAP = {
  'TCS (Tata Consultancy Services)': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tata.svg',
  'Amazon': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg',
  'Google': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg',
  'Infosys': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/infosys.svg',
  'Microsoft': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg',
  'Accenture': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg',
  'Deloitte': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/deloitte.svg',
  'Wipro': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wipro.svg',
  'Cognizant': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cognizant.svg',
  'Goldman Sachs': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/goldmansachs.svg',
};

const CompanyCard = ({ company }) => {
  const { user } = useContext(AuthContext);
  const isUserAdmin = user?.role === 'admin' || (user?.email && user.email.toLowerCase() === 'gopal.x235@gmail.com');
  const isUnlocked = company.isPurchased || isUserAdmin;

  const logoUrl = LOGO_MAP[company.name] || company.logo || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/building.svg';

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Header Banner & Logo */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white relative">
        <div className="flex items-start justify-between gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-3 shadow-md flex items-center justify-center shrink-0 border border-slate-100 relative overflow-hidden">
            <img
              src={logoUrl}
              alt={company.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          {isUnlocked ? (
            <span className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isUserAdmin ? 'Admin Free' : 'Purchased'}</span>
            </span>
          ) : (
            <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>OA Kit</span>
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
            {company.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-blue-200 font-medium mt-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{company.role}</span>
          </div>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {company.description}
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
              Online Assessment Summary:
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
              {company.oaDetails?.details || company.oaDetails?.aptitude || 'Comprehensive aptitude, MCQs, and coding rounds prep.'}
            </p>
          </div>
        </div>

        {/* Footer Price & CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium uppercase tracking-wider">
              Package Price
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {company.price === 0 ? 'FREE' : `₹${company.price}`}
            </span>
          </div>

          <Link
            to={`/companies/${company._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20"
          >
            <span>{isUnlocked ? (isUserAdmin ? 'Access (Admin)' : 'Access Content') : 'View Preparation'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
