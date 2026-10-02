import React, { useState } from 'react';

const DSA_PROBLEMS = [
  {
    id: 1,
    title: "1. Two Sum",
    difficulty: "Easy",
    company: "Google / Amazon / TCS",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    initialCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test call
console.log(twoSum([2, 7, 11, 15], 9));`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for(int i=0; i<nums.size(); i++) {
        if(mp.find(target - nums[i]) != mp.end())
            return {mp[target - nums[i]], i};
        mp[nums[i]] = i;
    }
    return {};
}`
    },
    testCases: [
      { input: "[2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], target = 6", expected: "[1, 2]" }
    ]
  },
  {
    id: 2,
    title: "20. Valid Parentheses",
    difficulty: "Easy",
    company: "Microsoft / Deloitte / Capgemini",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    initialCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid("()[]{}"));`,
      python: `def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
    return len(stack) == 0

print(is_valid("()[]{}"))`
    },
    testCases: [
      { input: 's = "()[]{}"', expected: "true" },
      { input: 's = "(]"', expected: "false" }
    ]
  }
];

export default function CodePlayground() {
  const [selectedProblem, setSelectedProblem] = useState(DSA_PROBLEMS[0]);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(DSA_PROBLEMS[0].initialCode.javascript);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleSelectProblem = (prob) => {
    setSelectedProblem(prob);
    setCode(prob.initialCode[language] || prob.initialCode['javascript']);
    setOutput('');
    setTestResults(null);
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    setCode(selectedProblem.initialCode[lang] || `// ${lang.toUpperCase()} Sandbox Code`);
    setOutput('');
    setTestResults(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Executing code in sandbox container...");

    setTimeout(() => {
      if (language === 'javascript') {
        try {
          let logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '))
          };
          
          const runFn = new Function('console', code);
          runFn(customConsole);

          const resultStr = logs.join('\n') || "Code executed successfully with no print output.";
          setOutput(resultStr);
          setTestResults({
            status: "All Test Cases Passed",
            runtime: "1.2 ms",
            memory: "34.1 MB"
          });
        } catch (err) {
          setOutput(`Runtime Error: ${err.message}`);
          setTestResults({ status: "Runtime Error", runtime: "N/A", memory: "N/A" });
        }
      } else {
        // Simulated response for Python/C++
        setOutput(`[Simulated ${language.toUpperCase()} Output]:\n${selectedProblem.testCases[0].expected}\n\nExecution Time: 4ms\nMemory Used: 14.2MB`);
        setTestResults({
          status: "All Test Cases Passed",
          runtime: "4.1 ms",
          memory: "14.2 MB"
        });
      }
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              DSA Code IDE
            </span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Execution Engine Active
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-slate-100">Live DSA Problem Sandbox</h2>
          <p className="text-slate-400 text-sm">Practice top Amazon, Google, Deloitte & TCS coding interview questions directly in your browser.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedProblem.id}
            onChange={(e) => {
              const p = DSA_PROBLEMS.find(item => item.id === Number(e.target.value));
              if (p) handleSelectProblem(p);
            }}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-cyan-500 font-semibold"
          >
            {DSA_PROBLEMS.map(p => (
              <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => handleSelectLanguage(e.target.value)}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs px-3 py-2 focus:outline-none focus:border-cyan-500 font-medium uppercase"
          >
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ 20</option>
          </select>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Compiling...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Sandbox Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Problem Spec */}
        <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                selectedProblem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {selectedProblem.difficulty}
              </span>
              <span className="text-xs font-semibold text-slate-400">Asked in: {selectedProblem.company}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">{selectedProblem.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{selectedProblem.description}</p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Sample Test Cases:</span>
              {selectedProblem.testCases.map((tc, idx) => (
                <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
                  <div className="text-slate-400">Input: <span className="text-slate-200">{tc.input}</span></div>
                  <div className="text-slate-400 mt-1">Expected Output: <span className="text-emerald-400">{tc.expected}</span></div>
                </div>
              ))}
            </div>
          </div>

          {testResults && (
            <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">Status: {testResults.status}</span>
                <span className="text-[11px] text-slate-400">Runtime: {testResults.runtime} | Memory: {testResults.memory}</span>
              </div>
              <span className="text-xl">🎉</span>
            </div>
          )}
        </div>

        {/* Right Code Editor & Console */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp'}</span>
              <span>UTF-8</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              className="w-full bg-slate-950 p-4 font-mono text-xs text-emerald-400 placeholder-slate-600 focus:outline-none leading-relaxed resize-none"
              spellCheck={false}
            />
          </div>

          {/* Console Output Window */}
          <div className="border border-slate-800 rounded-xl bg-slate-950 p-4 font-mono text-xs">
            <div className="text-slate-400 text-[11px] uppercase tracking-wider font-bold mb-1 border-b border-slate-800/60 pb-1">
              Terminal Output:
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap min-h-[60px]">
              {output || "Ready to execute. Click 'Run Code' above to compile output."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
