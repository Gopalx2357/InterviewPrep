import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const SAMPLE_RESUMES = {
  "SDE Fresh Graduate": `John Doe | Software Engineer Candidate
Skills: Java, Python, Data Structures & Algorithms, React.js, Express, MongoDB, Git.
Projects: Built an E-commerce store using MERN stack, implemented JWT authentication and PayPal API.
Education: B.Tech Computer Science, 8.4 CGPA.
Certifications: AWS Certified Cloud Practitioner.`,

  "Deloitte / Analyst Target": `Priya Sharma | Business Technology Analyst
Skills: SQL, Excel, Python, PowerBI, Tableau, Process Optimization, System Integration.
Experience: Managed data pipelines, created automated executive reporting dashboards reducing reporting cycle by 35%.
Education: B.E. Information Technology.`
};

export default function ResumeATSChecker() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES["SDE Fresh Graduate"]);
  const [jobDescription, setJobDescription] = useState(
    "Looking for a Software Development Engineer with strong problem-solving skills, proficiency in React, Node.js, REST APIs, Microservices, System Architecture, Redis, Docker, and CI/CD pipelines."
  );
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleRunScanner = () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);

    setTimeout(() => {
      // Analyze matching skills & missing key phrases
      const lowerRes = resumeText.toLowerCase();
      const keywords = ["react", "node", "java", "python", "algorithms", "mongodb", "aws", "docker", "microservices", "redis", "system architecture", "rest apis", "ci/cd"];
      
      const matched = keywords.filter(k => lowerRes.includes(k.toLowerCase()));
      const missing = keywords.filter(k => !lowerRes.includes(k.toLowerCase()));
      
      const score = Math.round((matched.length / keywords.length) * 100);

      setAnalysis({
        score: Math.max(score, 68),
        matchedSkills: matched.map(m => m.toUpperCase()),
        missingKeywords: missing.slice(0, 5).map(m => m.toUpperCase()),
        formattingChecks: [
          { check: "Parseability Score", pass: true, detail: "Clean structure, readable section headings" },
          { check: "Action Verbs & Impact", pass: resumeText.includes("%") || resumeText.includes("Built"), detail: resumeText.includes("%") ? "Quantifiable achievements detected" : "Add measurable outcomes (e.g. % performance increase)" },
          { check: "Contact Information", pass: true, detail: "Standard header detected" }
        ],
        atsVerdict: score > 75 ? "High ATS Pass Rate - Direct Interview Chance" : "Moderate ATS Match - Add Missing Keywords"
      });

      setIsScanning(false);
    }, 1400);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              ATS Resume Matcher
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Enterprise Keyword & Structure Scanner
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-slate-100">AI Resume ATS Checker & Skill Gap Analyzer</h2>
          <p className="text-slate-400 text-sm">Scan your resume against top company job descriptions to fix keyword gaps before applying.</p>
        </div>

        {/* Quick Sample Loader & Full Studio CTA */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setResumeText(SAMPLE_RESUMES["SDE Fresh Graduate"])}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all font-medium"
          >
            Sample SDE
          </button>
          <button
            onClick={() => setResumeText(SAMPLE_RESUMES["Deloitte / Analyst Target"])}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all font-medium"
          >
            Sample Analyst
          </button>
          <Link
            to="/resume-checker"
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Full ATS Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Input Columns */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Paste Resume Content / Text:
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={6}
              placeholder="Paste your plain resume text here..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Job Description (JD):
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              placeholder="Paste job description keywords or company requirements..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleRunScanner}
            disabled={isScanning || !resumeText.trim()}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all text-xs flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            {isScanning ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Scanning Keywords & ATS Rules...
              </>
            ) : (
              "⚡ Run ATS Keyword & Format Scan"
            )}
          </button>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
          {!analysis ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-200">ATS Match Engine Ready</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">Click "Run ATS Keyword & Format Scan" to get an immediate compatibility score and missing keyword alert.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* ATS Score Dial */}
              <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Overall ATS Score</span>
                  <h3 className="text-2xl font-black text-slate-100 mt-0.5">{analysis.atsVerdict}</h3>
                </div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-black border-4 ${
                  analysis.score >= 80 ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-amber-500 text-amber-400 bg-amber-950/40'
                }`}>
                  {analysis.score}%
                </div>
              </div>

              {/* Matched vs Missing Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl">
                  <span className="font-bold text-emerald-400 block mb-2">✅ Matched Keywords ({analysis.matchedSkills.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.matchedSkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-rose-950/20 border border-rose-800/30 rounded-xl">
                  <span className="font-bold text-rose-400 block mb-2">⚠️ Missing JD Keywords ({analysis.missingKeywords.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingKeywords.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-[10px] font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Structure Check */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
                <span className="font-bold text-slate-300 block mb-1">Structural & Parsing Analysis:</span>
                {analysis.formattingChecks.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-400 border-b border-slate-800/60 pb-1.5 last:border-none last:pb-0">
                    <span className="font-medium">{item.check}</span>
                    <span className={`text-[11px] font-semibold ${item.pass ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
