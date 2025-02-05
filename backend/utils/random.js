export const seedData = [
    //admin/recruiters data
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
        //more entries
    ],
    //companies data
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
        //more entries
    ],
    //jobs data. Each company have 5 jobs
    [
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
        //more entries
    ]
]