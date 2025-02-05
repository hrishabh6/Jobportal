import mongoose from 'mongoose';




export const seedData = [
    // Admin Users (Recruiters)
    [
        {
            name: "Rajesh Patel",
            username: "rajesh_recruiter",
            email: "rajesh.patel@techindia.com",
            phoneNumber: 9876543210,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Senior HR Professional with 10+ years of tech recruitment experience",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Priya Sharma",
            username: "priya_hr",
            email: "priya.sharma@softwaresolutions.in",
            phoneNumber: 8765432109,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Passionate about connecting top talent with innovative companies",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Amit Kumar",
            username: "amit_recruit",
            email: "amit.kumar@innovatetech.in",
            phoneNumber: 7654321098,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Tech recruitment specialist focusing on emerging technologies",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Neha Gupta",
            username: "neha_recruiter",
            email: "neha.gupta@cloudnative.com",
            phoneNumber: 9988776655,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Cloud computing recruitment expert",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Sanjay Mehta",
            username: "sanjay_hr",
            email: "sanjay.mehta@datatech.in",
            phoneNumber: 8877665544,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Data science and AI recruitment specialist",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Divya Reddy",
            username: "divya_recruit",
            email: "divya.reddy@fintech.com",
            phoneNumber: 7766554433,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "FinTech talent acquisition expert",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Vikram Singh",
            username: "vikram_hr",
            email: "vikram.singh@cybersecurity.in",
            phoneNumber: 9655443322,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Cybersecurity recruitment professional",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Ananya Patel",
            username: "ananya_recruiter",
            email: "ananya.patel@healthtech.com",
            phoneNumber: 8544332211,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Healthcare technology talent acquisition",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Rohan Sharma",
            username: "rohan_hr",
            email: "rohan.sharma@edtech.in",
            phoneNumber: 7433221100,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "EdTech recruitment and talent sourcing",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Sneha Kumari",
            username: "sneha_recruit",
            email: "sneha.kumari@ecommerce.com",
            phoneNumber: 9322110099,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "E-commerce and digital marketing recruitment",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Arjun Reddy",
            username: "arjun_hr",
            email: "arjun.reddy@startups.in",
            phoneNumber: 8211009988,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Startup ecosystem talent acquisition",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Meera Nair",
            username: "meera_recruiter",
            email: "meera.nair@blockchain.com",
            phoneNumber: 7100998877,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Blockchain and cryptocurrency recruitment",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Karthik Iyer",
            username: "karthik_hr",
            email: "karthik.iyer@gamedev.in",
            phoneNumber: 9098776655,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Gaming and interactive media talent sourcing",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Pooja Malhotra",
            username: "pooja_recruit",
            email: "pooja.malhotra@aerospace.com",
            phoneNumber: 8987665544,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Aerospace and engineering recruitment specialist",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Nikhil Desai",
            username: "nikhil_hr",
            email: "nikhil.desai@telco.in",
            phoneNumber: 7876554433,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Telecommunications talent acquisition",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Swati Patil",
            username: "swati_recruiter",
            email: "swati.patil@consulting.com",
            phoneNumber: 9765443322,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Management consulting recruitment expert",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Rahul Khanna",
            username: "rahul_hr",
            email: "rahul.khanna@robotics.in",
            phoneNumber: 8654332211,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Robotics and automation talent sourcing",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Kritika Gupta",
            username: "kritika_recruit",
            email: "kritika.gupta@biotech.com",
            phoneNumber: 7543221100,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Biotechnology and pharmaceutical recruitment",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Vivek Nambiar",
            username: "vivek_hr",
            email: "vivek.nambiar@renewable.in",
            phoneNumber: 9432110099,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Renewable energy talent acquisition",
                company: null,
                profilePhoto: ""
            }
        },
        {
            name: "Lakshmi Menon",
            username: "lakshmi_recruiter",
            email: "lakshmi.menon@mediatech.com",
            phoneNumber: 8321009988,
            password: "hashedPassword123",
            role: "recruiter",
            profile: {
                bio: "Media and entertainment technology recruitment",
                company: null,
                profilePhoto: ""
            }
        }
    ],

    // Companies
    [
        {
            name: "TechIndia Solutions",
            description: "Leading software development and consulting company",
            website: "https://www.techindiasolve.com",
            linkedin: "https://linkedin.com/company/techindia",
            type: "Technology",
            size: "201-500",
            bio: "Empowering businesses through innovative technology solutions",
            location: "Bangalore, Karnataka",
            logo: "/logos/techindia.png",
            userId: null
        },
        {
            name: "InnovativeSoft Pvt Ltd",
            description: "Cutting-edge software solutions for global enterprises",
            website: "https://www.innovativesoft.in",
            linkedin: "https://linkedin.com/company/innovativesoft",
            type: "Technology",
            size: "51-200",
            bio: "Driving digital transformation with advanced software engineering",
            location: "Hyderabad, Telangana",
            logo: "/logos/innovativesoft.png",
            userId: null
        },
        {
            name: "CloudNative Technologies",
            description: "Cloud computing and infrastructure solutions",
            website: "https://www.cloudnative.tech",
            linkedin: "https://linkedin.com/company/cloudnative",
            type: "Cloud Services",
            size: "101-250",
            bio: "Enabling digital transformation through cloud innovations",
            location: "Pune, Maharashtra",
            logo: "/logos/cloudnative.png",
            userId: null
        },
        {
            name: "DataTech Innovations",
            description: "Advanced data science and AI solutions",
            website: "https://www.datatech.ai",
            linkedin: "https://linkedin.com/company/datatechi",
            type: "Data Science",
            size: "51-100",
            bio: "Transforming data into actionable intelligence",
            location: "Mumbai, Maharashtra",
            logo: "/logos/datatech.png",
            userId: null
        },
        {
            name: "FinTech Global",
            description: "Financial technology and digital banking solutions",
            website: "https://www.fintechglobal.in",
            linkedin: "https://linkedin.com/company/fintechglobal",
            type: "FinTech",
            size: "101-250",
            bio: "Revolutionizing financial services through technology",
            location: "Chennai, Tamil Nadu",
            logo: "/logos/fintech.png",
            userId: null
        },
        {
            name: "CyberShield Security",
            description: "Comprehensive cybersecurity solutions",
            website: "https://www.cybershield.com",
            linkedin: "https://linkedin.com/company/cybershieldsec",
            type: "Cybersecurity",
            size: "50-100",
            bio: "Protecting digital assets with cutting-edge security technologies",
            location: "Gurgaon, Haryana",
            logo: "/logos/cybershield.png",
            userId: null
        },
        {
            name: "HealthTech Innovations",
            description: "Healthcare technology and digital health solutions",
            website: "https://www.healthtech.in",
            linkedin: "https://linkedin.com/company/healthtechinno",
            type: "Healthcare Technology",
            size: "51-200",
            bio: "Improving healthcare through innovative technological solutions",
            location: "Bangalore, Karnataka",
            logo: "/logos/healthtech.png",
            userId: null
        },
        {
            name: "EdTech Solutions",
            description: "Educational technology and e-learning platforms",
            website: "https://www.edtech.com",
            linkedin: "https://linkedin.com/company/edtechsol",
            type: "Education Technology",
            size: "101-250",
            bio: "Transforming education through digital learning technologies",
            location: "Delhi, NCR",
            logo: "/logos/edtech.png",
            userId: null
        },
        {
            name: "ECommerce Dynamics",
            description: "E-commerce platform and digital marketplace solutions",
            website: "https://www.ecommercedynamics.in",
            linkedin: "https://linkedin.com/company/ecommercedyn",
            type: "E-commerce",
            size: "201-500",
            bio: "Empowering businesses with comprehensive e-commerce solutions",
            location: "Bangalore, Karnataka",
            logo: "/logos/ecommerce.png",
            userId: null
        },
        {
            name: "StartUp Accelerator",
            description: "Startup ecosystem and innovation support",
            website: "https://www.startupaccelerator.in",
            linkedin: "https://linkedin.com/company/startupaccel",
            type: "Startup Ecosystem",
            size: "50-100",
            bio: "Nurturing and supporting innovative startup ventures",
            location: "Mumbai, Maharashtra",
            logo: "/logos/startupaccel.png",
            userId: null
        },
        {
            name: "BlockChain Innovations",
            description: "Blockchain and cryptocurrency solutions",
            website: "https://www.blockchaintech.com",
            linkedin: "https://linkedin.com/company/blockchaininn",
            type: "Blockchain",
            size: "51-100",
            bio: "Pioneering blockchain technologies and decentralized solutions",
            location: "Hyderabad, Telangana",
            logo: "/logos/blockchain.png",
            userId: null
        },
        {
            name: "GameDev Studios",
            description: "Video game development and interactive media",
            website: "https://www.gamedevstudios.in",
            linkedin: "https://linkedin.com/company/gamedevstu",
            type: "Gaming",
            size: "50-100",
            bio: "Creating immersive gaming experiences and interactive content",
            location: "Pune, Maharashtra",
            logo: "/logos/gamedev.png",
            userId: null
        },
        {
            name: "AeroTech Engineering",
            description: "Aerospace and advanced engineering solutions",
            website: "https://www.aerotech.com",
            linkedin: "https://linkedin.com/company/aerotecheng",
            type: "Aerospace",
            size: "101-250",
            bio: "Pushing the boundaries of aerospace and engineering innovation",
            location: "Bangalore, Karnataka",
            logo: "/logos/aerotech.png",
            userId: null
        },
        {
            name: "TelCo Innovations",
            description: "Telecommunications and network solutions",
            website: "https://www.telcoinnovations.in",
            linkedin: "https://linkedin.com/company/telcoinn",
            type: "Telecommunications",
            size: "201-500",
            bio: "Revolutionizing communication technologies and network infrastructures",
            location: "Delhi, NCR",
            logo: "/logos/telco.png",
            userId: null
        },
        {
            name: "ConsultPro Solutions",
            description: "Management consulting and business strategy",
            website: "https://www.consultpro.com",
            linkedin: "https://linkedin.com/company/consultprosol",
            type: "Consulting",
            size: "101-250",
            bio: "Providing strategic insights and transformative business solutions",
            location: "Mumbai, Maharashtra",
            logo: "/logos/consultpro.png",
            userId: null
        },
        {
            name: "RoboTech Innovations",
            description: "Robotics and automation solutions",
            website: "https://www.robotech.in",
            linkedin: "https://linkedin.com/company/robotechinno",
            type: "Robotics",
            size: "50-100",
            bio: "Developing advanced robotic systems and automation technologies",
            location: "Chennai, Tamil Nadu",
            logo: "/logos/robotech.png",
            userId: null
        },
        {
            name: "BioGen Technologies",
            description: "Biotechnology and pharmaceutical research",
            website: "https://www.biogen.com",
            linkedin: "https://linkedin.com/company/biogentech",
            type: "Biotechnology",
            size: "101-250",
            bio: "Innovating healthcare through cutting-edge biotechnological research",
            location: "Hyderabad, Telangana",
            logo: "/logos/biogen.png",
            userId: null
        },
        {
            name: "RenewPower Solutions",
            description: "Renewable energy and sustainable technologies",
            website: "https://www.renewpower.in",
            linkedin: "https://linkedin.com/company/renewpowersol",
            type: "Renewable Energy",
            size: "51-200",
            bio: "Driving sustainable energy solutions for a greener future",
            location: "Bangalore, Karnataka",
            logo: "/logos/renewpower.png",
            userId: null
        },
        {
            name: "MediaTech Innovations",
            description: "Media technology and digital content solutions",
            website: "https://www.mediatech.com",
            linkedin: "https://linkedin.com/company/mediatechinn",
            type: "Media Technology",
            size: "50-100",
            bio: "Transforming media and entertainment through innovative technologies",
            location: "Mumbai, Maharashtra",
            logo: "/logos/mediatech.png",
            userId: null
        }
    ],
      // Jobs (5 jobs for each company)
      [
        // Jobs for first 5 companies
        // TechIndia Solutions Jobs
        {
            title: "Senior Software Engineer",
            description: "Design and develop scalable enterprise applications",
            location: "Bangalore, Remote",
            employmentType: "Full-time",
            salary: "$80k-$120k per year",
            requirements: [
                "7+ years of software development experience",
                "Expertise in Java and Spring Boot",
                "Microservices architecture knowledge"
            ],
            experience: "7+ years",
            positions: 3,
            status: "open",
            details: "Join our elite team of engineers and work on cutting-edge projects",
            company: null,
            postedBy: null
        },
        {
            title: "DevOps Engineer",
            description: "Manage and optimize our cloud infrastructure",
            location: "Remote",
            employmentType: "Full-time",
            salary: "$90k-$130k per year",
            requirements: [
                "5+ years of DevOps experience",
                "AWS and Kubernetes expertise",
                "CI/CD pipeline management"
            ],
            experience: "5+ years",
            positions: 2,
            status: "open",
            details: "Help us streamline our deployment and infrastructure processes",
            company: null,
            postedBy: null
        },
        {
            title: "Cloud Security Specialist",
            description: "Implement and maintain robust cloud security protocols",
            location: "Bangalore, Hybrid",
            employmentType: "Full-time",
            salary: "$100k-$150k per year",
            requirements: [
                "6+ years of cloud security experience",
                "CISSP certification preferred",
                "Expertise in AWS Security and Compliance"
            ],
            experience: "6+ years",
            positions: 1,
            status: "open",
            details: "Secure our enterprise cloud infrastructure and protect against emerging threats",
            company: null,
            postedBy: null
        },
        {
            title: "Full Stack Developer",
            description: "Build and maintain complex web applications",
            location: "Bangalore, Onsite",
            employmentType: "Full-time",
            salary: "$75k-$110k per year",
            requirements: [
                "5+ years of full stack development",
                "Proficiency in React and Node.js",
                "Experience with microservices architecture"
            ],
            experience: "5+ years",
            positions: 2,
            status: "open",
            details: "Create innovative solutions for our enterprise clients",
            company: null,
            postedBy: null
        },
        {
            title: "AI/ML Research Scientist",
            description: "Develop advanced machine learning models",
            location: "Bangalore, Hybrid",
            employmentType: "Full-time",
            salary: "$120k-$180k per year",
            requirements: [
                "PhD in Computer Science or related field",
                "Expertise in deep learning frameworks",
                "Published research in AI/ML domains"
            ],
            experience: "7+ years",
            positions: 1,
            status: "open",
            details: "Push the boundaries of artificial intelligence research",
            company: null,
            postedBy: null
        },
         // CloudNative Technologies Jobs
    {
        title: "Cloud Infrastructure Engineer",
        description: "Design and manage scalable cloud infrastructure",
        location: "Pune, Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "6+ years of cloud infrastructure experience",
            "Advanced AWS and GCP certifications",
            "Expertise in Kubernetes and containerization"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Build robust and scalable cloud solutions for enterprise clients",
        company: null,
        postedBy: null
    },
    {
        title: "Cloud Security Specialist",
        description: "Implement comprehensive cloud security protocols",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of cloud security experience",
            "CISSP certification",
            "Advanced knowledge of cloud security frameworks"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Protect cloud infrastructure from emerging security threats",
        company: null,
        postedBy: null
    },
    {
        title: "Multi-Cloud Solutions Architect",
        description: "Design cross-cloud architectural solutions",
        location: "Pune, Hybrid",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "8+ years of multi-cloud architecture experience",
            "Certifications in AWS, Azure, and GCP",
            "Expert in cloud migration strategies"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Lead complex cloud transformation projects",
        company: null,
        postedBy: null
    },
    {
        title: "DevOps Cloud Engineer",
        description: "Implement and optimize cloud DevOps practices",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "5+ years of DevOps experience",
            "Expertise in CI/CD pipelines",
            "Strong scripting skills (Python, Bash)"
        ],
        experience: "5+ years",
        positions: 2,
        status: "open",
        details: "Streamline cloud deployment and infrastructure processes",
        company: null,
        postedBy: null
    },
    {
        title: "Cloud Data Engineering Manager",
        description: "Lead data infrastructure and analytics cloud solutions",
        location: "Pune, Onsite",
        employmentType: "Full-time",
        salary: "$120k-$180k per year",
        requirements: [
            "10+ years of data engineering experience",
            "Expert in big data cloud technologies",
            "Leadership experience in data teams"
        ],
        experience: "10+ years",
        positions: 1,
        status: "open",
        details: "Drive advanced data solutions in cloud environments",
        company: null,
        postedBy: null
    },

    // DataTech Innovations Jobs
    {
        title: "Senior Data Scientist",
        description: "Develop advanced machine learning models",
        location: "Mumbai, Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of data science experience",
            "PhD in Computer Science or related field",
            "Expert in machine learning algorithms"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Create cutting-edge AI and machine learning solutions",
        company: null,
        postedBy: null
    },
    {
        title: "AI Research Engineer",
        description: "Conduct advanced artificial intelligence research",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$110k-$170k per year",
        requirements: [
            "8+ years of AI research experience",
            "Published research in AI domains",
            "Expertise in deep learning frameworks"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Push boundaries of artificial intelligence technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Big Data Architect",
        description: "Design scalable data infrastructure solutions",
        location: "Mumbai, Onsite",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of big data architecture experience",
            "Expert in Hadoop and Spark ecosystems",
            "Advanced data modeling skills"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Create robust and scalable data processing architectures",
        company: null,
        postedBy: null
    },
    {
        title: "Data Engineering Lead",
        description: "Manage complex data engineering projects",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "6+ years of data engineering experience",
            "Strong cloud data platform skills",
            "Leadership in data infrastructure teams"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Lead data engineering transformation initiatives",
        company: null,
        postedBy: null
    },
    {
        title: "Machine Learning Operations (MLOps) Engineer",
        description: "Implement ML model deployment and monitoring",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "5+ years of MLOps experience",
            "Expertise in model deployment pipelines",
            "Strong cloud and containerization skills"
        ],
        experience: "5+ years",
        positions: 1,
        status: "open",
        details: "Optimize machine learning model lifecycle management",
        company: null,
        postedBy: null
    },
    {
        title: "FinTech Solutions Architect",
        description: "Design innovative financial technology solutions",
        location: "Chennai, Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of FinTech experience",
            "Deep understanding of financial systems",
            "Experience with blockchain and digital banking"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Transform financial services through cutting-edge technology",
        company: null,
        postedBy: null
    },
    {
        title: "Blockchain Developer",
        description: "Develop decentralized financial applications",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "5+ years of blockchain development",
            "Expert in Solidity and smart contract development",
            "Understanding of cryptocurrency ecosystems"
        ],
        experience: "5+ years",
        positions: 2,
        status: "open",
        details: "Create innovative blockchain solutions for financial sectors",
        company: null,
        postedBy: null
    },
    {
        title: "Cybersecurity Specialist",
        description: "Implement advanced security protocols for financial systems",
        location: "Chennai, Onsite",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of cybersecurity experience",
            "CISSP certification",
            "Expertise in financial system security"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Protect financial platforms from emerging cyber threats",
        company: null,
        postedBy: null
    },
    {
        title: "Digital Payment Systems Engineer",
        description: "Develop and optimize digital payment technologies",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "6+ years of payment systems experience",
            "Expert in API integration",
            "Understanding of global payment ecosystems"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Innovate digital payment solutions for modern financial services",
        company: null,
        postedBy: null
    },
    {
        title: "AI-Powered Financial Analyst",
        description: "Develop AI models for financial prediction and analysis",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "7+ years of financial analysis experience",
            "Expert in machine learning",
            "Deep understanding of financial markets"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Use AI to drive financial insights and strategies",
        company: null,
        postedBy: null
    },
     // CyberShield Security Jobs
     {
        title: "Senior Cybersecurity Architect",
        description: "Design comprehensive security infrastructure",
        location: "Gurgaon, Onsite",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "10+ years of cybersecurity experience",
            "CISSP and CISM certifications",
            "Expert in enterprise security architecture"
        ],
        experience: "10+ years",
        positions: 1,
        status: "open",
        details: "Lead enterprise-level security strategy and implementation",
        company: null,
        postedBy: null
    },
    {
        title: "Penetration Testing Specialist",
        description: "Conduct advanced security vulnerability assessments",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "7+ years of penetration testing experience",
            "OSCP certification",
            "Expertise in ethical hacking techniques"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Identify and mitigate potential security vulnerabilities",
        company: null,
        postedBy: null
    },
    {
        title: "Cloud Security Engineer",
        description: "Implement security protocols for cloud environments",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "6+ years of cloud security experience",
            "AWS and Azure security certifications",
            "Expert in cloud security frameworks"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Secure cloud infrastructure for enterprise clients",
        company: null,
        postedBy: null
    },
    {
        title: "Security Operations Center (SOC) Analyst",
        description: "Monitor and respond to security incidents",
        location: "Gurgaon, Onsite",
        employmentType: "Full-time",
        salary: "$80k-$120k per year",
        requirements: [
            "5+ years of SOC experience",
            "SIEM and threat detection expertise",
            "Strong incident response skills"
        ],
        experience: "5+ years",
        positions: 3,
        status: "open",
        details: "Protect organization from cyber threats in real-time",
        company: null,
        postedBy: null
    },
    {
        title: "Security Compliance Manager",
        description: "Ensure regulatory compliance and security standards",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of security compliance experience",
            "Expert in GDPR, HIPAA, and ISO 27001",
            "Strong understanding of global security regulations"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Develop and maintain comprehensive security compliance strategies",
        company: null,
        postedBy: null
    },
      // HealthTech Innovations Jobs
      {
        title: "Senior Healthcare Software Engineer",
        description: "Develop advanced medical software solutions",
        location: "Bangalore, Hybrid",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "7+ years of healthcare software development",
            "Experience with medical compliance standards",
            "Expertise in healthcare interoperability"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Create innovative digital health technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Medical Data Scientist",
        description: "Analyze healthcare data and develop predictive models",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "6+ years of data science experience",
            "PhD in Biostatistics or related field",
            "Expert in medical data analysis"
        ],
        experience: "6+ years",
        positions: 1,
        status: "open",
        details: "Use AI to advance medical research and patient care",
        company: null,
        postedBy: null
    },
    {
        title: "Telemedicine Platform Developer",
        description: "Build scalable telehealth solutions",
        location: "Bangalore, Onsite",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "5+ years of healthcare tech development",
            "Expertise in video communication technologies",
            "Understanding of medical privacy regulations"
        ],
        experience: "5+ years",
        positions: 2,
        status: "open",
        details: "Develop next-generation telemedicine platforms",
        company: null,
        postedBy: null
    },
    {
        title: "Healthcare UX/UI Designer",
        description: "Design intuitive medical software interfaces",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$80k-$120k per year",
        requirements: [
            "6+ years of UX design experience",
            "Portfolio in healthcare or medical design",
            "Understanding of accessibility standards"
        ],
        experience: "6+ years",
        positions: 1,
        status: "open",
        details: "Create user-friendly healthcare technology interfaces",
        company: null,
        postedBy: null
    },
    {
        title: "Healthcare AI Research Engineer",
        description: "Develop AI solutions for medical diagnostics",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "7+ years of AI research in healthcare",
            "Published research in medical AI",
            "Expert in machine learning algorithms"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Advance AI technologies in medical diagnostics",
        company: null,
        postedBy: null
    },

    // EdTech Solutions Jobs
    {
        title: "E-Learning Platform Architect",
        description: "Design comprehensive online learning solutions",
        location: "Delhi, Hybrid",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "8+ years of EdTech development experience",
            "Expert in learning management systems",
            "Understanding of adaptive learning technologies"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Create innovative digital learning platforms",
        company: null,
        postedBy: null
    },
    {
        title: "Curriculum Technology Specialist",
        description: "Develop digital educational content and technologies",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "6+ years of educational technology experience",
            "Expertise in content management systems",
            "Understanding of pedagogical design principles"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Transform educational content through technology",
        company: null,
        postedBy: null
    },
    {
        title: "AI-Powered Learning Analytics Engineer",
        description: "Develop predictive learning analytics solutions",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of data science in education",
            "Expert in machine learning",
            "Understanding of educational psychology"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Use AI to personalize and improve learning experiences",
        company: null,
        postedBy: null
    },
    {
        title: "Educational Software Developer",
        description: "Build interactive learning applications",
        location: "Delhi, Onsite",
        employmentType: "Full-time",
        salary: "$80k-$120k per year",
        requirements: [
            "5+ years of software development",
            "Experience in educational software",
            "Expertise in mobile and web development"
        ],
        experience: "5+ years",
        positions: 2,
        status: "open",
        details: "Create engaging educational technology solutions",
        company: null,
        postedBy: null
    },
    {
        title: "Virtual Reality Learning Experience Designer",
        description: "Develop immersive educational VR experiences",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "6+ years of VR/AR development",
            "Experience in educational content creation",
            "Expert in 3D modeling and interaction design"
        ],
        experience: "6+ years",
        positions: 1,
        status: "open",
        details: "Pioneer immersive learning technologies",
        company: null,
        postedBy: null
    },
    {
        title: "E-commerce Platform Architect",
        description: "Design scalable and innovative online marketplace solutions",
        location: "Bangalore, Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of e-commerce platform development",
            "Expert in microservices architecture",
            "Experience with high-traffic e-commerce platforms"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Lead the development of next-generation e-commerce technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Digital Marketing Technology Specialist",
        description: "Develop advanced marketing technology solutions",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "6+ years of marketing technology experience",
            "Expertise in marketing automation platforms",
            "Advanced data analytics skills"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Create innovative marketing technology solutions",
        company: null,
        postedBy: null
    },
    {
        title: "E-commerce UX/UI Designer",
        description: "Design intuitive and conversion-optimized user interfaces",
        location: "Bangalore, Onsite",
        employmentType: "Full-time",
        salary: "$80k-$120k per year",
        requirements: [
            "5+ years of UX design in e-commerce",
            "Strong portfolio of conversion-driven designs",
            "Understanding of user psychology in online shopping"
        ],
        experience: "5+ years",
        positions: 2,
        status: "open",
        details: "Transform user experience in digital marketplaces",
        company: null,
        postedBy: null
    },
    {
        title: "Payment Systems Integration Engineer",
        description: "Develop and integrate advanced payment technologies",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "7+ years of payment systems development",
            "Expert in global payment gateway integrations",
            "Understanding of financial compliance regulations"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Innovate payment technologies for seamless transactions",
        company: null,
        postedBy: null
    },
    {
        title: "E-commerce Data Analytics Manager",
        description: "Lead data-driven insights for online marketplace optimization",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "8+ years of data analytics experience",
            "Expert in e-commerce performance metrics",
            "Advanced machine learning skills"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Drive strategic decisions through advanced data analytics",
        company: null,
        postedBy: null
    },

    // StartUp Accelerator Jobs
    {
        title: "Startup Ecosystem Strategy Consultant",
        description: "Guide and support emerging technology startups",
        location: "Mumbai, Hybrid",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "7+ years of startup ecosystem experience",
            "Strong network in venture capital",
            "Expert in startup growth strategies"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Help transform innovative ideas into successful ventures",
        company: null,
        postedBy: null
    },
    {
        title: "Venture Capital Technology Analyst",
        description: "Evaluate and assess emerging technology startups",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "5+ years of technology investment analysis",
            "Deep understanding of emerging tech trends",
            "Strong financial modeling skills"
        ],
        experience: "5+ years",
        positions: 1,
        status: "open",
        details: "Identify and invest in groundbreaking technology ventures",
        company: null,
        postedBy: null
    },
    {
        title: "Startup Mentorship Program Director",
        description: "Design and manage startup mentorship initiatives",
        location: "Mumbai, Onsite",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "8+ years of entrepreneurship experience",
            "Proven track record of startup success",
            "Expert in startup coaching and development"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Nurture and guide the next generation of entrepreneurs",
        company: null,
        postedBy: null
    },
    {
        title: "Innovation Ecosystem Technology Architect",
        description: "Design technological infrastructure for startup support",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of technology ecosystem design",
            "Expert in startup technology platforms",
            "Strong understanding of innovation frameworks"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Create technological frameworks for startup success",
        company: null,
        postedBy: null
    },
    {
        title: "Startup Growth and Scale Strategist",
        description: "Develop scalability strategies for emerging startups",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "6+ years of startup growth experience",
            "Expert in scaling technology businesses",
            "Strong network in technology ecosystems"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Drive rapid growth for promising startup ventures",
        company: null,
        postedBy: null
    },

    // BlockChain Innovations Jobs
    {
        title: "Senior Blockchain Architect",
        description: "Design advanced blockchain infrastructure solutions",
        location: "Hyderabad, Hybrid",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "8+ years of blockchain development",
            "Expert in distributed ledger technologies",
            "Advanced smart contract design skills"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Create cutting-edge decentralized technology solutions",
        company: null,
        postedBy: null
    },
    {
        title: "Cryptocurrency Security Specialist",
        description: "Develop and implement blockchain security protocols",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of blockchain security experience",
            "Expert in cryptographic protocols",
            "Deep understanding of cryptocurrency ecosystems"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Protect digital assets through advanced security technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Decentralized Finance (DeFi) Developer",
        description: "Build innovative financial applications on blockchain",
        location: "Hyderabad, Onsite",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "6+ years of blockchain development",
            "Expert in Solidity and smart contract development",
            "Understanding of financial instrument design"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Pioneer next-generation decentralized financial technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Blockchain Research Scientist",
        description: "Conduct advanced research in blockchain technologies",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$120k-$180k per year",
        requirements: [
            "8+ years of blockchain research",
            "PhD in Computer Science or related field",
            "Published research in blockchain innovations"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Push the boundaries of blockchain technological research",
        company: null,
        postedBy: null
    },
    {
        title: "Blockchain Integration Consultant",
        description: "Design blockchain integration strategies for enterprises",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of blockchain consulting experience",
            "Expert in enterprise blockchain adoption",
            "Strong understanding of industry-specific blockchain applications"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Guide enterprises in blockchain technology transformation",
        company: null,
        postedBy: null
    },
    // GameDev Studios Jobs
    {
        title: "Senior Game Engine Developer",
        description: "Develop core technologies for advanced game engines",
        location: "Pune, Onsite",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of game engine development",
            "Expert in C++ and game development frameworks",
            "Deep understanding of real-time rendering techniques"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Push the boundaries of interactive game technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Game AI Programmer",
        description: "Create intelligent and adaptive game character behaviors",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "6+ years of game AI development",
            "Expert in machine learning for game environments",
            "Strong background in behavioral AI algorithms"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Develop cutting-edge AI for immersive gaming experiences",
        company: null,
        postedBy: null
    },
    {
        title: "Virtual Reality Game Designer",
        description: "Design immersive virtual reality game experiences",
        location: "Pune, Hybrid",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "5+ years of VR game design experience",
            "Expert in user interaction design",
            "Portfolio of innovative VR game concepts"
        ],
        experience: "5+ years",
        positions: 2,
        status: "open",
        details: "Create next-generation virtual reality gaming experiences",
        company: null,
        postedBy: null
    },
    {
        title: "Game Performance Optimization Specialist",
        description: "Optimize game performance across multiple platforms",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of game performance engineering",
            "Expert in cross-platform optimization techniques",
            "Deep understanding of hardware-level performance"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Ensure smooth and efficient game experiences",
        company: null,
        postedBy: null
    },
    {
        title: "Multiplayer Game Systems Architect",
        description: "Design scalable multiplayer networking solutions",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of multiplayer game development",
            "Expert in distributed systems and networking",
            "Experience with large-scale multiplayer architectures"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Create robust and responsive multiplayer game infrastructures",
        company: null,
        postedBy: null
    },

    // AeroTech Engineering Jobs
    {
        title: "Aerospace Systems Engineer",
        description: "Design advanced aerospace technology solutions",
        location: "Bangalore, Onsite",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "8+ years of aerospace engineering experience",
            "Expert in aerospace system design",
            "Advanced knowledge of aerodynamics and propulsion"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Push the boundaries of aerospace engineering innovation",
        company: null,
        postedBy: null
    },
    {
        title: "Satellite Systems Integration Specialist",
        description: "Develop and integrate advanced satellite technologies",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of satellite systems experience",
            "Expert in space technology integration",
            "Deep understanding of orbital mechanics"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Create cutting-edge satellite communication solutions",
        company: null,
        postedBy: null
    },
    {
        title: "Aerospace Simulation Engineer",
        description: "Develop advanced simulation technologies for aerospace",
        location: "Bangalore, Hybrid",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "6+ years of aerospace simulation development",
            "Expert in computational fluid dynamics",
            "Strong background in physics-based modeling"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Create realistic and advanced aerospace simulation systems",
        company: null,
        postedBy: null
    },
    {
        title: "Propulsion Systems Research Scientist",
        description: "Conduct advanced research in aerospace propulsion",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$120k-$180k per year",
        requirements: [
            "8+ years of propulsion research",
            "PhD in Aerospace Engineering",
            "Published research in advanced propulsion technologies"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Pioneer next-generation propulsion technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Aerospace Materials Innovation Engineer",
        description: "Develop advanced materials for aerospace applications",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of materials engineering experience",
            "Expert in aerospace material development",
            "Advanced understanding of material science"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Create innovative materials for aerospace technologies",
        company: null,
        postedBy: null
    },

    // TelCo Innovations Jobs
    {
        title: "5G Network Architecture Specialist",
        description: "Design advanced 5G network infrastructure",
        location: "Delhi, Onsite",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of telecom network design experience",
            "Expert in 5G network architectures",
            "Deep understanding of telecommunications protocols"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Lead the development of next-generation network technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Telecommunications Software Engineer",
        description: "Develop advanced software solutions for telecom networks",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "6+ years of telecom software development",
            "Expert in network programming",
            "Strong background in distributed systems"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Create innovative software for telecommunications infrastructure",
        company: null,
        postedBy: null
    },
    {
        title: "Network Security Specialist",
        description: "Implement advanced security protocols for telecom networks",
        location: "Delhi, Hybrid",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of network security experience",
            "Expert in telecommunications security",
            "Deep understanding of cyber threat landscapes"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Protect critical telecommunications infrastructure",
        company: null,
        postedBy: null
    },
    {
        title: "IoT Network Integration Engineer",
        description: "Develop IoT connectivity solutions for telecom networks",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$85k-$125k per year",
        requirements: [
            "6+ years of IoT network experience",
            "Expert in IoT communication protocols",
            "Strong background in embedded systems"
        ],
        experience: "6+ years",
        positions: 1,
        status: "open",
        details: "Create innovative IoT network integration technologies",
        company: null,
        postedBy: null
    },
    {
        title: "Telecommunications AI Research Scientist",
        description: "Apply AI technologies to telecommunications infrastructure",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "8+ years of AI research in telecommunications",
            "PhD in Computer Science or related field",
            "Published research in AI network technologies"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Pioneer AI-driven telecommunications innovations",
        company: null,
        postedBy: null
    },
    {
        title: "Senior Management Consulting Strategist",
        description: "Develop innovative business transformation strategies",
        location: "Mumbai, Onsite",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "10+ years of management consulting experience",
            "Expert in digital transformation strategies",
            "Strong track record of successful enterprise consulting"
        ],
        experience: "10+ years",
        positions: 1,
        status: "open",
        details: "Lead complex business transformation initiatives",
        company: null,
        postedBy: null
    },
    {
        title: "Digital Transformation Technology Consultant",
        description: "Design technology-driven business solutions",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "7+ years of digital transformation consulting",
            "Expert in emerging technology implementations",
            "Strong enterprise architecture background"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Drive technological innovation in enterprise environments",
        company: null,
        postedBy: null
    },
    {
        title: "Business Analytics and AI Strategist",
        description: "Develop AI-powered business intelligence solutions",
        location: "Mumbai, Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "8+ years of business analytics experience",
            "Expert in AI and machine learning applications",
            "Strong data-driven strategy development skills"
        ],
        experience: "8+ years",
        positions: 2,
        status: "open",
        details: "Transform business strategies through advanced analytics",
        company: null,
        postedBy: null
    },
    {
        title: "Enterprise Change Management Consultant",
        description: "Design and implement organizational transformation strategies",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "7+ years of change management experience",
            "Expert in organizational development",
            "Strong leadership and communication skills"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Guide enterprises through complex organizational changes",
        company: null,
        postedBy: null
    },
    {
        title: "Technology Innovation Strategy Lead",
        description: "Drive technological innovation across enterprise clients",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$105k-$155k per year",
        requirements: [
            "9+ years of technology strategy consulting",
            "Expert in emerging technology trends",
            "Proven track record of innovative technology implementations"
        ],
        experience: "9+ years",
        positions: 1,
        status: "open",
        details: "Lead cutting-edge technology strategy development",
        company: null,
        postedBy: null
    },

    // RoboTech Innovations Jobs
    {
        title: "Advanced Robotics Systems Architect",
        description: "Design complex robotic system architectures",
        location: "Chennai, Onsite",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "8+ years of robotics systems design",
            "Expert in robotic system integration",
            "Advanced knowledge of robotics control systems"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Push the boundaries of robotic systems innovation",
        company: null,
        postedBy: null
    },
    {
        title: "AI Robotics Research Scientist",
        description: "Develop advanced AI algorithms for robotic systems",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$120k-$180k per year",
        requirements: [
            "7+ years of AI and robotics research",
            "PhD in Robotics or Computer Science",
            "Published research in AI-driven robotics"
        ],
        experience: "7+ years",
        positions: 1,
        status: "open",
        details: "Pioneer AI technologies for advanced robotics",
        company: null,
        postedBy: null
    },
    {
        title: "Robotics Software Engineer",
        description: "Develop software for advanced robotic platforms",
        location: "Chennai, Hybrid",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "6+ years of robotics software development",
            "Expert in robotic control software",
            "Strong background in embedded systems"
        ],
        experience: "6+ years",
        positions: 2,
        status: "open",
        details: "Create innovative software for robotic platforms",
        company: null,
        postedBy: null
    },
    {
        title: "Robotic Automation Solutions Specialist",
        description: "Design automation solutions for industrial applications",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$90k-$130k per year",
        requirements: [
            "7+ years of industrial automation experience",
            "Expert in robotic process automation",
            "Strong understanding of industrial workflows"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Transform industrial processes through advanced robotics",
        company: null,
        postedBy: null
    },
    {
        title: "Human-Robot Interaction Design Engineer",
        description: "Develop intuitive interfaces for human-robot collaboration",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "6+ years of human-robot interaction design",
            "Expert in UX design for robotic systems",
            "Strong background in cognitive ergonomics"
        ],
        experience: "6+ years",
        positions: 1,
        status: "open",
        details: "Create seamless human-robot interaction experiences",
        company: null,
        postedBy: null
    },

    // BioGen Technologies Jobs
    {
        title: "Senior Biotechnology Research Scientist",
        description: "Lead advanced biotechnology research initiatives",
        location: "Hyderabad, Onsite",
        employmentType: "Full-time",
        salary: "$120k-$180k per year",
        requirements: [
            "10+ years of biotechnology research experience",
            "PhD in Biotechnology or related field",
            "Significant published research in biotechnology"
        ],
        experience: "10+ years",
        positions: 1,
        status: "open",
        details: "Drive groundbreaking biotechnology research",
        company: null,
        postedBy: null
    },
    {
        title: "Genetic Engineering Specialist",
        description: "Develop advanced genetic engineering technologies",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$110k-$160k per year",
        requirements: [
            "8+ years of genetic engineering experience",
            "Expert in CRISPR and gene editing technologies",
            "Strong background in molecular biology"
        ],
        experience: "8+ years",
        positions: 2,
        status: "open",
        details: "Pioneer innovative genetic engineering solutions",
        company: null,
        postedBy: null
    },
    {
        title: "Bioinformatics Data Scientist",
        description: "Develop advanced data analysis for biological research",
        location: "Hyderabad, Hybrid",
        employmentType: "Full-time",
        salary: "$100k-$150k per year",
        requirements: [
            "7+ years of bioinformatics experience",
            "Expert in genomic data analysis",
            "Strong computational biology skills"
        ],
        experience: "7+ years",
        positions: 2,
        status: "open",
        details: "Transform biological research through advanced data science",
        company: null,
        postedBy: null
    },
    {
        title: "Biotechnology Product Development Manager",
        description: "Lead development of innovative biotech products",
        location: "Remote",
        employmentType: "Full-time",
        salary: "$95k-$140k per year",
        requirements: [
            "8+ years of biotechnology product development",
            "Expert in regulatory compliance",
            "Strong understanding of biotech market dynamics"
        ],
        experience: "8+ years",
        positions: 1,
        status: "open",
        details: "Drive innovative biotechnology product development",
        company: null,
        postedBy: null
    },
    {
        title: "Pharmaceutical Research Scientist",
        description: "Develop advanced pharmaceutical research solutions",
        location: "Hybrid",
        employmentType: "Full-time",
        salary: "$105k-$155k per year",
        requirements: [
            "9+ years of pharmaceutical research experience",
            "PhD in Pharmaceutical Sciences",
            "Extensive research in drug development"
        ],
        experience: "9+ years",
        positions: 1,
        status: "open",
        details: "Lead cutting-edge pharmaceutical research initiatives",
        company: null,
        postedBy: null
    }

        // Continue with similar job sets for other companies...
    ]
];