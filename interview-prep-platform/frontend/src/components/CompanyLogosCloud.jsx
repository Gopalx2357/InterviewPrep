import React from 'react';

const LOGOS = [
  { name: 'Google', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', color: '#4285F4', website: 'https://www.google.com' },
  { name: 'Amazon', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg', color: '#FF9900', website: 'https://www.amazon.jobs' },
  { name: 'Microsoft', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg', color: '#00A4EF', website: 'https://www.microsoft.com' },
  { name: 'TCS (Tata)', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tata.svg', color: '#003399', website: 'https://www.tcs.com' },
  { name: 'Infosys', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/infosys.svg', color: '#007CC3', website: 'https://www.infosys.com' },
  { name: 'Accenture', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg', color: '#A100FF', website: 'https://www.accenture.com' },
  { name: 'Deloitte', isCustom: true, type: 'deloitte', website: 'https://www.deloitte.com' },
  { name: 'Wipro', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wipro.svg', color: '#000000', website: 'https://www.wipro.com' },
  { name: 'Cognizant', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cognizant.svg', color: '#0033A0', website: 'https://www.cognizant.com' },
  { name: 'IBM', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg', color: '#1F70C1', website: 'https://www.ibm.com' },
  { name: 'Oracle', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg', color: '#F80000', website: 'https://www.oracle.com' },
  { name: 'Goldman Sachs', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/goldmansachs.svg', color: '#7399C6', website: 'https://www.goldmansachs.com' },
  { name: 'Cisco', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg', color: '#1BA0D7', website: 'https://www.cisco.com' },
  { name: 'Capgemini', isCustom: true, type: 'capgemini', website: 'https://www.capgemini.com' },
  { name: 'Adobe', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg', color: '#FF0000', website: 'https://www.adobe.com' },
  { name: 'Samsung', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/samsung.svg', color: '#1428A0', website: 'https://www.samsung.com' },
];

const renderCustomBrand = (type) => {
  if (type === 'deloitte') {
    return (
      <div className="flex items-center gap-1 font-extrabold text-slate-900 tracking-tight text-sm">
        <span>Deloitte</span>
        <span className="w-2 h-2 rounded-full bg-[#86BC25] inline-block -ml-0.5"></span>
      </div>
    );
  }
  if (type === 'capgemini') {
    return (
      <div className="flex items-center gap-1.5 font-bold text-[#0070AD] text-xs">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0070AD">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        <span className="tracking-tight font-extrabold">Capgemini</span>
      </div>
    );
  }
  return null;
};

const CompanyLogosCloud = () => {
  const doubleLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="bg-white py-8 border-y border-slate-200/80 overflow-hidden relative group">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5">
        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
          16+ Official Tech Giant Hiring Partners • Click Any Logo To Visit Official Website
        </p>
      </div>

      {/* Gradient Fades on Left & Right Edge */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Infinite Slow Moving Marquee Container */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-slow flex items-center gap-6">
          {doubleLogos.map((company, index) => (
            <a
              key={index}
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-50 hover:bg-blue-50/80 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex items-center gap-2.5 min-w-[150px] h-14 shrink-0 group/card cursor-pointer"
              title={`Visit Official ${company.name} Website (${company.website})`}
            >
              {company.isCustom ? (
                renderCustomBrand(company.type)
              ) : (
                <>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center p-1.5 shrink-0 shadow-xs"
                    style={{ backgroundColor: `${company.color}15`, color: company.color }}
                  >
                    <img
                      src={company.url}
                      alt={company.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter group-hover/card:scale-110 transition-transform"
                      style={{
                        filter: company.color === '#000000' ? 'none' : `drop-shadow(0px 0px 1px ${company.color})`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover/card:text-blue-600 tracking-tight transition-colors">
                    {company.name}
                  </span>
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogosCloud;
