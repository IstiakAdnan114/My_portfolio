/**
 * This file contains all the content for the portfolio.
 * You can easily add, delete, or change any content here.
 */

export const portfolioData = {
  name: "Md. Istiak Adnan",
  title: "Industrial & Production Engineer",
  email: "adnanistiak111@gmail.com",
  phone: "+8801884562034",
  location: "BUET, Palashi, Dhaka",
  avatarUrl: "images/Adnan Professional.jpg",
  cvUrl: "https://drive.google.com/file/d/1N1-FjFOOFUVbZElVqLHl2h5di6PA1i-1/view?usp=sharing", // Add your CV link here (e.g., Google Drive link or file path)
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
      role: "Industrial Attachment Trainee",
      company: "PRAN-RFL Group",
      period: "Nov 2025 – Dec 2025",
      points: [
        "Exposed to 5+ manufacturing sections across 6+ production lines including Frozen Food, Dairy, and RM–PM operations.",
        "Conducted time study in Frozen Food section, collecting stochastic process data to model cycle time variability and identify statistical inefficiencies.",
        "Applied Monte Carlo simulation to quantify production loss under stochastic demand and process variability.",
        "Identified 3–4 bottlenecks in material flow and layout through throughput analysis and proposed data-driven process modifications.",
        "Identified manual visual inspection inefficiencies and proposed image processing techniques to automate quality control."
      ],
      color: "green"
    },
    {
      role: "Growth Fellow",
      company: "ResearchBuddy AI (Part-time)",
      period: "Sept 2025 - Jan 2026",
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
  skills: [
    {
      category: "Data & ML",
      items: ["Python", "Machine Learning", "Neural Networks", "Time Series Analysis", "Simulation", "Linear, Integer & Dynamic Programming", "LaTeX"]
    },
    {
      category: "Manufacturing & Analysis",
      items: ["AutoCAD", "SolidWorks", "ANSYS", "CATIA", "KeyShot", "Welding", "Lathe", "Milling", "Drilling"]
    },
    {
      category: "Embedded & IoT",
      items: ["C", "Arduino", "ESP32", "Sensor Integration"]
    },
    {
      category: "Web Development",
      items: ["HTML", "CSS", "JavaScript (Basic)"]
    },
    {
      category: "Languages",
      items: ["Bengali (Native)", "English", "Hindi"]
    }
  ],
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
      image: "images/IoT-project.jpg",
      images: [
        { src: "images/IoT-project.jpg", caption: "Smart Pill Dispensing System" },
      ]
    },
    {
      category: "design",
      title: "LaFerrari RC",
      subtitle: "SolidWorks 3D Design Project",
      image: "images/laferrari_rc.jpg",
      images: [
        { src: "images/laferrari_rc.jpg", caption: "LaFerrari RC Design" }
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
      image: "images/riding horse.jpg",
      images: [
        { src: "images/riding horse.jpg", caption: "Horse Riding" }
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
      image: "images/slice and scrape.jpg",
      images: [
        { src: "images/slice and scrape.jpg", caption: "Slice and Scrape Tool" }
      ]
    },
    {
      category: "volunteering",
      title: "Volunteering",
      subtitle: "Team Badhan Community Service",
      image: "images/buet_badhan.jpg",
      images: [
        { src: "images/buet_badhan.jpg", caption: "Volunteering with Badhan" }
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
      title: "30 Days at PRAN-RFL: A Student's Industrial Journey",
      excerpt: "From utility plants to ETP systems — what a month-long industrial attachment at one of Bangladesh's largest conglomerates taught me about how industries actually work.",
      date: "Sep 20, 2025",
      category: "Experience",
      image: "/images/pip_attachment_experience.jpg",
      content: `
# **30 Days at PRAN-RFL: What I Learned on the Factory Floor**

When they said "industrial attachment," I pictured sitting in a conference room watching PowerPoints. What actually happened was far more interesting — and honestly, far more valuable.

For about 30 days, I was placed at **PRAN Industrial Park (PIP)** which is located in Palash, Ghorashal, Narsingdi, Bangladesh,  of **PRAN-RFL Group** as part of my academic program. Here's what the experience looked like from the inside.

![Arriving at PRAN-RFL](/images/pip.jpg)

### **Team Kiwi**

Four of us made up **Team Kiwi** — three of us, including myself, were placed at PRAN, and the fourth was at RFL.

When work was done, we were together. Exploring, eating, crossing the river by boat, making the most of whatever free time we had. The different postings during the day didn't stop us from spending the rest of it as a group — and honestly, that dynamic made the whole experience a lot more enjoyable than it might have been otherwise.

The accommodation itself was great — a proper guest room, spacious and well-maintained. For students, it felt like a step up. Something I genuinely appreciated.

![Team Kiwi at the guest house](/images/team_kiwi.jpg)

### **The Plant Visits**

The core of the attachment was visiting five major areas of the facility. Each one gave us a different lens into how a large-scale food and consumer goods company actually runs day-to-day.

**Utilities**

This was probably the most eye-opening stop. Understanding what powers and sustains the entire operation from the ground up changes how you see everything else. Without utilities, nothing moves.

![Utilities plant floor](/images/utility_electricity.jpg)

**RM/PM Store & Inventory Control**

We got a look at how raw materials and packaging materials are managed, tracked, and controlled before they ever reach production. A lot of invisible work happens here.


**Quality Control**

Standards, testing, checks at every stage. You realize pretty quickly that "quality" isn't just a department — it's baked into the whole process.


**Frozen Food Plant**

Fast-paced, temperature-sensitive, and fascinating. Watching product move from raw input to packaged output at scale is something you can't quite grasp from a textbook.


**Dairy Plant**

Similar rhythm, different requirements. The precision involved in dairy processing is impressive.

![Dairy processing plant](/images/dairy.jpg)

I'm planning to write separate posts diving deeper into what we saw at each plant — there's too much to cover in one go.

### **The ETP Plant**

One thing I hadn't expected to care about as much as I did: the **Effluent Treatment Plant (ETP)**. Seeing how industrial wastewater is processed and treated before being discharged into the river was genuinely sobering. It's the kind of thing that makes you think about environmental responsibility in a much more concrete way than any lecture ever could.

![ETP wastewater treatment facility](/images/etp.jpg)

### **The Moments In Between**

It wasn't all factory floors and clipboards. Team Kiwi made the most of the free time too — we explored the surrounding area, crossed the river by boat, took pictures, just wandered around together. Simple stuff, but those are the moments you actually remember.

![Crossing the river by boat](/images/kiwi_fun.jpg)

### **A Few Things Worth Mentioning**

Not everything was perfect, and I think it's worth being honest about that too.

The workload on the floor workers was visibly heavy. Long hours, repetitive tasks, and what seemed like a lot of pressure to keep the line moving. And from what we gathered, the pay for many of these workers doesn't quite reflect the effort they put in every single day.

These are the people who actually keep everything running — from the utilities to the dairy floor — and it's hard to watch an operation that efficient without wondering if the people powering it are being fairly taken care of.

I genuinely hope the management reflects on this. A company as large and successful as PRAN-RFL has more than enough reason — and I'd argue, responsibility — to ensure that growth doesn't come at the cost of the people on the ground. Profit matters, but so do the workers making it possible.

Here's hoping the future looks a little fairer for them.

### **The Final Presentation**

At the end of the attachment, we had to present our observations and suggest improvements to the management team — including the CTO.

I won't pretend I wasn't nervous. But the presentation went well. Really well, actually. The CTO paused to specifically ask the room to applaud for two of the ideas I shared. That's not something I expected, and it's not something I'll forget quickly.

It was a good reminder that fresh eyes sometimes see things that experienced ones look past — and that it's worth speaking up when you have something to say.

![Final presentation day](/images/presentation_day_pip.jpg)

More plant-specific posts coming soon. **Team Kiwi**, we did good.
  `
    },
    {
      id: 2,
      title: "#",
      excerpt: "#",
      date: "Oct 15, 2025",
      category: "Manufacturing",
      image: "https://picsum.photos/seed/lean/1200/800",
      content: `
Likhbo pore `
    }
  ],
  publications: [
    {
      type: "Poster",
      title: "Smart Real-time Monitoring and Control of Pill Dispensing and Packaging Process for Pharmaceutical Industries Using IoT and Embedded Systems",
      authors: "Rakonuzzaman, M., Adnan, M. I., Rahman, M. S., Rahman, T., Saki, M. S. A., Maruf, I. H., & Ahmad, N.",
      journal: "ResearchGate (Poster)",
      year: "2025",
      link: "https://www.researchgate.net/publication/394411020_Smart_Real-time_Monitoring_and_Control_of_Pill_Dispensing_and_Packaging_Process_for_Pharmaceutical_Industries_Using_IoT_and_Embedded_Systems",
      status: "Published"
    },
    {
      type: "Conference",
      title: "Stochastic Modeling of Throughput-Quality Dynamics in Labor-Intensive Manufacturing: A Comparative Analysis of Operator Fatigue and Process Instability",
      authors: "Fuad, M. M., Mazid, A. A., Adnan, M. I., & Ammar, K.",
      journal: "International Conference on Industrial Engineering and Operations Management",
      year: "2025",
      link: "https://doi.org/10.46254/BA08.20250379",
      status: "Published"
    },
    {
      type: "Under Review",
      title: "-",
      authors: "Md. Istiak Adnan",
      journal: "Journal of Cleaner Production",
      year: "2025",
      link: "#",
      status: "Under Review"
    },
    {
      type: "Working Paper",
      title: "-",
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
      title: "Lean & Quality Management, Six Sigma, Continuous Improvement",
      issuer: "MTF Institute",
      image: "/images/lean.jpg", // Note: In reality this would be an image of the cert
      link: "https://www.udemy.com/certificate/UC-e1a82dbe-6626-47ba-abff-f4271534db0f/",
      date: "2025"
    },
    {
      category: "Software & Tools",
      title: "Excel Skills for Business: Essentials",
      issuer: "Macquarie University",
      image: "/images/excel.jpg",
      link: "https://coursera.org/share/61193c244b0d9c4592c694ede8497ac6",
      date: "2023"
    },
    {
      category: "Software & Tools",
      title: "Data Analysis using Microsoft Excel",
      issuer: "Coursera Project Network",
      image: "/images/data_analysis.jpg",
      link: "https://coursera.org/share/0588aabedb6581c4c75465b58dc1600f",
      date: "2025"
    },
    {
      category: "Extracurricular",
      title: "UCLG ASPAC Photo Contest Winner",
      issuer: "UCLG ASPAC",
      image: "/images/uclg.jpg",
      date: "2025"
    },
    {
      category: "Involvements",
      title: "Campus Ambassador at Three Zero Policy Hackathon ",
      issuer: "",
      image: "/images/3zero.jpg",
      date: "2025"
    },
    {
      category: "Academic",
      title: "Internship at Pran",
      issuer: "PRAN-RFL GROUP",
      image: "/images/pran_certificate.jpg",
      date: "2025"
    }
  ],
  notices: [
    {
      title: "Open to Work 👀",
      content: "Graduating soon and on the lookout for a lucrative opportunity. If you think I'd be a good fit for your team, let's talk! 😁",
      date: "Apr 18, 2026",
      priority: "high"
    }
  ]
};
