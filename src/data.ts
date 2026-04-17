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
  quote: "It is never too late to be who you might have been",
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
  ],
  blogPosts: [
    {
      id: 1,
      title: "The Future of Lean Manufacturing in Industry 4.0",
      excerpt: "Exploring how traditional lean principles are evolving with the integration of IoT and AI in modern industrial settings.",
      date: "Oct 15, 2025",
      category: "Manufacturing",
      image: "https://picsum.photos/seed/lean/1200/800",
      content: `
# The Intersection of Lean & Industry 4.0

In the modern industrial landscape, the traditional principles of **Lean Manufacturing**—originally developed by Toyota—are undergoing a massive transformation. As we move into the era of **Industry 4.0**, the integration of the Internet of Things (IoT), Big Data, and Artificial Intelligence (AI) is providing new ways to eliminate waste and optimize value.

### Key Evolutions:

1. **Real-time Waste Identification**: Traditionally, Lean relied on manual observation (Gemba walks). Today, IoT sensors provide real-time data on machine downtime, bottlenecking, and inventory levels.
2. **Predictive Maintenance**: Instead of scheduled maintenance, AI models can predict when a machine is likely to fail, significantly reducing unplanned downtime—a core Lean objective.
3. **Data-Driven Kaizen**: Continuous improvement (Kaizen) is no longer based on intuition but on high-fidelity data analytics.

### The Human Element

Despite the automation, the 'Respect for People' pillar of Lean remains vital. Technology should empower workers, providing them with better tools and insights to solve problems more effectively.

As an Industrial Engineer, I believe the future lies in **Lean 4.0**—where the efficiency of Lean meets the connectivity of Industry 4.0.
      `
    },
    {
      id: 2,
      title: "My Journey as a Growth Fellow at ResearchBuddy AI",
      excerpt: "Reflecting on the challenges and successes of promoting AI-driven research collaboration among university students.",
      date: "Sep 20, 2025",
      category: "Experience",
      image: "https://picsum.photos/seed/ai/1200/800",
      content: `
# Empowering Research with AI

Joining **ResearchBuddy AI** as a Growth Fellow has been one of the most rewarding experiences of my academic journey. My primary goal was to bridge the gap between advanced AI tools and the student research community at BUET.

### What We Accomplished:

* **Workshop Series**: Organized three major workshops introducing students to AI-driven literature reviews.
* **Content Creation**: Developed a series of promotional videos and posts that reached over 2,000 students.
* **Community Building**: Facilitated a support network where students can share tips on using AI ethically in their research.

### Lessons Learned:

The biggest takeaway for me was that **communication is key**. Explaining complex AI concepts in a way that highlights practical benefits to a student's daily work is much more effective than focusing on technical jargon.

I am excited to continue this journey and see how AI will further revolutionize the way we conduct research in the coming years.
      `
    }
  ],
  publications: [
    {
      type: "Poster",
      title: "Smart Real-time Monitoring and Control of Pill Dispensing and Packaging Process for Pharmaceutical Industries Using IoT and Embedded Systems",
      authors: "Md. Istiak Adnan, Khaja Mohammad Nasir Uddin, Md. Tasdikul Islam, and Tanvir Azam",
      journal: "ResearchGate (Preprint)",
      year: "2024",
      link: "https://www.researchgate.net/publication/394411020_Smart_Real-time_Monitoring_and_Control_of_Pill_Dispensing_and_Packaging_Process_for_Pharmaceutical_Industries_Using_IoT_and_Embedded_Systems",
      status: "Published"
    },
    {
      type: "Conference",
      title: "Optimization of Multi-Functional Vegetable Cutter Design using Functional Decomposition",
      authors: "Md. Istiak Adnan, Team Slice & Scrape",
      journal: "International Conference on Industrial Engineering",
      year: "2025",
      link: "#",
      status: "Accepted"
    },
    {
      type: "Under Review",
      title: "Sustainable Manufacturing Frameworks for SME Plastic Industries in Bangladesh",
      authors: "Md. Istiak Adnan",
      journal: "Journal of Cleaner Production",
      year: "2025",
      link: "#",
      status: "Under Review"
    },
    {
      type: "Working Paper",
      title: "AI-Driven Quality Control in Precision Casting: A Case Study",
      authors: "Md. Istiak Adnan, ResearchBuddy AI Team",
      journal: "Internal Working Paper",
      year: "2025",
      link: "#",
      status: "In Progress"
    }
  ],
  certifications: [
    {
      category: "Professional",
      title: "Six Sigma Green Belt",
      issuer: "MTF Institute",
      image: "https://www.udemy.com/certificate/UC-e1a82dbe-6626-47ba-abff-f4271534db0f/", // Note: In reality this would be an image of the cert
      link: "https://www.udemy.com/certificate/UC-e1a82dbe-6626-47ba-abff-f4271534db0f/",
      date: "2025"
    },
    {
      category: "Professional",
      title: "Lean & Quality Management",
      issuer: "MTF Institute",
      image: "https://picsum.photos/seed/lean-cert/800/600",
      link: "https://www.udemy.com/certificate/UC-e1a82dbe-6626-47ba-abff-f4271534db0f/",
      date: "2025"
    },
    {
      category: "Software & Tools",
      title: "Excel Skills for Business: Essentials",
      issuer: "Macquarie University",
      image: "https://picsum.photos/seed/excel-cert/800/600",
      link: "https://coursera.org/share/61193c244b0d9c4592c694ede8497ac6",
      date: "2023"
    },
    {
      category: "Software & Tools",
      title: "Data Analysis using Microsoft Excel",
      issuer: "Coursera Project Network",
      image: "https://picsum.photos/seed/data-cert/800/600",
      link: "https://coursera.org/share/0588aabedb6581c4c75465b58dc1600f",
      date: "2025"
    },
    {
      category: "Extracurricular",
      title: "UCLG ASPAC Photo Contest Winner",
      issuer: "UCLG ASPAC",
      image: "https://picsum.photos/seed/photo-cert/800/600",
      date: "2025"
    },
    {
        category: "Academic",
        title: "PMP Training",
        issuer: "Project Management Institute",
        image: "https://picsum.photos/seed/pmp-cert/800/600",
        date: "2024"
      }
  ],
  notices: [
    {
      title: "Upcoming Workshop on SolidWorksSurfacing",
      content: "Join me next Monday for an intensive session on advanced 3D surfacing techniques.",
      date: "Oct 25, 2025",
      priority: "high"
    },
    {
      title: "New Project: Sustainable Product Design",
      content: "Thrilled to announce the start of a new collaboration focused on circular economy principles.",
      date: "Oct 18, 2025",
      priority: "normal"
    }
  ]
};
