require('dotenv').config();
const mongoose = require('mongoose');
const Note = require('./models/Note');
const Company = require('./models/Company');

const sampleNotes = [
  {
    title: '🔥 Special Test PDF Handbook ( ₹1 Special Kit )',
    description: 'Special ₹1 test placement PDF handbook for instant payment testing & instant student dashboard PDF download verification.',
    category: 'DSA',
    price: 1,
    pages: 25,
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=60',
    pdfUrl: '/uploads/notes/test_1rupee_handbook.pdf',
    whatYouWillLearn: [
      'Instant ₹1 test checkout & Razorpay payment verification',
      'Immediate lifetime PDF unlock in personal Student Dashboard',
      'Fast-track DSA & Placement formula revision guide',
      '100% verified download link & certificate test'
    ]
  },
  {
    title: 'Ultimate Data Structures & Algorithms Handbook',
    description: 'Master arrays, linked lists, trees, graphs, dynamic programming, and greedy algorithms with clean Java & C++ implementations.',
    category: 'DSA',
    price: 1,
    pages: 145,
    thumbnail: 'https://images.unsplash.com/photo-1516116211223-4c7141467477?w=600&auto=format&fit=crop&q=60',
    pdfUrl: '/uploads/notes/test_1rupee_handbook.pdf',
    whatYouWillLearn: [
      'Top 100 LeetCode patterns categorized by difficulty',
      'Time and Space Complexity Analysis with Big-O notation',
      'Dynamic Programming patterns: 0/1 Knapsack, LCS, LIS',
      'Graph Traversal (BFS/DFS), Dijkstra, and Union-Find algorithms'
    ]
  },
  {
    title: 'System Design Interview Playbook (HLD & LLD)',
    description: 'Comprehensive guide covering scalable architecture, microservices, load balancing, caching strategies, and database sharding.',
    category: 'System Design',
    price: 149,
    pages: 120,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    whatYouWillLearn: [
      'High Level Design (HLD) for URL Shortener, Uber, & WhatsApp',
      'Low Level Design (LLD) with SOLID principles and Design Patterns',
      'Database choice: SQL vs NoSQL, ACID vs BASE',
      'Message Queues: Kafka, RabbitMQ, and Distributed Caching'
    ]
  },
  {
    title: 'Complete React.js & Frontend Architecture Notes',
    description: 'In-depth notes on React 18 hooks, Virtual DOM, state management (Redux Toolkit/Zustand), performance optimization, and custom hooks.',
    category: 'React',
    price: 99,
    pages: 85,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    whatYouWillLearn: [
      'React Lifecycle, Reconciliation, and Fiber Architecture',
      'State Management: Context API vs Redux Toolkit vs Zustand',
      'Performance Optimization: useMemo, useCallback, React.memo',
      'Frontend Security (XSS, CSRF) & Server-Side Rendering (SSR)'
    ]
  },
  {
    title: 'SQL & Database Management System (DBMS) Notes',
    description: 'Master relational queries, indexing, joins, normalization (1NF to BCNF), transactions, and lock mechanisms.',
    category: 'DBMS',
    price: 99,
    pages: 64,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    whatYouWillLearn: [
      'Complex SQL Queries: Subqueries, Window Functions, CTEs',
      'Database Normalization rules with practical enterprise examples',
      'ACID Properties, Isolation levels, and Concurrency Control',
      'B-Trees, B+ Trees indexing strategies for quick lookups'
    ]
  },
  {
    title: 'Operating System & Computer Networks Core Quick Prep',
    description: 'Essential CS fundamentals for campus placement and tech interviews covering process scheduling, memory management, TCP/IP, and HTTP/3.',
    category: 'Operating System',
    price: 99,
    pages: 92,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    whatYouWillLearn: [
      'Process vs Thread, Deadlock handling, Synchronization primitives',
      'Virtual Memory, Paging, Segmentation, & Page replacement',
      'OSI Model & TCP/IP stack layers explained in depth',
      'Web Protocols: HTTP/1.1 vs HTTP/2 vs HTTP/3 & SSL/TLS handshake'
    ]
  },
  {
    title: 'Quantitative Aptitude & Logical Reasoning Formula Cheat Sheet',
    description: 'Comprehensive shortcuts, trick formulas, and practice sets for campus hiring OAs (TCS NQT, Infosys InfyTQ, Accenture, Cognizant).',
    category: 'Aptitude',
    price: 49,
    pages: 50,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=60',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    whatYouWillLearn: [
      'Speed Math, Percentages, Profit & Loss shortcuts',
      'Time & Distance, Permutation & Combination formulas',
      'Data Interpretation tables, pie charts, and trend analysis',
      'Logical Deduction, Syllogism, & Blood Relations patterns'
    ]
  }
];

const sampleCompanies = [
  {
    name: 'TCS (Tata Consultancy Services)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    role: 'Ninja & Digital Software Engineer',
    description: 'Complete TCS NQT preparation package including previous year Online Assessment questions, aptitude shortcuts, and technical interview questions.',
    price: 99,
    oaDetails: {
      aptitude: 'Numerical Ability (26 questions, 40 mins), Verbal Ability (24 questions, 30 mins), Reasoning (30 questions, 50 mins).',
      coding: 'Advanced Coding: 2 problems (30 mins & 45 mins) testing Data Structures, String Manipulation, and Dynamic Programming.',
      mcqs: 'Pseudocode (10 questions), Software Engineering & Technical MCQs (10 questions).',
      details: 'TCS NQT consists of Foundation Section and Advanced Section. High score in Advanced Section unlocks Digital and Prime roles.'
    },
    interviewDetails: {
      technical: 'Questions focused on C/Java basics, OOPs concepts, SQL joins, project architecture, and basic DSA.',
      hr: 'Standard HR questions: Tell me about yourself, why TCS, willing to relocate, night shift flexibility.',
      faqs: [
        'Difference between Method Overloading and Method Overriding?',
        'What is a Primary Key vs Unique Key in SQL?',
        'Explain Garbage Collection in Java.',
        'How does a Linked List differ from an Array?'
      ]
    },
    preparationContent: 'Includes 15+ solved previous year NQT test sets, coding questions with test cases, and interview transcript guides.',
    resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    role: 'SDE-1 (Software Development Engineer)',
    description: 'Amazon SDE-1 OA questions, Leadership Principles answer bank, and system design/coding round cheat sheets.',
    price: 149,
    oaDetails: {
      aptitude: 'Work Style Assessment (Amazon Leadership Principles simulation) + Reasoning.',
      coding: '2 Medium-Hard LeetCode questions (70 mins) focused on Trees, Graphs, Monotonic Stack, and Dynamic Programming.',
      mcqs: 'Code Debugging section: 7 debugging questions in 20 minutes.',
      details: 'OA is conducted on HackerRank. Both coding questions must pass all hidden test cases.'
    },
    interviewDetails: {
      technical: '4 rounds of Technical Interviews covering Data Structures, Algorithms, Object-Oriented Design (OOD), and Low-Level Design.',
      hr: 'Behavioral questions mapped to Amazon 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, etc.).',
      faqs: [
        'Design an In-Memory File System (LLD).',
        'Find the Lowest Common Ancestor in a Binary Tree.',
        'Serialize and Deserialize a Binary Tree.',
        'Give an instance where you took ownership of a project under tight deadlines.'
      ]
    },
    preparationContent: 'Includes Amazon top 50 tagged questions on LeetCode, STAR method templates for LP rounds, and OOD interview problems.',
    resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    role: 'Software Engineer (L3 / Early Career)',
    description: 'Google Online Challenge (GOC) past problems, complex Graph/DP pattern breakdown, and Googliness round interview notes.',
    price: 149,
    oaDetails: {
      aptitude: 'Not applicable for Google engineering roles.',
      coding: 'Google Online Challenge (GOC): 2 Hard Algorithmic questions (60-90 mins).',
      mcqs: 'None.',
      details: 'Focuses heavily on optimal time complexity, edge case handling, clean modular code writing.'
    },
    interviewDetails: {
      technical: '4-5 Coding Rounds with Google Engineers focusing on Problem Solving, Data Structures, Graph Theory, and DP.',
      hr: 'Googliness and Leadership round: Evaluating team alignment, ethics, ambiguous problem solving, and communication.',
      faqs: [
        'Shortest Path in a Weighted Grid with Obstacles and K Eliminations.',
        'Maximum Flow / Min Cut algorithm application in real-time networks.',
        'Design a Distributed Key-Value Store with TTL expiration.',
        'Describe a scenario where you received critical feedback and how you adapted.'
      ]
    },
    preparationContent: 'Curated 60+ Google interview questions with step-by-step mathematical proofs and optimal C++/Python implementations.',
    resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    role: 'Specialist Programmer (SP) & Digital Specialist Engineer (DSE)',
    description: 'Infosys HackWithInfy & InfyTQ test series, sample paper solutions, and technical interview preparation notes.',
    price: 99,
    oaDetails: {
      aptitude: 'Logical Ability, Quantitative Aptitude, Verbal Ability for System Engineer role.',
      coding: '3 Coding questions for DSE/SP role (3 hours) testing Graphs, Strings, Greedy approach, and Bit Manipulation.',
      mcqs: 'DBMS, OOPs, Data Structures MCQs in InfyTQ certification exam.',
      details: 'Clearing InfyTQ with 65%+ grants automatic interview for SE/DSE. HackWithInfy top scorers get direct SP offers.'
    },
    interviewDetails: {
      technical: 'Covers DBMS queries, Data Structures, Java/Python concepts, and walkthrough of final year projects.',
      hr: 'Basic HR questions regarding willingness to work in location preferences and bond terms.',
      faqs: [
        'Explain Normalization up to 3NF with an example table.',
        'Difference between Abstract Class and Interface.',
        'Find duplicate elements in an array in O(n) time.',
        'Explain TCP 3-way Handshake process.'
      ]
    },
    preparationContent: 'Previous 3 years HackWithInfy coding problems solved, DBMS SQL queries handbook, and project defense strategy.',
    resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    role: 'Software Engineer',
    description: 'Microsoft Codility OA solutions, system design round prep, and core Computer Science fundamentals compilation.',
    price: 149,
    oaDetails: {
      aptitude: 'Not applicable.',
      coding: 'Codility OA: 3 coding questions (80-90 minutes) focusing on Arrays, Strings, Trees, and DP.',
      mcqs: 'None.',
      details: 'Correctness and efficiency are both evaluated automatically by test suites.'
    },
    interviewDetails: {
      technical: '3-4 Technical Rounds focusing on Problem Solving, Architecture, Data Structures, and System Design.',
      hr: 'Culture Fit Round: Microsoft Competencies (Growth Mindset, Collaboration, Customer Focus).',
      faqs: [
        'Reverse Nodes in k-Group in a Singly Linked List.',
        'Find Median from Data Stream (Two Heaps approach).',
        'Design a Collaborative Document Editor like MS Word/Office 365.',
        'Tell me about a time you had a technical disagreement with a team member.'
      ]
    },
    preparationContent: 'Microsoft top tagged Codility questions, system design blueprints, and growth mindset behavioral guidelines.',
    resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'Accenture',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    role: 'Advanced Application Engineering Associate (AAEA)',
    description: 'Accenture Cognitive and Technical Assessment prep kit with Pseudo Code questions and coding round test papers.',
    price: 99,
    oaDetails: {
      aptitude: 'English Ability (17 Qs), Critical Reasoning & Problem Solving (18 Qs), Abstract Reasoning (15 Qs).',
      coding: '2 Coding questions (45 mins) - Array & String manipulation problems.',
      mcqs: 'Common Application and MS Office (12 Qs), Pseudo Code (18 Qs), Fundamentals of Networking & Security (10 Qs).',
      details: 'Mandatory Communication Assessment follows after passing the cognitive & technical assessment.'
    },
    interviewDetails: {
      technical: 'Combined Technical + HR round focusing on basic programming knowledge, resume projects, and situational scenarios.',
      hr: 'Integrated into technical round: Communication skills, career goals, team collaboration.',
      faqs: [
        'Write a program to check if a string is a palindrome without built-in functions.',
        'What is Cloud Computing and what are its types (IaaS, PaaS, SaaS)?',
        'Explain the difference between SQL and NoSQL databases.',
        'Why do you want to join Accenture?'
      ]
    },
    preparationContent: 'Full Pseudo Code solution key, Communication round simulation tips, and coding problem archive.',
    resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interviewprep';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await Note.deleteMany({});
    await Company.deleteMany({});
    console.log('Cleared existing notes and companies.');

    await Note.insertMany(sampleNotes);
    console.log(`Successfully seeded ${sampleNotes.length} Notes.`);

    await Company.insertMany(sampleCompanies);
    console.log(`Successfully seeded ${sampleCompanies.length} Companies.`);

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
