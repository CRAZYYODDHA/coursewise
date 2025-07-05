
import type { Platform, Course } from '../types';

export const platforms: Platform[] = [
  {
    id: 'coursera',
    name: 'Coursera',
    tagline: 'Learn without limits.',
    summary: 'Partners with top universities and institutions worldwide to offer a vast catalog of courses, Specializations, and degrees across numerous subjects.',
    logo: 'https://img.coursera.org/app-meta/Coursera-Logo-600x600.png',
    website: 'https://www.coursera.org',
    pricingModel: 'Subscription (Coursera Plus), Per-Course Purchase',
    keyFeatures: ['University-accredited certificates', 'Professional Certificates from industry leaders (Google, Meta)', 'Degrees and MasterTrack programs', 'Guided projects for hands-on learning'],
  },
  {
    id: 'udemy',
    name: 'Udemy',
    tagline: 'Learn anything, anytime.',
    summary: 'A massive online course marketplace featuring over 200,000 courses taught by experts, covering an immense variety of skills from technical to creative.',
    logo: 'https://s.udemycdn.com/meta/default-meta-image-v2.png',
    website: 'https://www.udemy.com',
    pricingModel: 'Individual Course Purchase, Subscription (Udemy Personal Plan)',
    keyFeatures: ['Huge variety of topics', 'Frequent sales and discounts', 'Lifetime access to purchased courses', 'Q&A sections with instructors'],
  },
  {
    id: 'edx',
    name: 'edX',
    tagline: 'Transform your life through learning.',
    summary: 'A non-profit platform founded by Harvard and MIT, offering high-quality courses from leading global universities and institutions.',
    logo: 'https://www.edx.org/images/logos/edx-logo-elm.svg',
    website: 'https://www.edx.org',
    pricingModel: 'Free Audit Track, Verified Certificate Purchase',
    keyFeatures: ["Courses from top-tier universities (Harvard, MIT, etc.)", "MicroBachelors and MicroMasters programs", "Professional Certificates", "XSeries programs for deep-skill building"],
  },
  {
    id: 'skillshare',
    name: 'Skillshare',
    tagline: 'Explore your creativity.',
    summary: 'Primarily focused on creative and artistic skills like design, illustration, photography, and writing, with a subscription model for unlimited access.',
    logo: 'https://static.skillshare.com/assets/images/skillshare-logo-big-in-black.png',
    website: 'https://www.skillshare.com',
    pricingModel: 'Subscription-based',
    keyFeatures: ['Project-based learning community', 'Focus on creative and practical skills', 'Short, digestible class formats', 'Live sessions and student feedback'],
  },
  {
    id: 'pluralsight',
    name: 'Pluralsight',
    tagline: 'Build tech skills for today and tomorrow.',
    summary: 'A technology-focused learning platform offering expert-led courses on software development, IT ops, data science, and cybersecurity.',
    logo: 'https://www.pluralsight.com/etc.clientlibs/pluralsight/clientlibs/clientlib-main/resources/images/global/header/PS_logo.png',
    website: 'https://www.pluralsight.com',
    pricingModel: 'Subscription-based (Standard, Premium)',
    keyFeatures: ['Skill assessments to measure proficiency', 'Learning paths for guided skill development', 'Hands-on labs and interactive courses', 'Focused on enterprise and professional tech skills'],
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    tagline: 'Unlock new skills. Advance your career.',
    summary: 'An online learning platform integrated with LinkedIn, offering video courses taught by industry experts across business, creative, and technical skills.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2048px-LinkedIn_Logo.svg.png',
    website: 'https://www.linkedin.com/learning',
    pricingModel: 'Subscription-based (often via LinkedIn Premium)',
    keyFeatures: ['Integration with your LinkedIn profile', 'Certificates of completion to showcase', 'Courses in multiple languages', 'Learning paths tailored to career goals'],
  }
];

export const courses: Course[] = [
  // Coursera
  {
    id: 'google-data-analytics',
    name: 'Google Data Analytics Professional Certificate',
    platformId: 'coursera',
    description: 'A comprehensive program by Google to prepare for a career in data analytics. Covers cleaning, analyzing, and visualizing data.',
    instructor: { name: 'Google Career Certificates' },
    tags: ['Data Analytics', 'Beginner', 'SQL', 'Tableau'],
    reviewDistribution: [
      { name: 'Hands-on Projects', percentage: 35 },
      { name: 'Career Opportunities', percentage: 25 },
      { name: 'Beginner-Friendly', percentage: 20 },
      { name: 'Instructor Quality', percentage: 15 },
      { name: 'Pacing', percentage: 5 },
    ]
  },
  {
    id: 'meta-frontend-developer',
    name: 'Meta Front-End Developer Professional Certificate',
    platformId: 'coursera',
    description: 'Learn the fundamentals of front-end development with React, from the experts at Meta.',
    instructor: { name: 'Meta Staff' },
    tags: ['Web Development', 'React', 'JavaScript', 'Front-End'],
    reviewDistribution: [
      { name: 'Modern Tech Stack', percentage: 40 },
      { name: 'Project Portfolio', percentage: 30 },
      { name: 'In-depth React', percentage: 20 },
      { name: 'Community Support', percentage: 10 },
    ]
  },
  {
    id: 'python-for-everybody',
    name: 'Python for Everybody Specialization',
    platformId: 'coursera',
    description: 'A legendary course by Dr. Chuck that teaches the fundamentals of programming using Python 3.',
    instructor: { name: 'Charles Russell Severance', title: 'Clinical Professor' },
    tags: ['Python', 'Programming', 'Beginner', 'Web Scraping'],
     reviewDistribution: [
      { name: 'Excellent Teaching', percentage: 50 },
      { name: 'Solid Foundation', percentage: 25 },
      { name: 'Great Pacing', percentage: 15 },
      { name: 'Helpful Community', percentage: 10 },
    ]
  },
  {
    id: 'machine-learning-ng',
    name: 'Machine Learning',
    platformId: 'coursera',
    description: 'The highly influential foundational machine learning course by Andrew Ng, covering theory and practical applications.',
    instructor: { name: 'Andrew Ng', title: 'Professor, Stanford University' },
    tags: ['Machine Learning', 'AI', 'Algorithms', 'Octave/MATLAB'],
     reviewDistribution: [
      { name: 'Theoretical Depth', percentage: 45 },
      { name: 'Foundational Concepts', percentage: 30 },
      { name: 'Clear Explanations', percentage: 20 },
      { name: 'Challenging Assignments', percentage: 5 },
    ]
  },
  {
    id: 'deep-learning-specialization',
    name: 'Deep Learning Specialization',
    platformId: 'coursera',
    description: 'A five-course specialization by deeplearning.ai that provides a pathway for you to gain the knowledge and skills to apply deep learning to your problems.',
    instructor: { name: 'Andrew Ng', title: 'Founder, DeepLearning.AI' },
    tags: ['Deep Learning', 'AI', 'Neural Networks', 'TensorFlow'],
     reviewDistribution: [
      { name: 'Cutting-Edge Content', percentage: 40 },
      { name: 'Practical Applications', percentage: 25 },
      { name: 'Expert Instruction', percentage: 20 },
      { name: 'Strong Community', percentage: 15 },
    ]
  },

  // Udemy
  {
    id: 'complete-2024-web-dev',
    name: 'The Complete 2024 Web Development Bootcamp',
    platformId: 'udemy',
    description: 'A massive, all-in-one course covering everything from HTML and CSS to Node.js, React, and Web3.',
    instructor: { name: 'Dr. Angela Yu' },
    tags: ['Web Development', 'Full-Stack', 'Bootcamp', 'React'],
    reviewDistribution: [
      { name: 'Content Volume', percentage: 45 },
      { name: 'Project Variety', percentage: 25 },
      { name: 'Engaging Instructor', percentage: 20 },
      { name: 'Value for Money', percentage: 10 },
    ]
  },
  {
    id: 'react-the-complete-guide',
    name: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    platformId: 'udemy',
    description: 'The most popular and comprehensive React course on the platform, constantly updated.',
    instructor: { name: 'Maximilian Schwarzmüller' },
    tags: ['React', 'Web Development', 'Redux', 'JavaScript'],
    reviewDistribution: [
      { name: 'In-depth Explanations', percentage: 40 },
      { name: 'Comprehensive', percentage: 30 },
      { name: 'Practical Examples', percentage: 20 },
      { name: 'Frequent Updates', percentage: 10 },
    ]
  },
  {
    id: 'aws-certified-solutions-architect',
    name: 'Ultimate AWS Certified SAA-C03',
    platformId: 'udemy',
    description: 'A highly-rated, exam-focused course to help you pass the AWS Solutions Architect Associate certification.',
    instructor: { name: 'Stephane Maarek' },
    tags: ['AWS', 'Cloud', 'Certification', 'DevOps'],
     reviewDistribution: [
      { name: 'Exam-focused', percentage: 55 },
      { name: 'Clear & Concise', percentage: 25 },
      { name: 'Hands-on Labs', percentage: 15 },
      { name: 'Practice Tests', percentage: 5 },
    ]
  },
  {
    id: '100-days-of-code',
    name: '100 Days of Code: The Complete Python Pro Bootcamp',
    platformId: 'udemy',
    description: 'A project-based bootcamp that guides you through building 100 Python projects in 100 days.',
    instructor: { name: 'Dr. Angela Yu' },
    tags: ['Python', 'Programming', 'Bootcamp', 'Projects'],
    reviewDistribution: [
      { name: 'Project-Based Learning', percentage: 50 },
      { name: 'Consistent Practice', percentage: 25 },
      { name: 'Engaging Content', percentage: 15 },
      { name: 'Broad Topic Coverage', percentage: 10 },
    ]
  },
  {
    id: 'js-algorithms-data-structures',
    name: 'JavaScript Algorithms and Data Structures Masterclass',
    platformId: 'udemy',
    description: 'A deep dive into the fundamentals of algorithms and data structures using JavaScript.',
    instructor: { name: 'Colt Steele' },
    tags: ['JavaScript', 'Algorithms', 'Data Structures', 'Interviews'],
     reviewDistribution: [
      { name: 'Problem-Solving Skills', percentage: 40 },
      { name: 'Clear Explanations', percentage: 30 },
      { name: 'Interview Prep', percentage: 20 },
      { name: 'Solid Code Examples', percentage: 10 },
    ]
  },

  // edX
    {
    id: 'cs50x',
    name: "CS50's Introduction to Computer Science",
    platformId: 'edx',
    description: "Harvard's legendary introduction to the intellectual enterprises of computer science and the art of programming.",
    instructor: { name: 'David J. Malan', title: 'Professor, Harvard University' },
    tags: ['Computer Science', 'Programming', 'C', 'Python'],
    reviewDistribution: [
      { name: 'Challenging Problems', percentage: 40 },
      { name: 'Exceptional Lectures', percentage: 30 },
      { name: 'Strong Foundation', percentage: 20 },
      { name: 'Thriving Community', percentage: 10 },
    ]
  },
  {
    id: 'introduction-to-linux',
    name: 'Introduction to Linux',
    platformId: 'edx',
    description: 'A free course from The Linux Foundation that provides a good working knowledge of Linux, from both a graphical and command line perspective.',
    instructor: { name: 'The Linux Foundation' },
    tags: ['Linux', 'IT', 'Operating Systems', 'Command Line'],
    reviewDistribution: [
      { name: 'Practical Skills', percentage: 45 },
      { name: 'Beginner-Friendly', percentage: 25 },
      { name: 'Free & Accessible', percentage: 20 },
      { name: 'Official Content', percentage: 10 },
    ]
  },
  {
    id: 'gt-analytics',
    name: 'Analytics: Essential Tools and Methods',
    platformId: 'edx',
    description: "Part of Georgia Tech's Analytics MicroMasters program, this course covers foundational concepts and tools in analytics like R, Python, and SQL.",
    instructor: { name: 'Georgia Institute of Technology' },
    tags: ['Data Analytics', 'R', 'Python', 'SQL'],
    reviewDistribution: [
      { name: 'Academic Rigor', percentage: 40 },
      { name: 'Comprehensive Curriculum', percentage: 30 },
      { name: 'University-Level', percentage: 20 },
      { name: 'Methodology Focus', percentage: 10 },
    ]
  },

  // Skillshare
  {
    id: 'fundamentals-of-graphic-design',
    name: 'Graphic Design Basics: Core Principles for Visual Design',
    platformId: 'skillshare',
    description: 'Learn the essential principles of graphic design from leading designers and create compelling visual projects.',
    instructor: { name: 'Ellen Lupton & Jennifer Cole Phillips' },
    tags: ['Graphic Design', 'Creative', 'Beginner', 'UI/UX'],
    reviewDistribution: [
        { name: 'Project-Based', percentage: 40 },
        { name: 'Creative Community', percentage: 25 },
        { name: 'Actionable Skills', percentage: 20 },
        { name: 'Short & Focused', percentage: 15 },
    ]
  },
  {
    id: 'intro-to-procreate',
    name: 'Intro to Procreate: Illustrating on the iPad',
    platformId: 'skillshare',
    description: 'A top-rated class for beginners to learn the fundamentals of Procreate on the iPad from a professional illustrator.',
    instructor: { name: 'Brooke Glaser' },
    tags: ['Illustration', 'Procreate', 'iPad', 'Digital Art'],
    reviewDistribution: [
        { name: 'Engaging Projects', percentage: 35 },
        { name: 'Clear for Beginners', percentage: 30 },
        { name: 'Helpful Tips & Tricks', percentage: 25 },
        { name: 'Instructor Style', percentage: 10 },
    ]
  },

  // Pluralsight
  {
    id: 'c-sharp-fundamentals',
    name: 'C# Fundamentals',
    platformId: 'pluralsight',
    description: 'A comprehensive path for developers new to C#, covering everything from the basics of the language to advanced features.',
    instructor: { name: 'Scott Allen' },
    tags: ['C#', '.NET', 'Programming', 'Software Development'],
    reviewDistribution: [
        { name: 'Structured Path', percentage: 45 },
        { name: 'Expert Instruction', percentage: 30 },
        { name: 'In-depth Content', percentage: 15 },
        { name: 'Skill IQ Checks', percentage: 10 },
    ]
  },
  {
    id: 'angular-getting-started',
    name: 'Angular: Getting Started',
    platformId: 'pluralsight',
    description: 'The definitive "getting started" guide for Angular developers, covering components, templates, data binding, and more.',
    instructor: { name: 'Deborah Kurata' },
    tags: ['Angular', 'Web Development', 'TypeScript', 'Front-End'],
    reviewDistribution: [
        { name: 'Clear & Structured', percentage: 50 },
        { name: 'Best Practices', percentage: 20 },
        { name: 'Expert Author', percentage: 20 },
        { name: 'Code Examples', percentage: 10 },
    ]
  },
  
  // LinkedIn Learning
  {
    id: 'strategic-thinking',
    name: 'Strategic Thinking',
    platformId: 'linkedin-learning',
    description: 'Learn how to think strategically, manage complexity, and develop a competitive advantage for your organization and your career.',
    instructor: { name: 'Dorie Clark' },
    tags: ['Business', 'Strategy', 'Leadership', 'Professional Development'],
    reviewDistribution: [
        { name: 'Actionable Advice', percentage: 35 },
        { name: 'Engaging Speaker', percentage: 30 },
        { name: 'Concise & Clear', percentage: 20 },
        { name: 'Career-focused', percentage: 15 },
    ]
  },
  {
    id: 'learning-python',
    name: 'Learning Python',
    platformId: 'linkedin-learning',
    description: 'A popular and foundational course on Python 3 that covers the language from the ground up.',
    instructor: { name: 'Joe Marini' },
    tags: ['Python', 'Programming', 'Beginner', 'Software Development'],
    reviewDistribution: [
        { name: 'Great for Beginners', percentage: 40 },
        { name: 'Well-Structured', percentage: 25 },
        { name: 'Clear Examples', percentage: 20 },
        { name: 'Good Pace', percentage: 15 },
    ]
  }
];
