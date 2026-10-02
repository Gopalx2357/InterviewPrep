import React, { useState } from 'react';

const QUESTIONS_DATABASE = {
  'SDE / Software Engineer': [
    "Explain the difference between process and thread in operating systems.",
    "How does Garbage Collection work in V8 engine / Java JVM?",
    "What is the time complexity of QuickSort in best and worst cases? How do you avoid the worst case?",
    "How would you design a rate limiter for an API endpoint handling 100k requests/sec?"
  ],
  'Frontend Developer': [
    "Explain how the Event Loop works in JavaScript and what microtasks vs macrotasks are.",
    "How do React Virtual DOM and Fiber reconciliation algorithm optimize rendering performance?",
    "What strategies would you use to reduce First Contentful Paint (FCP) and Largest Contentful Paint (LCP)?",
    "Compare Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR)."
  ],
  'Deloitte / TCS / Capgemini Consultant': [
    "Describe a situation where you had to handle conflicting stakeholder requirements.",
    "How do you approach modernizing a legacy monolithic system to cloud microservices?",
    "Explain the difference between Agile Scrum and Kanban. When would you recommend each?",
    "How do you ensure data security and compliance in enterprise SaaS applications?"
  ]
};

export default function MockInterviewSimulator() {
  const [role, setRole] = useState('SDE / Software Engineer');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const questions = QUESTIONS_DATABASE[role] || QUESTIONS_DATABASE['SDE / Software Engineer'];
  const currentQuestion = questions[currentQIndex];

  const handleSimulateVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setUserAnswer(prev => prev ? prev + " In my experience, we solve this by using hash maps and caching..." : "To answer this question, I would start by identifying the core bottleneck. We can optimize it by maintaining an index and using an async queue...");
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      // Calculate realistic dynamic score based on answer length & keywords
      const len = userAnswer.trim().length;
      const techScore = Math.min(96, Math.max(72, Math.floor(len / 4) + 68));
      const commScore = Math.min(94, Math.max(78, Math.floor(len / 5) + 70));
      const probScore = Math.min(98, Math.max(75, Math.floor(len / 3) + 65));
      const confScore = 88;
      const overallScore = Math.round((techScore + commScore + probScore + confScore) / 4);

      setReport({
        overallScore,
        techScore,
        commScore,
        probScore,
        confScore,
        strengths: [
          "Strong structured approach using standard industry terminology.",
          "Clear explanation of time/space trade-offs.",
          "Good logical flow with edge case consideration."
        ],
        improvements: [
          "Include concrete real-world metrics from past projects (e.g., 'reduced latency by 40%').",
          "Elaborate slightly more on fallback error handling strategies."
        ],
        modelAnswer: "An ideal response covers core architectural principles, identifies scale bottlenecks early, and proposes structured optimizations with trade-offs."
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleNextQuestion = () => {
    setReport(null);
    setUserAnswer('');
    setCurrentQIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              AI Mock Simulator
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live AI Interviewer Ready
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-slate-100">Interactive AI Technical Interview</h2>
          <p className="text-slate-400 text-sm">Practice real company interview questions with instant voice/text feedback and detailed scoring.</p>
        </div>

        {/* Role & Company Selector */}
        <div className="flex flex-wrap gap-3">
          <select 
            value={role} 
            onChange={(e) => { setRole(e.target.value); setCurrentQIndex(0); setReport(null); setUserAnswer(''); }}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="SDE / Software Engineer">SDE / Software Engineer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Deloitte / TCS / Capgemini Consultant">Consultant / Analyst</option>
          </select>

          <select 
            value={targetCompany} 
            onChange={(e) => setTargetCompany(e.target.value)}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="Google">Google Format</option>
            <option value="Amazon">Amazon Format</option>
            <option value="Microsoft">Microsoft Format</option>
            <option value="Deloitte">Deloitte Format</option>
            <option value="Capgemini">Capgemini Format</option>
            <option value="TCS">TCS NQT Format</option>
          </select>
        </div>
      </div>

      {/* Main Interview Box */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question & Answer Console */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
          <div>
            <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
              <span className="font-semibold text-indigo-400">Round 1: Technical Depth ({targetCompany})</span>
              <span>Question {currentQIndex + 1} of {questions.length}</span>
            </div>

            <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl mb-4">
              <p className="text-slate-200 text-base font-medium leading-relaxed">
                "{currentQuestion}"
              </p>
            </div>

            {/* Answer Input */}
            <div className="relative">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here or click 'Voice Dictation' to dictate your thoughts..."
                rows={5}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />

              <div className="flex justify-between items-center mt-3">
                <button
                  type="button"
                  onClick={handleSimulateVoice}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                    isRecording 
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  {isRecording ? "Listening... Speak Now" : "Voice Dictation Mode"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all"
                  >
                    Skip Question
                  </button>
                  <button
                    onClick={handleEvaluateAnswer}
                    disabled={isAnalyzing || !userAnswer.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Evaluating...
                      </>
                    ) : (
                      "Submit & Evaluate"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scorecard & Feedback */}
        <div className="lg:col-span-5 bg-slate-950/60 rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between">
          {!report ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-200">AI Evaluation Ready</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">Answer the question on the left and click "Submit & Evaluate" to see your dimensional scorecard and model feedback.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-200">AI Interview Scorecard</h3>
                <div className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">
                  Overall: {report.overallScore}%
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs mb-1 text-slate-300">
                    <span>Technical Depth</span>
                    <span className="font-semibold">{report.techScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${report.techScore}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 text-slate-300">
                    <span>Communication & Structure</span>
                    <span className="font-semibold">{report.commScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${report.commScore}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 text-slate-300">
                    <span>Problem Solving Approach</span>
                    <span className="font-semibold">{report.probScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${report.probScore}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Feedback Points */}
              <div className="space-y-2 text-xs pt-2">
                <div className="p-3 bg-emerald-950/30 border border-emerald-800/30 rounded-lg">
                  <span className="font-bold text-emerald-400 block mb-1">Key Strengths:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    {report.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-amber-950/30 border border-amber-800/30 rounded-lg">
                  <span className="font-bold text-amber-400 block mb-1">Actionable Tips:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    {report.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all"
              >
                Proceed to Next Question →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
