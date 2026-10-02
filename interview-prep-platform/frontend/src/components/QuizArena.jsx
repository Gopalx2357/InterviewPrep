import React, { useState, useEffect, useContext } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, ArrowRight, ShieldAlert, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const QUIZ_QUESTIONS = [
  {
    question: 'What is the time complexity of searching an element in a Balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct: 1,
    explanation: 'In a balanced BST (like AVL or Red-Black Tree), height is log N. Thus search complexity is O(log N).',
  },
  {
    question: 'TCS NQT Pseudocode: What will be output of `int a=5, b=10; a = a^b; b = a^b; a = a^b;`?',
    options: ['a=5, b=10', 'a=10, b=5', 'a=15, b=15', 'Compilation Error'],
    correct: 1,
    explanation: 'XOR operations swap two variables without extra space. Thus a becomes 10 and b becomes 5.',
  },
  {
    question: 'In Relational Database (SQL), which normal form guarantees NO transitive functional dependencies?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correct: 2,
    explanation: '3NF (Third Normal Form) requires 2NF compliance + no transitive dependencies (X -> Y and Y -> Z).',
  },
];

const QuizArena = () => {
  const { showToast } = useContext(AuthContext);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  // Block Copy, Cut, Paste, Right Click and Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (
        (isCmdOrCtrl && (key === 'c' || key === 'v' || key === 'x' || key === 'u' || key === 'a')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        triggerCopyWarning();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerCopyWarning = () => {
    setWarningMsg('⚠️ Copy-Paste & Right Click are strictly disabled during Online Assessment (OA) for exam integrity.');
    if (showToast) {
      showToast('⚠️ Copy-Paste & Right Click are disabled in Online Assessment (OA) mode!', 'error');
    }
    setTimeout(() => setWarningMsg(''), 4000);
  };

  const handlePreventAction = (e) => {
    e.preventDefault();
    triggerCopyWarning();
  };

  const handleSelectOption = (idx) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    if (idx === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
  };

  return (
    <div
      onCopy={handlePreventAction}
      onCut={handlePreventAction}
      onPaste={handlePreventAction}
      onContextMenu={handlePreventAction}
      className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 select-none relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Placement Challenge</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <span>Daily OA Practice Quiz Arena</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-bold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Copy-Paste Disabled
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
          <Trophy className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-900">
            Score: {score} / {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Copy Warning Toast Banner */}
      {warningMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 animate-bounce shadow-sm">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* Question Card */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 select-none">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Lock className="w-3 h-3 text-rose-500" /> Anti-Cheating Mode Active
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-900 leading-snug select-none">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {currentQ.options.map((opt, optionIdx) => {
            let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400';

            if (answered) {
              if (optionIdx === currentQ.correct) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (optionIdx === selectedOption) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
              } else {
                btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={optionIdx}
                onClick={() => handleSelectOption(optionIdx)}
                className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between select-none ${btnStyle}`}
              >
                <span>{opt}</span>
                {answered && optionIdx === currentQ.correct && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {answered && optionIdx === selectedOption && optionIdx !== currentQ.correct && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation */}
        {answered && (
          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 space-y-1 animate-in fade-in select-none">
            <span className="font-bold block uppercase text-[10px] text-blue-700">Explanation:</span>
            <p>{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Quiz</span>
        </button>

        {currentIdx + 1 < QUIZ_QUESTIONS.length ? (
          <button
            onClick={handleNext}
            disabled={!answered}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            Next Question
          </button>
        ) : (
          <Link
            to="/notes"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1"
          >
            <span>Explore Full Note Bank</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuizArena;
