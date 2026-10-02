const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interviewprep';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Local MongoDB not running on ${mongoUri}. Starting in-memory database...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`In-Memory MongoDB Connected at: ${memoryUri}`);

      // Auto seed
      await seedInitialData();
    } catch (memErr) {
      console.warn('Memory server note:', memErr.message);
    }
  }
};

const seedInitialData = async () => {
  try {
    const User = require('../models/User');
    const Note = require('../models/Note');
    const Company = require('../models/Company');
    const bcrypt = require('bcryptjs');

    const adminEmail = 'gopal.x235@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass@12345';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    await User.deleteMany({});
    await User.create([
      {
        name: 'Gopal Yadav (Super Admin)',
        email: adminEmail.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
      },
    ]);
    console.log(`[Database Ready] Sole Admin account initialized: ${adminEmail}`);

    await Note.deleteMany({});
    await Company.deleteMany({});

    // Seed Notes
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
    await Note.insertMany(sampleNotes);

    // Seed Companies with high-res official Wikimedia PNG logo URLs
    const sampleCompanies = [
      {
        name: 'TCS (Tata Consultancy Services)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/640px-Tata_Consultancy_Services_Logo.svg.png',
        role: 'Ninja & Digital Software Engineer',
        description: 'Complete TCS NQT preparation package including previous year Online Assessment questions, aptitude shortcuts, and technical interview questions.',
        price: 99,
        oaDetails: {
          aptitude: 'Numerical Ability (26 Qs), Verbal Ability (24 Qs), Reasoning (30 Qs).',
          coding: 'Advanced Coding: 2 problems (30m & 45m) testing Data Structures & DP.',
          mcqs: 'Pseudocode (10 Qs), Technical MCQs (10 Qs).',
          details: 'Foundation + Advanced Sections. High score unlocks Digital & Prime roles.'
        },
        interviewDetails: {
          technical: 'Focus on C/Java, OOPs, SQL joins, project architecture, basic DSA.',
          hr: 'Tell me about yourself, why TCS, relocation, shift flexibility.',
          faqs: ['Method Overloading vs Overriding', 'Primary vs Unique Key', 'Garbage Collection in Java']
        },
        preparationContent: '15+ solved previous year NQT test sets with coding test cases.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png',
        role: 'SDE-1 (Software Development Engineer)',
        description: 'Amazon SDE-1 OA questions, Leadership Principles answer bank, and system design/coding round cheat sheets.',
        price: 149,
        oaDetails: {
          aptitude: 'Work Style Assessment (Amazon 16 LP simulation).',
          coding: '2 Medium-Hard LeetCode questions (70 mins) on Trees/Graphs/DP.',
          mcqs: 'Code Debugging section: 7 debugging questions in 20 mins.',
          details: 'HackerRank OA. All hidden test cases must pass.'
        },
        interviewDetails: {
          technical: '4 rounds covering Data Structures, Algorithms, OOD, and Low-Level Design.',
          hr: 'Behavioral STAR methodology mapped to Amazon 16 Leadership Principles.',
          faqs: ['Design In-Memory File System', 'Lowest Common Ancestor in Binary Tree', 'STAR method LP stories']
        },
        preparationContent: 'Amazon top 50 tagged questions on LeetCode with STAR templates.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png',
        role: 'Software Engineer (L3 / Early Career)',
        description: 'Google Online Challenge (GOC) past problems, complex Graph/DP pattern breakdown, and Googliness round interview notes.',
        price: 149,
        oaDetails: {
          aptitude: 'Not applicable.',
          coding: 'Google Online Challenge (GOC): 2 Hard Algorithmic questions (60-90 mins).',
          mcqs: 'None.',
          details: 'Optimal time complexity & clean modular code required.'
        },
        interviewDetails: {
          technical: '4-5 Coding Rounds focusing on Graph Theory, DP, and Math.',
          hr: 'Googliness round: Evaluating team alignment, ethics, and communication.',
          faqs: ['Shortest Path in Weighted Grid with K Eliminations', 'Distributed Key-Value Store TTL']
        },
        preparationContent: '60+ Google interview questions with step-by-step mathematical proofs.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Infosys',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/640px-Infosys_logo.svg.png',
        role: 'Specialist Programmer (SP) & Digital Specialist Engineer (DSE)',
        description: 'Infosys HackWithInfy & InfyTQ test series, sample paper solutions, and technical interview preparation notes.',
        price: 99,
        oaDetails: {
          aptitude: 'Logical, Quantitative, Verbal for System Engineer role.',
          coding: '3 Coding questions for DSE/SP (3 hours) testing Graphs & Greedy.',
          mcqs: 'DBMS, OOPs, Data Structures MCQs in InfyTQ.',
          details: 'InfyTQ 65%+ gives direct interview call.'
        },
        interviewDetails: {
          technical: 'DBMS queries, Data Structures, Java/Python, and project defense.',
          hr: 'Location preferences and bond terms.',
          faqs: ['Normalization up to 3NF', 'Abstract Class vs Interface', 'TCP 3-way Handshake']
        },
        preparationContent: 'Previous 3 years HackWithInfy coding problems solved with DBMS handbook.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Microsoft',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/640px-Microsoft_logo.svg.png',
        role: 'Software Engineer',
        description: 'Microsoft Codility OA solutions, system design round prep, and core Computer Science fundamentals compilation.',
        price: 149,
        oaDetails: {
          aptitude: 'Not applicable.',
          coding: 'Codility OA: 3 coding questions (80-90 mins) on Arrays, Trees, DP.',
          mcqs: 'None.',
          details: 'Codility test platform with automatic correctness & speed evaluation.'
        },
        interviewDetails: {
          technical: '3-4 Technical Rounds on Algorithms, Low-Level Design, and System Architecture.',
          hr: 'Microsoft Competencies (Growth Mindset, Customer Focus).',
          faqs: ['Reverse Nodes in k-Group', 'Median from Data Stream', 'Collaborative Document Editor LLD']
        },
        preparationContent: 'Microsoft top tagged Codility questions & system design blueprints.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Accenture',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/640px-Accenture.svg.png',
        role: 'Advanced Application Engineering Associate (AAEA)',
        description: 'Accenture Cognitive and Technical Assessment prep kit with Pseudo Code questions and coding round test papers.',
        price: 99,
        oaDetails: {
          aptitude: 'English (17 Qs), Critical Reasoning (18 Qs), Abstract Reasoning (15 Qs).',
          coding: '2 Coding questions (45 mins) - String & Array manipulation.',
          mcqs: 'Pseudo Code (18 Qs), Common Applications (12 Qs), Networking (10 Qs).',
          details: 'Mandatory Communication Assessment follows.'
        },
        interviewDetails: {
          technical: 'Basic programming, resume projects, and situational scenarios.',
          hr: 'Integrated into technical round.',
          faqs: ['String palindrome without built-in functions', 'Cloud Computing types (IaaS, PaaS, SaaS)', 'SQL vs NoSQL']
        },
        preparationContent: 'Full Pseudo Code solution key & Communication round simulation tips.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Deloitte',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Deloitte.svg/640px-Deloitte.svg.png',
        role: 'Analyst & Software Engineer',
        description: 'Deloitte NLA OA past papers, aptitude shortcuts, SQL query banks, and behavioral interview questions.',
        price: 99,
        oaDetails: {
          aptitude: 'Quantitative (16 Qs), Logical (14 Qs), Verbal (22 Qs).',
          coding: '2 Coding questions (30 mins).',
          mcqs: 'Computer Fundamentals & SQL (25 Qs).',
          details: 'Amcat / Cocubes assessment platform.'
        },
        interviewDetails: {
          technical: 'SQL joins, DBMS concepts, OOPs principles, project explanation.',
          hr: 'Scenario-based behavioral questions.',
          faqs: ['Difference between WHERE and HAVING in SQL', 'What is an Index in Database?']
        },
        preparationContent: 'Deloitte NLA past papers solved with SQL query cheat sheet.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Wipro',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/640px-Wipro_Primary_Logo_Color_RGB.svg.png',
        role: 'Project Engineer (Elite & Turbo)',
        description: 'Wipro NLTH past assessment test series, Essay writing guide, coding questions, and technical interview transcripts.',
        price: 99,
        oaDetails: {
          aptitude: 'Quantitative, Logical, Verbal Ability.',
          coding: '2 Coding questions (45 mins) on Arrays & Strings.',
          mcqs: 'Essay Writing Test (20 mins).',
          details: 'Clearing Turbo section upgrades package from 3.5 to 6.5 LPA.'
        },
        interviewDetails: {
          technical: 'Basic C/C++/Java concepts, project walkthrough.',
          hr: 'Willingness to relocate, 5-year goal, night shift flexibility.',
          faqs: ['Explain Call by Value vs Call by Reference', 'What is a Pointer in C?']
        },
        preparationContent: 'Wipro NLTH 10 full length mock tests with essay writing templates.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Cognizant',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/640px-Cognizant_logo_2022.svg.png',
        role: 'GenC Elevate & GenC Next Engineer',
        description: 'Cognizant GenC Elevate & Next coding papers, debugging questions, and technical interview guides.',
        price: 99,
        oaDetails: {
          aptitude: 'GenC: Quant, Logical, Skill-based MCQs.',
          coding: 'GenC Next: 2 Medium Coding problems (60 mins).',
          mcqs: 'Code Debugging (7 Qs in 20 mins).',
          details: 'GenC Next offers 6.75 LPA package.'
        },
        interviewDetails: {
          technical: 'DSA concepts, DBMS SQL, Web Development basics.',
          hr: 'Behavioral & communication assessment.',
          faqs: ['Find duplicate elements in O(n)', 'What is REST API?']
        },
        preparationContent: 'Cognizant GenC Next debugging & coding test archive.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        name: 'Goldman Sachs',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs_logo.svg/640px-Goldman_Sachs_logo.svg.png',
        role: 'Engineering Analyst',
        description: 'Goldman Sachs Math, Advanced Coding, Subjective CS, and Quantitative Aptitude OA prep kit.',
        price: 149,
        oaDetails: {
          aptitude: 'Numerical Computations (8 Qs), Advanced Math (5 Qs).',
          coding: '2 Hard Algorithmic questions (45 mins).',
          mcqs: 'CS Fundamentals & Subjective Essay (2 Qs).',
          details: 'HackerRank test with high cutoff threshold.'
        },
        interviewDetails: {
          technical: '4-5 rounds on DSA, Dynamic Programming, Math, and System Design.',
          hr: 'Goldman Sachs Culture & Finance interest.',
          faqs: ['Stock Buy & Sell with Fee', 'Count Pairs with Given Sum in Array']
        },
        preparationContent: 'Goldman Sachs top 40 tagged LeetCode problems with Math proofs.',
        resources: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    ];
    await Company.insertMany(sampleCompanies);
    console.log(`[Auto-Seed] ${sampleCompanies.length} Companies seeded with official Wikimedia PNG logos.`);
  } catch (err) {
    console.error('Auto-seed error:', err.message);
  }
};

module.exports = connectDB;
