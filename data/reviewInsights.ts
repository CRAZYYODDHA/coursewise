
import type { ReviewInsight } from '../types';

export const reviewInsights: ReviewInsight[] = [
    // PLATFORMS
    {
        id: 'coursera',
        type: 'Platform',
        praise: [
            "University partnerships lend credibility and academic rigor.",
            "Professional certificates from top companies like Google and Meta are highly valued.",
            "Structured learning paths and specializations are great for career goals.",
            "High-quality video lectures and production value."
        ],
        criticism: [
            "Subscription model can be expensive if not used frequently.",
            "Assignment grading can sometimes be slow or inconsistent, especially peer-graded ones.",
            "The platform's UI can feel complex or difficult to navigate.",
            "Some courses feel outdated or are not updated regularly."
        ],
        bestFor: "Learners seeking university-level courses, accredited certificates, and a structured path toward a specific career or degree.",
        verdict: "Coursera is the gold standard for academic-style online learning. Its partnerships with universities and top companies provide unparalleled authority, making it ideal for those who need recognized credentials for their career."
    },
    {
        id: 'udemy',
        type: 'Platform',
        praise: [
            "Massive, diverse library of courses on almost any topic imaginable.",
            "Frequent sales make courses extremely affordable.",
            "Lifetime access to purchased courses is a major plus.",
            "Practical, skill-based learning taught by real-world practitioners."
        ],
        criticism: [
            "Course quality can be highly variable; vetting is required.",
            "Lack of accreditation means certificates hold less weight with employers.",
            "The 'firehose' of content can be overwhelming without a clear goal.",
            "Instructor support can be hit-or-miss."
        ],
        bestFor: "Self-starters and lifelong learners who want to pick up specific skills affordably and value a wide selection over formal accreditation.",
        verdict: "Udemy is an enormous marketplace that excels in variety and value. If you can sift through the options to find quality instructors, it's an unbeatable resource for acquiring practical, on-demand skills without breaking the bank."
    },
    {
        id: 'edx',
        type: 'Platform',
        praise: [
            "Courses from the world's most prestigious universities (Harvard, MIT).",
            "Strong emphasis on computer science, data science, and engineering.",
            "Free audit track is fantastic for learning without financial commitment.",
            "MicroMasters and MicroBachelors programs offer a path to a real degree."
        ],
        criticism: [
            "The user interface can feel dated and less intuitive than competitors.",
            "Courses can be very academically rigorous and demanding, which may not suit all learners.",
            "The cost of verified certificates can be high.",
            "Limited selection in creative or non-technical fields."
        ],
        bestFor: "Academically-minded learners who want a challenging, university-level experience and access to courses from top-tier institutions.",
        verdict: "edX brings the Ivy League to your laptop. It's the best choice for those who crave intellectual rigor and want to experience a genuine university course, with the option to earn valuable credentials."
    },
    {
        id: 'skillshare',
        type: 'Platform',
        praise: [
            "Excellent for creative skills like illustration, design, and video production.",
            "Project-based approach encourages hands-on learning and portfolio building.",
            "Short, digestible class formats are easy to fit into a busy schedule.",
            "Strong sense of community and feedback from peers and instructors."
        ],
        criticism: [
            "Not suitable for deep, technical subjects like programming or data science.",
            "Quality of courses can vary, though generally high in creative fields.",
            "The mobile app can be less functional than the desktop experience.",
            "Certificates of completion are not a focus and hold little professional weight."
        ],
        bestFor: "Creatives, hobbyists, and freelancers looking to learn or refine practical skills in design, art, and content creation in a supportive, project-focused environment.",
        verdict: "Skillshare is a vibrant playground for creatives. Its subscription model and focus on short, project-based classes make it the perfect platform for hands-on learning and exploring your artistic side."
    },
    // COURSES
    {
        id: 'google-data-analytics',
        type: 'Course',
        praise: [
            "Provides a very strong, practical foundation for an entry-level data analyst role.",
            "Taught by actual Google employees, adding real-world credibility.",
            "Focuses on job-ready tools like SQL, R, and Tableau.",
            "The capstone project is a valuable portfolio piece."
        ],
        criticism: [
            "Some content, particularly around R, can feel a bit shallow.",
            "The peer-grading system can be frustrating and slow.",
            "Lacks deep dives into the statistical theory behind the methods.",
            "The platform's built-in coding environments can be buggy at times."
        ],
        bestFor: "Absolute beginners looking for a direct, structured path to an entry-level data analyst job with a highly recognized certificate.",
        verdict: "This is arguably the best entry point into the world of data analytics. It's a highly practical, job-focused program that gives you the skills, confidence, and a Google-branded certificate to get your foot in the door."
    },
    {
        id: 'complete-2024-web-dev',
        type: 'Course',
        praise: [
            "Angela Yu is an exceptionally engaging and clear instructor.",
            "Covers an enormous breadth of technologies in the web development landscape.",
            "Packed with projects, challenges, and real-world examples.",
            "Fantastic value for the amount of content provided, especially when on sale."
        ],
        criticism: [
            "The sheer volume can be overwhelming for some beginners.",
            "As a 'bootcamp' style course, it covers many topics but lacks deep specialization in any one area.",
            "Some later sections (like Web3) may feel less polished than the core HTML/CSS/JS content.",
            "Pacing can be very fast at times."
        ],
        bestFor: "Aspiring full-stack developers who want a comprehensive, all-in-one introduction to web development and enjoy a project-based, engaging teaching style.",
        verdict: "Angela Yu's bootcamp is a phenomenon for a reason. It's an incredibly engaging and comprehensive package that offers unparalleled value. If you want to go from zero to a competent junior developer, this is one of the best investments you can make."
    },
     {
        id: 'cs50x',
        type: 'Course',
        praise: [
            "Exceptional, university-level production quality and lectures by David Malan.",
            "Teaches you to 'think like a programmer' by focusing on fundamentals and problem-solving.",
            "The problem sets are famously challenging and deeply rewarding.",
            "Builds a rock-solid foundation in computer science that transcends any single language."
        ],
        criticism: [
            "Can be extremely difficult and time-consuming, especially for absolute beginners.",
            "The initial focus on C can be a steep learning curve.",
            "Requires a high degree of self-discipline to complete without a formal schedule.",
            "Less focused on building a 'portfolio' and more on understanding core concepts."
        ],
        bestFor: "Anyone serious about understanding the fundamentals of computer science, regardless of their background. Ideal for aspiring software engineers who want a strong theoretical foundation.",
        verdict: "CS50 is more than a course; it's a rite of passage. It is challenging, demanding, and brilliantly taught. Completing it will give you a fundamental understanding of computing that will serve you for your entire career. It is, without a doubt, one of the best introductions to computer science in the world."
    }
];
