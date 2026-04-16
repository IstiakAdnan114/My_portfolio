/**
 * This file contains all the content for the portfolio.
 * You can easily add, delete, or change any content here.
 */

export const portfolioData = {
  name: "Md. Istiak Adnan",
  title: "Industrial & Production Engineer",
  email: "adnanistiak111@gmail.com",
  phone: "+880 1884562034",
  location: "BUET, Palashi, Dhaka",
  socials: {
    linkedin: "https://linkedin.com/in/istiak-adnan",
    facebook: "https://www.facebook.com/mdistiak.adnan.9",
    github: "https://github.com/IstiakAdnan114",
    researchgate: "https://www.researchgate.net/profile/Md-Istiak-Adnan",
    grabcad: "https://grabcad.com/md.istiak.adnan-1"
  },
  about: `I am Adnan, a final-year Industrial and Production Engineering student at Bangladesh University of Engineering and Technology (BUET) with a strong passion for manufacturing, materials science, operations management, and quality control. My academic journey has given me a solid foundation in industrial processes, while my hands-on projects—ranging from product design challenges to IoT-based automation systems—have strengthened my ability to solve real-world problems with creativity and precision.

Beyond academics, I have gained valuable experience through case competitions, campus outreach, and voluntary initiatives, which have sharpened my leadership, teamwork, and communication skills. I enjoy exploring new technologies, building meaningful projects, and connecting with people from diverse backgrounds.

I am driven by curiosity and a desire to bridge engineering knowledge with practical impact, whether in industry, research, or innovation.`,
  education: [
    {
      institution: "Bangladesh University of Engineering and Technology (BUET)",
      degree: "Department of Industrial and Production Engineering",
      period: "2021 - Present",
      color: "indigo"
    },
    {
      institution: "Govt. Azizul Haque College, Bogura",
      degree: "Science Background",
      period: "2018 - 2020",
      color: "purple"
    },
    {
      institution: "Rural Development Academy Laboratory School and College, Bogura",
      degree: "Science Background",
      period: "2013 - 2018",
      color: "violet"
    }
  ],
  experience: [
    {
      role: "Growth Fellow",
      company: "ResearchBuddy AI (Part-time)",
      period: "September 2024 - Present",
      points: [
        "Facilitate collaboration among students at my university with ResearchBuddy AI",
        "Create and share attractive posts and content",
        "Produce promotional videos to showcase labs and programs",
        "Attract potential customers and users to join ResearchBuddy AI labs"
      ],
      color: "green"
    },
    {
      role: "Teacher - Materials Department",
      company: "Udvash (Part-time)",
      period: "May 2023 - Present",
      points: [
        "Reviewing and creating syllabus-based questions",
        "Maintaining content quality and consistency",
        "Ensuring timely task completion"
      ],
      color: "indigo"
    },
    {
      role: "Campus Ambassador",
      company: "Three Zero Hackathon 2024",
      period: "Jun 2024 – Jul 2024",
      points: [
        "Promoted event at BUET campus",
        "Coordinated outreach activities",
        "Official Campus Ambassador role"
      ],
      color: "purple"
    },
    {
      role: "Team Member - \"Munhamanna Chocolate\"",
      company: "Hult Prize 2024 (Case Competition)",
      period: "Oct 2024 - Nov 2024",
      points: [
        "Co-founded sustainable chocolate concept",
        "Conducted market analysis and pitched business model",
        "Advanced to first round of BUET Hult Prize 2024"
      ],
      color: "orange"
    },
    {
      role: "Volunteer",
      company: "Team Badhan, BUET Branch",
      period: "Aug 2024",
      points: [
        "Contributed to flood relief efforts",
        "Fundraising and organizing aid distribution",
        "Supported severely affected communities"
      ],
      color: "green"
    },
    {
      role: "Industrial Visit",
      company: "PRAN & RFL Industrial Parks",
      period: "Jun 2024",
      points: [
        "Observed plastic manufacturing processes",
        "Gained experience with CNC milling, wire EDM",
        "Learned Six Sigma, Poka-yoke, and SMV"
      ],
      color: "blue"
    }
  ],
  skills: {
    technical: [
      { name: "SolidWorks", icon: "cube" },
      { name: "AutoCAD", icon: "drafting-compass" },
      { name: "C Programming", icon: "terminal" },
      { name: "Python", icon: "python" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3-alt" },
      { name: "JavaScript", icon: "js" },
      { name: "Video Editing", icon: "video" }
    ],
    soft: [
      { name: "Problem Solving", icon: "lightbulb" },
      { name: "Critical Thinking", icon: "brain" },
      { name: "Team Leadership", icon: "user-tie" },
      { name: "Time Management", icon: "clock" },
      { name: "Teamwork", icon: "handshake" },
      { name: "Communication", icon: "comments" },
      { name: "Market Research", icon: "chart-line" }
    ]
  },
  projects: [
    {
      title: "Adnan's Personal Portfolio",
      description: "This personal portfolio showcases my journey, skills, and experiences in a single interactive platform. Through this project, I learned the fundamentals of HTML, CSS, and JavaScript, and also leveraged various AI tools to enhance design, layout, and content creation.",
      tags: ["HTML", "CSS", "JavaScript", "AI"],
      period: "Aug 2025 – Sep 2025",
      links: [
        { name: "Portfolio", url: "https://istiakadnan114.github.io/mdistiak_adnan/", type: "external" },
        { name: "Github", url: "https://github.com/IstiakAdnan114/mdistiak_adnan/blob/main/index.html", type: "github" }
      ],
      icon: "user",
      color: "red"
    },
    {
      title: "Smart Real-Time Pill Dispensing and Packaging System using IoT and Embedded Systems",
      description: "Developed an IoT-based pill dispensing and packaging system using Arduino and ESP32. The system features real-time pill counting, weight measurement, and defective bottle rejection, improving accuracy and efficiency in pharmaceutical packaging.",
      tags: ["IoT", "Arduino", "ESP32", "Embedded Systems"],
      period: "Jun 2025 – Jul 2025",
      links: [
        { name: "Project Overview", url: "https://www.researchgate.net/publication/394411020_Smart_Real-time_Monitoring_and_Control_of_Pill_Dispensing_and_Packaging_Process_for_Pharmaceutical_Industries_Using_IoT_and_Embedded_Systems", type: "external" },
        { name: "Video Demo", url: "https://youtu.be/k48h_o7BPG4?si=o_r9_2MXHW77Ubsx", type: "youtube" }
      ],
      icon: "microchip",
      color: "blue"
    },
    {
      title: "Product Design – Slice and Scrape (Multi-Functional Vegetable Cutter)",
      description: "As part of our product design course, we developed Slice and Scrape, a multifunctional kitchen tool that combines fruit and vegetable slicing with a coconut scraping feature. Responsibilities included cost analysis, functional decomposition, black-box modeling, prototype building, and presenting the product through slides and a poster.",
      tags: ["Product Design", "Prototyping", "Cost Analysis", "Functional Design"],
      period: "Sep 2024 – Jul 2025",
      links: [
        { name: "Project Poster", url: "https://drive.google.com/file/d/14CYHKYSwveabi1GK01duwrjMFtBE_BkS/view?usp=drive_link", type: "pdf" },
        { name: "Visual Demo", url: "https://drive.google.com/file/d/1HaIXgY6Nj1Ce2tOGczlEilbjDsP1PEmB/view?usp=drive_link", type: "eye" }
      ],
      icon: "utensils",
      color: "green"
    },
    {
      title: "SolidWorks Design – RASTAR LaFerrari Remote Control Car (1:14 Scale)",
      description: "Designed a 1:14 scale model of a Rastar LaFerrari remote control car in SolidWorks. Applied advanced 3D surfacing tools and part modeling techniques to capture complex curves and details, improving CAD design proficiency.",
      tags: ["SolidWorks", "3D Modeling", "CAD Design", "Surface Modeling"],
      period: "Jan 2023 – Feb 2023",
      links: [
        { name: "CAD Files", url: "https://grabcad.com/library/laferrari-rastar-1", type: "download" }
      ],
      icon: "car",
      color: "red"
    },
    {
      title: "AutoCAD Design – Residential Floor Layout",
      description: "Designed a detailed residential house floor plan as part of the Engineering Graphics Sessional course. Applied AutoCAD for technical drawing and space optimization, gaining practical design experience.",
      tags: ["AutoCAD", "Technical Drawing", "Space Planning", "Architecture"],
      period: "Academic Project",
      links: [],
      icon: "home",
      color: "yellow"
    }
  ],
  photos: [
    {
      category: "iot",
      title: "IoT Project",
      subtitle: "Smart Real-Time Pill Dispensing System",
      image: "images/IoT-project.jpeg",
      images: [
        { src: "images/IoT-project.jpeg", caption: "Smart Pill Dispensing System" },
        { src: "https://picsum.photos/seed/iot2/1200/800", caption: "IoT System Backend" }
      ]
    },
    {
      category: "design",
      title: "LaFerrari RC",
      subtitle: "SolidWorks 3D Design Project",
      image: "images/laferrari_rc.jpeg",
      images: [
        { src: "images/laferrari_rc.jpeg", caption: "LaFerrari RC Design" }
      ]
    },
    {
      category: "industrial",
      title: "Industrial Visit",
      subtitle: "PRAN-RFL Industrial Park Experience",
      image: "images/Me_at_pran-rfl.jpg",
      images: [
        { src: "images/Me_at_pran-rfl.jpg", caption: "At PRAN-RFL Industrial Park" }
      ]
    },
    {
      category: "photography",
      title: "Photography",
      subtitle: "Personal Photography Interest",
      image: "images/riding horse.jpeg",
      images: [
        { src: "images/riding horse.jpeg", caption: "Horse Riding" }
      ]
    },
    {
      category: "travel",
      title: "Travel Memory",
      subtitle: "Cox's Bazar Adventure",
      image: "images/me at cox bazar.jpg",
      images: [
        { src: "images/me at cox bazar.jpg", caption: "Enjoying the beach at Cox's Bazar" }
      ]
    },
    {
      category: "product",
      title: "Product Design",
      subtitle: "Slice and Scrape Innovation",
      image: "images/slice and scrape.jpeg",
      images: [
        { src: "images/slice and scrape.jpeg", caption: "Slice and Scrape Tool" }
      ]
    },
    {
      category: "volunteering",
      title: "Volunteering",
      subtitle: "Team Badhan Community Service",
      image: "images/buet_badhan.jpeg",
      images: [
        { src: "images/buet_badhan.jpeg", caption: "Volunteering with Badhan" }
      ]
    }
  ],
  achievements: [
    {
      title: "Winner of 2025 UCLG ASPAC Photo Contest (Category 2 - Youth Leadership)",
      description: "Photo Title: \"A solitary figure gazing forward, leading the way for change\"",
      link: "https://drive.google.com/drive/folders/1D3BnfLnOR1ghajqmxRIOHlKALJjZw7VZ?usp=sharing",
      date: "2025",
      type: "trophy"
    },
    {
      title: "Lean & Quality Management, Six Sigma, Continuous Improvement",
      description: "MTF Institute of Management, Technology and Finance",
      link: "https://www.udemy.com/certificate/UC-e1a82dbe-6626-47ba-abff-f4271534db0f/",
      date: "Issued: July 2025",
      type: "medal"
    },
    {
      title: "Introduction to Data Analysis using Microsoft Excel",
      description: "Coursera Project Network",
      link: "https://coursera.org/share/0588aabedb6581c4c75465b58dc1600f",
      date: "Issued: May 2025",
      type: "chart-bar"
    },
    {
      title: "Excel Skills for Business: Essentials",
      description: "Macquarie University",
      link: "https://coursera.org/share/61193c244b0d9c4592c694ede8497ac6",
      date: "Issued: December 2023",
      type: "file-excel"
    }
  ]
};
