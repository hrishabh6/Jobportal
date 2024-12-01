export const themes = [
    { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
    { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
    {
      value: "system",
      label: "System",
      icon: "/assets/icons/computer.svg",
    },
  ];

  export const THEME_NAMES = {
    DARK: "dark",
    LIGHT: "light",
    SYSTEM: "system",
  };
  
export  const dummyJobs = [
    {
      title: "Frontend Developer",
      description: "We are looking for a skilled frontend developer to join our team. The ideal candidate will have experience in building responsive web applications.",
      company: "Google", 
      location: "Remote",
      employmentType: "Full-time",
      salary: "$70k-$90k",
      requirements: [
        "Proficient in HTML, CSS, and JavaScript",
        "Experience with React or Vue.js",
        "Familiarity with version control tools like Git"
      ],
      experience: "2+ years",
      positions: 3,
      
    },
    {
      title: "Backend Developer",
      description: "Looking for a backend developer to help build robust server-side applications. The role involves working with APIs and databases.",
      company: "Netflix",
      location: "New York",
      employmentType: "Full-time",
      salary: "$80k-$100k",
      requirements: [
        "Experience with Node.js and Express",
        "Strong knowledge of databases (MongoDB, MySQL)",
        "Familiar with RESTful APIs and Microservices"
      ],
      experience: "3+ years",
      positions: 2,
      
    },
    {
      title: "Graphic Designer",
      description: "A creative graphic designer needed to create visual content for websites, marketing materials, and social media platforms.",
      company: "Microsoft",
      location: "Remote",
      employmentType: "Part-time",
      salary: "$30k-$40k",
      requirements: [
        "Proficient in Adobe Creative Suite (Photoshop, Illustrator, etc.)",
        "Experience in designing for digital platforms",
        "Strong portfolio showcasing graphic design work"
      ],
      experience: "1+ years",
      positions: 1,
      
    },
    {
      title: "Marketing Manager",
      description: "We need a marketing manager to lead and execute marketing campaigns, analyze trends, and optimize marketing strategies.",
      company: "Amazon",
      location: "San Francisco",
      employmentType: "Full-time",
      salary: "$90k-$120k",
      requirements: [
        "Strong experience in digital marketing",
        "Proven track record in campaign management",
        "Ability to analyze data and use insights to improve performance"
      ],
      experience: "5+ years",
      positions: 1,
    },
    {
      title: "UI/UX Designer",
      description: "Design beautiful and user-friendly interfaces for web applications.",
      company: "Company3",
      location: "San Francisco",
      employmentType: "Part-time",
      salary: "$50k-$70k",
      experience: "1+ years",
      requirements: ["Figma", "Adobe XD", "UI Design", "User Research"],
      postedBy: "User3",
      positions: 1,
    },
    {
      title: "DevOps Engineer",
      description: "Manage deployment pipelines, server infrastructure, and CI/CD automation.",
      company: "Company4",
      location: "Chicago",
      employmentType: "Contract",
      salary: "$90k-$110k",
      experience: "4+ years",
      requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      postedBy: "User4",
      positions: 2,
    }
  ];