// Resume Scoring and ATS Analysis Engine for Tech & Placement Resumes

export const ROLE_KEYWORD_BENCHMARKS = {
  sde: {
    title: 'Software Development Engineer (SDE-1)',
    description: 'Algorithms, Data Structures, System Design, and OOP Fundamentals',
    essentialKeywords: [
      'Data Structures',
      'Algorithms',
      'LeetCode',
      'C++',
      'Java',
      'Python',
      'OOPs',
      'System Design',
      'Time Complexity',
      'Space Complexity',
      'Dynamic Programming',
      'Graphs',
      'Trees',
      'SQL',
      'Database',
      'Git',
      'Multi-threading',
      'Debugging',
    ],
    recommendedKeywords: [
      'REST APIs',
      'Docker',
      'Kubernetes',
      'Microservices',
      'Linux',
      'Unit Testing',
      'CI/CD',
      'PostgreSQL',
      'Redis',
    ],
  },
  frontend: {
    title: 'Frontend Engineer / React Developer',
    description: 'UI/UX, State Management, Component Architecture, and Web Performance',
    essentialKeywords: [
      'JavaScript',
      'TypeScript',
      'React',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Redux',
      'State Management',
      'Responsive Design',
      'REST APIs',
      'Git',
      'DOM',
      'Web Performance',
    ],
    recommendedKeywords: [
      'Next.js',
      'Zustand',
      'Webpack',
      'Vite',
      'Jest',
      'Cypress',
      'Accessibility (a11y)',
      'GraphQL',
      'SSR',
    ],
  },
  backend: {
    title: 'Backend Engineer / API Developer',
    description: 'Server Architecture, Database Optimization, Microservices, and Cloud',
    essentialKeywords: [
      'Node.js',
      'Express',
      'Java / Spring Boot',
      'Python / Django',
      'SQL',
      'MongoDB',
      'REST APIs',
      'Authentication',
      'JWT',
      'Database Optimization',
      'Git',
      'Caching',
    ],
    recommendedKeywords: [
      'Redis',
      'PostgreSQL',
      'Docker',
      'Kafka',
      'Microservices',
      'AWS',
      'GraphQL',
      'Rate Limiting',
      'ORM',
    ],
  },
  fullstack: {
    title: 'Full Stack Web Developer',
    description: 'End-to-End Product Architecture, Frontend, Backend & Database',
    essentialKeywords: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'SQL',
      'JavaScript',
      'HTML/CSS',
      'RESTful APIs',
      'Git',
      'Deployment',
      'Authentication',
      'State Management',
    ],
    recommendedKeywords: [
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'Docker',
      'AWS / Vercel',
      'Tailwind CSS',
      'Prisma',
      'CI/CD',
    ],
  },
  data: {
    title: 'Data Analyst / ML Engineer',
    description: 'Statistical Modeling, SQL Queries, Machine Learning, and Visualization',
    essentialKeywords: [
      'Python',
      'SQL',
      'Pandas',
      'NumPy',
      'Data Visualization',
      'Power BI / Tableau',
      'Statistics',
      'Exploratory Data Analysis',
      'Machine Learning',
      'Data Cleaning',
    ],
    recommendedKeywords: [
      'Scikit-Learn',
      'TensorFlow / PyTorch',
      'Matplotlib',
      'Seaborn',
      'ETL Pipelines',
      'BigQuery',
      'Regression',
      'Jupyter',
    ],
  },
  mass_it: {
    title: 'Campus IT / Service Giant (TCS / Infosys / Accenture)',
    description: 'Core CS Foundations, OOPs, DBMS, Quantitative & Verbal Aptitude',
    essentialKeywords: [
      'Java',
      'C++',
      'Python',
      'OOPs Concepts',
      'DBMS',
      'SQL Queries',
      'Data Structures',
      'Operating System',
      'Computer Networks',
      'SDLC',
      'Agile',
      'Problem Solving',
    ],
    recommendedKeywords: [
      'HTML',
      'CSS',
      'JavaScript',
      'Project Walkthrough',
      'Internship',
      'Certifications',
      'Team Leadership',
      'Cloud Basics',
    ],
  },
};

export const ACTION_VERBS = [
  'accelerated',
  'achieved',
  'analyzed',
  'architected',
  'automated',
  'built',
  'centralized',
  'collaborated',
  'composed',
  'configured',
  'constructed',
  'converted',
  'created',
  'debugged',
  'decreased',
  'delivered',
  'deployed',
  'designed',
  'developed',
  'eliminated',
  'engineered',
  'enhanced',
  'established',
  'executed',
  'expedited',
  'formulated',
  'generated',
  'guided',
  'implemented',
  'improved',
  'increased',
  'initiated',
  'integrated',
  'launched',
  'lead',
  'managed',
  'maximized',
  'migrated',
  'minimized',
  'modeled',
  'optimized',
  'orchestrated',
  'overhauled',
  'pioneered',
  'produced',
  'reduced',
  'refactored',
  'resolved',
  'revamped',
  'scaled',
  'secured',
  'simplified',
  'spearheaded',
  'streamlined',
  'structured',
  'surpassed',
  'tested',
  'transformed',
  'upgraded',
];

export const SAMPLE_TECH_RESUME = `RAHUL YADAV
Email: rahul.yadav@example.com | Phone: +91 9876543210
LinkedIn: linkedin.com/in/rahulyadav-dev | GitHub: github.com/rahulyadav-code
Portfolio: rahulyadav.dev

EDUCATION
Bachelor of Technology in Computer Science & Engineering (2022 - 2026)
ABC Institute of Technology, Delhi NCR | CGPA: 8.7/10

TECHNICAL SKILLS
- Programming Languages: C++, Java, JavaScript, TypeScript, Python, SQL
- Core Fundamentals: Data Structures & Algorithms, Object-Oriented Programming (OOPs), DBMS, Operating Systems, Computer Networks
- Web & Backend: React.js, Node.js, Express.js, Tailwind CSS, Redux Toolkit, REST APIs, GraphQL
- Databases & Tools: MongoDB, PostgreSQL, Redis, Docker, Git, GitHub, Postman, Linux

PROJECTS
1. Real-Time Collaborative Code Editor & DSA Arena
- Architected a distributed web application supporting simultaneous live coding for 500+ concurrent users with WebSockets.
- Optimized syntax parsing and compilation execution pipeline, reducing server latency by 42%.
- Integrated LeetCode-style test case verification engine with Redis caching, boosting query response speed by 3x.
- Tech Stack: React, Node.js, Socket.io, Redis, Docker, PostgreSQL.

2. Automated Placement & OA Preparation Kit Platform
- Engineered scalable full-stack portal with Razorpay payment gateway integration, generating ₹1.2L+ GMV.
- Implemented secure JWT authentication and role-based access control (RBAC) protecting 150+ digital resource files.
- Automated instant certificate generation pipeline with dynamic SVG-to-PDF rendering within 1.5 seconds.
- Tech Stack: React.js, Tailwind CSS, Express, MongoDB, Razorpay API.

WORK EXPERIENCE / INTERNSHIPS
Software Developer Intern | TechNova Solutions (June 2025 - August 2025)
- Spearheaded migration of legacy REST endpoints to modern asynchronous microservices, improving throughput by 35%.
- Authored 45+ unit and integration test suites achieving 92% code coverage using Jest and Supertest.
- Automated CI/CD deployment workflows with GitHub Actions, reducing deployment time from 25 mins to 6 mins.

ACHIEVEMENTS & CERTIFICATIONS
- Solved 450+ algorithmic problems across LeetCode & CodeChef (Max Rating: 1720).
- Global Rank 342 in Google Kick Start Round D out of 8,000+ international participants.
- AWS Certified Cloud Practitioner & HackerRank 5-Star Problem Solving badge.
`;

export const analyzeResume = (text, targetRoleKey = 'sde') => {
  if (!text || text.trim().length < 50) {
    return {
      isValid: false,
      error: 'Please provide at least 50 characters of resume content to analyze.',
    };
  }

  const cleanText = text.replace(/\r\n/g, '\n');
  const lowerText = cleanText.toLowerCase();
  const benchmark = ROLE_KEYWORD_BENCHMARKS[targetRoleKey] || ROLE_KEYWORD_BENCHMARKS.sde;

  // 1. Structure & Contact Score (Max 25 pts)
  let structureScore = 0;
  const structureDetails = [];

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cleanText);
  if (hasEmail) {
    structureScore += 5;
    structureDetails.push({ name: 'Email Address Detected', passed: true });
  } else {
    structureDetails.push({ name: 'Email Address Missing', passed: false, tip: 'Add a professional contact email at the header.' });
  }

  const hasPhone = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/.test(cleanText) || lowerText.includes('phone') || lowerText.includes('mobile');
  if (hasPhone) {
    structureScore += 5;
    structureDetails.push({ name: 'Phone Contact Detected', passed: true });
  } else {
    structureDetails.push({ name: 'Phone Contact Missing', passed: false, tip: 'Include a direct mobile number with country code.' });
  }

  const hasLinkedIn = lowerText.includes('linkedin.com') || lowerText.includes('linkedin');
  if (hasLinkedIn) {
    structureScore += 5;
    structureDetails.push({ name: 'LinkedIn Profile Found', passed: true });
  } else {
    structureDetails.push({ name: 'LinkedIn URL Missing', passed: false, tip: 'ATS recruiters favor profiles with an active LinkedIn link.' });
  }

  const hasGitHub = lowerText.includes('github.com') || lowerText.includes('github') || lowerText.includes('gitlab');
  if (hasGitHub) {
    structureScore += 5;
    structureDetails.push({ name: 'GitHub / Portfolio Link Present', passed: true });
  } else {
    structureDetails.push({ name: 'GitHub Profile Link Missing', passed: false, tip: 'Tech recruiters require a GitHub link to verify projects.' });
  }

  // Section completeness
  const sections = [
    { key: 'education', names: ['education', 'bachelor', 'b.tech', 'm.tech', 'university', 'college', 'cgpa'] },
    { key: 'skills', names: ['skills', 'technical skills', 'technologies', 'proficiencies', 'tools'] },
    { key: 'projects', names: ['projects', 'academic projects', 'personal projects', 'key projects'] },
    { key: 'experience', names: ['experience', 'work experience', 'internship', 'employment'] },
  ];

  let detectedSectionsCount = 0;
  sections.forEach((s) => {
    const found = s.names.some((n) => lowerText.includes(n));
    if (found) detectedSectionsCount++;
  });

  if (detectedSectionsCount >= 3) {
    structureScore += 5;
    structureDetails.push({ name: `Standard Sections (${detectedSectionsCount}/4 detected)`, passed: true });
  } else {
    structureDetails.push({
      name: `Incomplete Sections (${detectedSectionsCount}/4 detected)`,
      passed: false,
      tip: 'Ensure standard headers: Education, Technical Skills, Projects, and Experience.',
    });
  }

  // 2. Impact & Quantification (Max 25 pts)
  let impactScore = 0;
  const impactDetails = [];

  // Count action verbs
  const foundVerbs = [];
  ACTION_VERBS.forEach((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(cleanText)) {
      foundVerbs.push(verb);
    }
  });

  if (foundVerbs.length >= 8) {
    impactScore += 12;
    impactDetails.push({ name: `Strong Action Verbs (${foundVerbs.length} detected)`, passed: true });
  } else if (foundVerbs.length >= 4) {
    impactScore += 7;
    impactDetails.push({
      name: `Moderate Action Verbs (${foundVerbs.length} detected)`,
      passed: true,
      tip: 'Aim for at least 8 distinct action verbs (e.g., spearheaded, architected, optimized, deployed).',
    });
  } else {
    impactScore += 3;
    impactDetails.push({
      name: `Weak Action Verbs (${foundVerbs.length} detected)`,
      passed: false,
      tip: 'Replace passive phrases ("worked on", "was responsible for") with punchy action verbs.',
    });
  }

  // Quantification of results (numbers, %, metrics)
  const metricMatches = cleanText.match(/\b\d+(\.\d+)?(%|x|k|ms|s|lakh|crore|users|req\/s|\+)?\b/gi) || [];
  const validMetrics = metricMatches.filter((m) => !/^(202[0-9]|199[0-9]|10|12)$/.test(m)); // filter out years/standard grades

  if (validMetrics.length >= 6) {
    impactScore += 13;
    impactDetails.push({ name: `Quantified Metrics & Achievements (${validMetrics.length} found)`, passed: true });
  } else if (validMetrics.length >= 3) {
    impactScore += 8;
    impactDetails.push({
      name: `Partial Metrics (${validMetrics.length} found)`,
      passed: true,
      tip: 'Add tangible impact metrics (e.g., "reduced query latency by 40%", "served 1,000+ users").',
    });
  } else {
    impactScore += 3;
    impactDetails.push({
      name: 'Low Quantification of Results',
      passed: false,
      tip: 'Include numbers, percentages, speedups, and throughput metrics in your project bullets.',
    });
  }

  // 3. Role & Keywords Matching (Max 30 pts)
  let keywordScore = 0;
  const matchedKeywords = [];
  const missingKeywords = [];

  const allTargetKeywords = [...benchmark.essentialKeywords, ...benchmark.recommendedKeywords];

  allTargetKeywords.forEach((kw) => {
    // Escaped regex for special chars like C++
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9#+])${escaped}([^a-zA-Z0-9#+]|$)`, 'i');
    if (regex.test(cleanText)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const matchRatio = matchedKeywords.length / allTargetKeywords.length;
  keywordScore = Math.min(30, Math.round(matchRatio * 35));

  // 4. Project & Technical Depth (Max 20 pts)
  let depthScore = 0;
  const depthDetails = [];

  // Check tech stack presence
  const techTokens = ['react', 'node', 'express', 'sql', 'mongodb', 'docker', 'api', 'git', 'c++', 'java', 'python'];
  const foundTokens = techTokens.filter((t) => lowerText.includes(t));

  if (foundTokens.length >= 6) {
    depthScore += 10;
    depthDetails.push({ name: `Robust Tech Stack Variety (${foundTokens.length}+ technologies)`, passed: true });
  } else {
    depthScore += 5;
    depthDetails.push({
      name: 'Narrow Tech Stack',
      passed: false,
      tip: 'Highlight full stack breadth (frontend, backend, database, version control).',
    });
  }

  // Word Count / Resume Length balance (Ideally 300 to 800 words for single page tech resume)
  const words = cleanText.trim().split(/\s+/).length;
  if (words >= 350 && words <= 850) {
    depthScore += 10;
    depthDetails.push({ name: `Optimal 1-Page Resume Length (${words} words)`, passed: true });
  } else if (words < 350) {
    depthScore += 5;
    depthDetails.push({
      name: `Resume Content Brief (${words} words)`,
      passed: false,
      tip: 'Expand on project architectures, design decisions, and measurable outcomes.',
    });
  } else {
    depthScore += 6;
    depthDetails.push({
      name: `High Word Count (${words} words)`,
      passed: false,
      tip: 'Consider tightening sentences to fit within a single, high-impact page.',
    });
  }

  // Total Score Calculation
  const totalScore = Math.min(100, Math.max(10, structureScore + impactScore + keywordScore + depthScore));

  // Determine Placement Readiness Rating
  let verdict = '';
  let verdictColor = '';
  if (totalScore >= 80) {
    verdict = 'Top Tier - Campus & Product Ready';
    verdictColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else if (totalScore >= 65) {
    verdict = 'Good Potential - Needs Key Enhancements';
    verdictColor = 'text-blue-600 bg-blue-50 border-blue-200';
  } else if (totalScore >= 50) {
    verdict = 'Moderate - Missing Crucial ATS Keywords';
    verdictColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else {
    verdict = 'Needs Comprehensive Overhaul';
    verdictColor = 'text-rose-600 bg-rose-50 border-rose-200';
  }

  // Actionable Critical Recommendations
  const criticalFixes = [];
  const improvements = [];
  const strengths = [];

  if (!hasEmail || !hasPhone) {
    criticalFixes.push('Add clearly visible email and phone contact info in your header.');
  }
  if (!hasGitHub) {
    criticalFixes.push('Add your active GitHub profile URL with pinned repositories and READMEs.');
  }
  if (missingKeywords.length > 5) {
    criticalFixes.push(`Integrate missing high-demand ${benchmark.title} keywords (e.g., ${missingKeywords.slice(0, 4).join(', ')}).`);
  }
  if (validMetrics.length < 3) {
    criticalFixes.push('Quantify your project achievements using concrete metrics (%, time saved, latency reduced, user scale).');
  }

  if (foundVerbs.length < 8) {
    improvements.push('Replace passive phrases with impactful action verbs (architected, orchestrated, reduced, deployed).');
  }
  if (!hasLinkedIn) {
    improvements.push('Include a customized LinkedIn profile link.');
  }
  if (words < 350) {
    improvements.push('Expand bullet points with STAR method: Situation, Task, Action taken, and Result achieved.');
  }

  if (hasGitHub) strengths.push('GitHub repository presence signals practical software engineering ability.');
  if (foundVerbs.length >= 6) strengths.push(`Strong vocabulary of ${foundVerbs.length} technical action verbs.`);
  if (validMetrics.length >= 4) strengths.push(`Excellent data-driven quantification across project bullet points.`);
  if (matchedKeywords.length >= 8) strengths.push(`High keyword alignment for target role: ${benchmark.title}.`);

  return {
    isValid: true,
    totalScore,
    verdict,
    verdictColor,
    wordCount: words,
    targetRole: benchmark.title,
    breakdown: {
      structure: { score: structureScore, max: 25, label: 'Structure & Contact Info', details: structureDetails },
      impact: { score: impactScore, max: 25, label: 'Action Verbs & Impact', details: impactDetails },
      keywords: { score: keywordScore, max: 30, label: 'Role Keywords & Tech Relevance', matchedCount: matchedKeywords.length, totalCount: allTargetKeywords.length },
      depth: { score: depthScore, max: 20, label: 'Project Depth & Length', details: depthDetails },
    },
    matchedKeywords,
    missingKeywords,
    foundVerbs,
    criticalFixes,
    improvements,
    strengths,
    sampleBulletRewrites: [
      {
        before: 'Worked on a website using React and Node.js for placement notes.',
        after: 'Architected responsive full-stack placement portal with React and Node.js, delivering 150+ digital resources to 1,200+ candidates.',
      },
      {
        before: 'Responsible for writing SQL queries and fixing bugs.',
        after: 'Optimized PostgreSQL relational schemas and query execution plans, reducing server database latency by 38%.',
      },
      {
        before: 'Created a collaborative chat application.',
        after: 'Engineered high-concurrency real-time WebSocket chat service handling 500+ simultaneous connections with Redis pub/sub.',
      },
    ],
  };
};
