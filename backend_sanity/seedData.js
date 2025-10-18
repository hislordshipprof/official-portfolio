const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'l3wd7476',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-02-01',
  token: process.env.SANITY_AUTH_TOKEN || 'skC9HZmyj3pbJxiBPwv90Jo5hHgytebCk8X9bpWouQDr72z7026mfAp0WtVWkkTjMIeCha1GJHmmk0mlK4jbjpFkoXMTjvIy8BJjffkGJvqle2bwqK6oiMn7LRPCyHU0Jyq1V0CLIgaiM8Gd9aXGbPuUxs0BkxO7vTaIvaCUxCPGrKVIBwkG'
});

// Work Experience Data from Resume
const workExperienceData = [
  {
    _type: 'workExperience',
    position: 'Full-Stack Software Engineer (AI & EdTech)',
    company: 'Studyfetch',
    location: 'California',
    startDate: '2025-08-01',
    endDate: null, // Current job
    responsibilities: [
      'Engineered and deployed full-stack web applications using React Native, Next.js, and TypeScript, delivering seamless responsive user experiences for StudyFetch\'s AI-powered learning platform.',
      'Designed and optimized database architectures with MongoDB and PostgreSQL, improving data retrieval efficiency and enabling scalable storage of user study materials.',
      'Integrated OpenAI APIs to build intelligent tutoring features, including context-aware Q&A, interactive chat, and smart annotations, enhancing student engagement and comprehension.',
      'Collaborated cross-functionally with product and design teams to develop AI-driven PDF tutoring tools that support voice interaction, real-time explanations, and visual highlights, increasing product adoption and user satisfaction.',
      'Implemented end-to-end testing, CI/CD pipelines, and performance optimization to ensure reliability and scalability of production systems, reducing deployment time and improving platform stability.'
    ],
    technologies: ['React Native', 'Next.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'OpenAI APIs', 'CI/CD'],
    achievements: [
      'Built AI-powered learning platform features',
      'Improved data retrieval efficiency',
      'Enhanced student engagement through AI integration'
    ]
  },
  {
    _type: 'workExperience',
    position: 'Senior Mobile Developer',
    company: 'luupli.com',
    location: 'Remote',
    startDate: '2021-04-01',
    endDate: '2024-03-01',
    responsibilities: [
      'Led the creation of a React Native mobile app with Material UI, boosting community engagement by 45% for Luupli\'s social media e-commerce platform serving underserved creators.',
      'Engineered advanced UI features including video playback, real-time notifications, and interactive feeds using React Navigation, Redux Toolkit, and TypeScript, boosting user retention by over 60% and enhancing authentic user interactions.',
      'Integrated secure e-commerce functionalities with RESTful APIs to enable influencer monetization, product discovery, and in-app purchasing, driving a 40% increase in transactional activity during the beta phase, aligning with Luupli\'s mission to empower creators.',
      'Mentored junior mobile developers and led code reviews, fostering high code quality and team growth, while coordinating cross-functional Agile teams with designers and product managers to deliver features ahead of schedule in five consecutive sprints, improving project efficiency by 30%.'
    ],
    technologies: ['React Native', 'Material UI', 'Redux Toolkit', 'TypeScript', 'RESTful APIs'],
    achievements: [
      'Boosted community engagement by 45%',
      'Increased user retention by over 60%',
      'Drove 40% increase in transactional activity',
      'Improved project efficiency by 30%'
    ]
  },
  {
    _type: 'workExperience',
    position: 'Full-Stack Developer',
    company: 'Teamally.com',
    location: 'Remote',
    startDate: '2017-04-01',
    endDate: '2020-11-01',
    responsibilities: [
      'Built and deployed production-grade platforms across industries including logistics (Juba Group), finance (Libra, Tuaneka), social media marketing (Rankit), and coworking spaces (Zulu Desk) using Next.js, Node.js, and Django, impacting over 5,000 users.',
      'Led end-to-end architecture and deployment of platforms like Bookelu and TypingTest by implementing SEO best practices, including structured, accessible UIs and performance optimizations that achieved 90+ Lighthouse scores and sub-second Time to Interactive via Next.js SSR.',
      'Designed secure RESTful APIs and real-time services for financial and e-commerce platforms, enabling secure payment transactions, invoicing, and user authentication with JWT and OAuth 2.0, processing over 400 transactions monthly with zero security breaches.',
      'Achieved 99.9% service uptime and reduced deployment times by 60% through Agile collaboration, managing Git workflows, conducting code reviews, and automating deployment pipelines with Docker, GitHub Actions, while prioritizing user-centered design.'
    ],
    technologies: ['Next.js', 'Node.js', 'Django', 'RESTful APIs', 'JWT', 'OAuth 2.0', 'Docker', 'GitHub Actions'],
    achievements: [
      'Impacted over 5,000 users',
      'Achieved 90+ Lighthouse scores',
      'Processed 400+ transactions monthly with zero security breaches',
      'Achieved 99.9% service uptime',
      'Reduced deployment times by 60%'
    ]
  },
  {
    _type: 'workExperience',
    position: 'Software Developer Intern',
    company: 'Microverse',
    location: 'San Francisco',
    startDate: '2022-01-01',
    endDate: '2022-06-01',
    responsibilities: [
      'Collaborated in a global remote team to design and build an ongoing analytics dashboard for Microverse learners, delivering real-time insights on student progress, assignments, and performance metrics using React.js, D3.js.',
      'Integrated Node.js with Azure cloud services to build scalable backend APIs, enabling seamless data exchange and improving application performance by 25% through optimized server-side processing for a remote development environment.'
    ],
    technologies: ['React.js', 'D3.js', 'Node.js', 'Azure'],
    achievements: [
      'Built real-time analytics dashboard',
      'Improved application performance by 25%'
    ]
  },
  {
    _type: 'workExperience',
    position: 'Software Engineer Intern',
    company: 'AmalTech GmbH',
    location: 'Remote',
    startDate: '2021-03-01',
    endDate: '2021-09-01',
    responsibilities: [
      'Developed a scalable back-end for a Community Learning Platform using Python and Django, implementing secure RESTful APIs and integrating PostgreSQL to manage user data and course materials, reducing API response times by 15% and supporting 300+ users.',
      'Built responsive front-end interfaces with React.js, leveraging Redux for state management to create dynamic course dashboards, improving user engagement by 30% and achieving cross-device compatibility.'
    ],
    technologies: ['Python', 'Django', 'PostgreSQL', 'React.js', 'Redux'],
    achievements: [
      'Reduced API response times by 15%',
      'Supported 300+ users',
      'Improved user engagement by 30%'
    ]
  }
];

// Education Data from Resume
const educationData = [
  {
    _type: 'education',
    institution: 'Colorado State University',
    degree: 'Master\'s',
    field: 'Electrical Engineering',
    startDate: '2023-08-01',
    endDate: '2025-05-01',
    gpa: '3.7',
    coursework: [
      'AI for Software Engineering',
      'Embedded Systems and Machine learning',
      'Computer Architecture'
    ],
    achievements: [
      'Graduated with distinction',
      'Focus on AI and Machine Learning applications'
    ],
    location: 'Colorado, USA'
  },
  {
    _type: 'education',
    institution: 'Kwame Nkrumah University of Science and Technology',
    degree: 'Bachelor\'s',
    field: 'Physics',
    startDate: '2017-08-01',
    endDate: '2021-11-01',
    gpa: '3.5',
    coursework: [
      'Intro to Python',
      'Intro to C++',
      'Intro to Java',
      'Intro to Microprocessor',
      'Intro to compiler'
    ],
    achievements: [
      'Strong foundation in programming and computational physics',
      'Active in technology and engineering societies'
    ],
    location: 'Ghana'
  }
];

// Certifications Data from Resume
const certificationsData = [
  {
    _type: 'certifications',
    title: 'Machine Learning & AI Engineer',
    issuer: 'Professional Certification Body',
    date: '2024-01-01',
    type: 'AI/ML',
    description: 'Comprehensive certification covering machine learning algorithms, neural networks, and AI application development.',
    skills: ['Machine Learning', 'Neural Networks', 'Deep Learning', 'TensorFlow', 'PyTorch']
  },
  {
    _type: 'certifications',
    title: 'Data Structure and Algorithm',
    issuer: 'Technical Certification Institute',
    date: '2023-06-01',
    type: 'Programming',
    description: 'Advanced certification in data structures, algorithms, and computational complexity analysis.',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving', 'Optimization', 'Complexity Analysis']
  },
  {
    _type: 'certifications',
    title: 'Natural Language Processing and Artificial Intelligence',
    issuer: 'AI Certification Institute',
    date: '2024-03-01',
    type: 'AI/ML',
    description: 'Specialized certification in NLP techniques, language models, and AI-powered text processing.',
    skills: ['NLP', 'Language Models', 'Text Processing', 'Sentiment Analysis', 'Chatbots']
  }
];

// Projects Data (AI-focused)
const projectsData = [
  {
    _type: 'works',
    title: 'Resume AI - Intelligent Resume Tailoring System',
    description: 'A cutting-edge AI-powered platform that optimizes professional resumes using advanced NLP, GPT, and machine learning. Features resume parsing, job analysis, skills gap identification, and ATS optimization with 95% accuracy.',
    date: '2025-01-01',
    tags: ['AI/ML', 'Full-Stack'],
    projectLink: 'https://github.com/hislordshipprof/resume-ai-optimizer',
    codeLink: 'https://github.com/hislordshipprof/resume-ai-optimizer',
    imgUrl: null // Will be set to use the image from assets
  },
  {
    _type: 'works',
    title: 'Full Stack Uber Clone',
    description: 'A comprehensive mobile application built with React Native, featuring live location tracking, Google Maps integration, Stripe payments, and PostgreSQL backend. Includes onboarding, authentication, ride booking, and payment processing.',
    date: '2024-12-01',
    tags: ['Mobile App', 'Full-Stack'],
    projectLink: 'https://github.com/hislordshipprof/ReactNative_UberClone',
    codeLink: 'https://github.com/hislordshipprof/ReactNative_UberClone',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'IntervuAI - AI Interview Preparation',
    description: 'An AI-powered React Native app that simulates realistic job interviews using Vapi AI voice technology and Google Gemini. Provides real-time feedback, detailed transcripts, and personalized improvement suggestions.',
    date: '2024-11-15',
    tags: ['AI/ML', 'Mobile App'],
    projectLink: 'https://github.com/hislordshipprof/ReactNative_AI_Interview_App',
    codeLink: 'https://github.com/hislordshipprof/ReactNative_AI_Interview_App',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'Movie Finder App with Extensive Search',
    description: 'A React Native + Appwrite-powered application that enables users to search, rank, and explore movies in real-time. Features a popularity algorithm, extensive search capabilities, and elegant UI built with TypeScript and Tailwind CSS.',
    date: '2024-10-20',
    tags: ['Mobile App'],
    projectLink: 'https://github.com/hislordshipprof/ReactNativeMovieApp',
    codeLink: 'https://github.com/hislordshipprof/ReactNativeMovieApp',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'Student Management System',
    description: 'A full-stack web application for educational institutions built with Django and React. Features user role management, student records, attendance tracking, performance analytics, and responsive dashboard interfaces.',
    date: '2024-09-10',
    tags: ['Full-Stack', 'Web App'],
    projectLink: 'https://github.com/hislordshipprof/hislordshipprof-student_management_app-',
    codeLink: 'https://github.com/hislordshipprof/hislordshipprof-student_management_app-',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'Blockchain Web Application',
    description: 'A modern Web3 blockchain application enabling secure cryptocurrency transactions using Next.js, Web3.js, and MetaMask integration. Features wallet authentication, transaction management, and responsive UI design.',
    date: '2024-08-25',
    tags: ['Web App', 'DevSecOps'],
    projectLink: 'https://github.com/hislordshipprof/Blockchain',
    codeLink: 'https://github.com/hislordshipprof/Blockchain',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'React Fitness Training App',
    description: 'A comprehensive fitness tracking application built with React, showcasing categorized exercise routines with animations, progress tracking, and personalized workout recommendations for fitness enthusiasts.',
    date: '2024-07-15',
    tags: ['Web App'],
    projectLink: 'https://github.com/hislordshipprof/React-Fitness-App',
    codeLink: 'https://github.com/hislordshipprof/React-Fitness-App',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'NFT Marketplace - Modern UI/UX',
    description: 'A cross-platform NFT marketplace built with React Native and Expo. Features NFT browsing, buying/selling functionality, blockchain integration, and modern UI/UX design following the latest mobile app standards.',
    date: '2024-06-30',
    tags: ['Mobile App'],
    projectLink: 'https://github.com/hislordshipprof/React-native-NFT-APP',
    codeLink: 'https://github.com/hislordshipprof/React-native-NFT-APP',
    imgUrl: null
  },
  {
    _type: 'works',
    title: 'Hpal Real Estate Platform',
    description: 'A modern real estate web application for browsing, renting, and managing property listings. Built with React, featuring real-time property filtering, visual previews, rental analytics, and responsive design.',
    date: '2024-05-20',
    tags: ['Web App'],
    projectLink: 'https://github.com/hislordshipprof/Hpal-RealEstate',
    codeLink: 'https://github.com/hislordshipprof/Hpal-RealEstate',
    imgUrl: null
  }
];

// About Data (Professional Summary)
const aboutData = [
  {
    _type: 'abouts',
    title: 'Full-Stack Engineer',
    description: 'Frontend-focused software engineer with extensive experience in crafting engaging user interfaces using React and optimizing performance for large-scale applications.',
    imgUrl: null
  },
  {
    _type: 'abouts',
    title: 'AI/ML Developer', 
    description: 'Specialized in integrating AI and machine learning solutions into web applications, with expertise in OpenAI APIs, natural language processing, and intelligent user interfaces.',
    imgUrl: null
  },
  {
    _type: 'abouts',
    title: 'EdTech Specialist',
    description: 'Passionate about leveraging technology to enhance learning experiences, building AI-powered educational platforms that improve student engagement and comprehension.',
    imgUrl: null
  },
  {
    _type: 'abouts',
    title: 'DevSecOps Engineer',
    description: 'Expert in secure infrastructure automation, CI/CD pipelines, and cloud security best practices, ensuring robust and scalable deployment architectures.',
    imgUrl: null
  }
];

// Skills Data
const skillsData = [
  {
    _type: 'skills',
    name: 'React',
    bgColor: '#61DAFB',
    icon: null
  },
  {
    _type: 'skills', 
    name: 'Next.js',
    bgColor: '#000000',
    icon: null
  },
  {
    _type: 'skills',
    name: 'TypeScript',
    bgColor: '#3178C6',
    icon: null
  },
  {
    _type: 'skills',
    name: 'Python',
    bgColor: '#3776AB',
    icon: null
  },
  {
    _type: 'skills',
    name: 'Node.js',
    bgColor: '#339933',
    icon: null
  },
  {
    _type: 'skills',
    name: 'React Native',
    bgColor: '#61DAFB',
    icon: null
  },
  {
    _type: 'skills',
    name: 'Django',
    bgColor: '#092E20',
    icon: null
  },
  {
    _type: 'skills',
    name: 'PostgreSQL',
    bgColor: '#336791',
    icon: null
  },
  {
    _type: 'skills',
    name: 'MongoDB',
    bgColor: '#47A248',
    icon: null
  },
  {
    _type: 'skills',
    name: 'OpenAI APIs',
    bgColor: '#412991',
    icon: null
  },
  {
    _type: 'skills',
    name: 'Docker',
    bgColor: '#2496ED',
    icon: null
  },
  {
    _type: 'skills',
    name: 'AWS',
    bgColor: '#FF9900',
    icon: null
  }
];

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...');

    // Create documents in batches
    console.log('📋 Adding work experience...');
    for (const exp of workExperienceData) {
      await client.create(exp);
    }

    console.log('🎓 Adding education...');
    for (const edu of educationData) {
      await client.create(edu);
    }

    console.log('🏆 Adding certifications...');
    for (const cert of certificationsData) {
      await client.create(cert);
    }

    console.log('💼 Adding projects...');
    for (const project of projectsData) {
      await client.create(project);
    }

    console.log('👨‍💻 Adding about sections...');
    for (const about of aboutData) {
      await client.create(about);
    }

    console.log('🛠️ Adding skills...');
    for (const skill of skillsData) {
      await client.create(skill);
    }

    console.log('✅ All data seeded successfully!');
    console.log('🚀 Your portfolio is now populated with your professional information.');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Run the seeding
seedData();
