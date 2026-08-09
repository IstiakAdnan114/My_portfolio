import type { BlogBlock } from "./blog/blocks";

/**
 * This file contains all the content for the portfolio.
 * You can easily add, delete, or change any content here.
 */

export const portfolioData = {
  site: {
    theme: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
      background: "#0f172a",
      surface: "#111827",
      text: "#f1f5f9"
    },
    navigation: [
      { label: "Home", path: "/", visible: true },
      { label: "About", path: "/about", visible: true },
      { label: "Experience", path: "/experience", visible: true },
      { label: "Skills", path: "/skills", visible: true },
      { label: "Projects", path: "/projects", visible: true },
      { label: "Publications", path: "/publications", visible: true },
      { label: "Blog", path: "/blog", visible: true },
      { label: "Certifications", path: "/certifications", visible: true },
      { label: "Notices", path: "/notices", visible: true },
      { label: "Photos", path: "/photos", visible: true },
      { label: "Contact", path: "/contact", visible: true }
    ],
    pageCopy: {
      home: { handle: "adnanistiak111", status: "Available for work", contactButton: "Get in Touch", cvButton: "Download CV" },
      about: { badge: "About me", heading: "About My Journey", description: "Discover my academic background, engineering interests, and the experiences that shaped my professional journey.", educationHeading: "Education" },
      experience: { badge: "Career journey", heading: "My Journey", description: "A timeline of my professional training, teaching experience, leadership roles, and community involvement.", professionalHeading: "Professional Experience", leadershipHeading: "Leadership & Service" },
      skills: { badge: "Technical toolkit", heading: "Expertise & Skills", description: "The engineering, analytical, software, and communication skills I use to turn ideas into practical solutions." },
      projects: { badge: "Project showcase", heading: "Featured Projects", description: "Explore the engineering, product design, software, and research projects I have built and documented." },
      publications: { badge: "My Research", heading: "Publications & Research", description: "A comprehensive list of journals, conference papers, and active research items exploring industrial optimization and AI integration." },
      blog: { badge: "Articles & ideas", heading: "Blog & Insights", description: "Exploring the intersections of Industrial Engineering, automation, and the digital future." },
      certifications: { badge: "My Credentials", heading: "Licenses & Certifications", description: "A track record of continuous learning, workshops, and verified professional achievements." },
      notices: { badge: "LIVE NEWSFEED", heading: "Announcement Board", description: "Stay updated with my latest workshops, collaborations, and project launches." },
      photos: { badge: "Photo gallery", heading: "Visual Memories", description: "A glimpse into my life outside of engineering—travels, volunteering, and photography." },
      contact: {
        badge: "Get in touch",
        heading: "Let's Build Together",
        description: "I'm currently exploring new opportunities in Industrial Production Engineering and Automation. Let's start a conversation!",
        formHeading: "Send Me a Message",
        formDescription: "Have an opportunity, idea, or question? Write to me directly and I will get back to you by email.",
        nameLabel: "Your name",
        emailLabel: "Your email",
        subjectLabel: "Subject",
        messageLabel: "Message",
        messageButton: "Send Message",
        successTitle: "Message sent",
        successMessage: "Thank you for reaching out. Your message is now in my inbox."
      }
    }
  },
  name: "Md. Istiak Adnan",
  title: "Industrial & Production Engineer",
  email: "adnanistiak111@gmail.com",
  phone: "+8801884562034",
  location: "BUET, Palashi, Dhaka",
  avatarUrl: "images/Adnan Professional.jpg",
  cvUrl: "https://drive.google.com/file/d/1unMI1EeA80gQqcDXh_oCAjVC4B-5pwmK/view?usp=sharing", // Add your CV link here (e.g., Google Drive link or file path)
  quote: "It is never too late to be who you might have been",
  socials: {
    linkedin: "https://linkedin.com/in/istiak-adnan",
    facebook: "https://www.facebook.com/mdistiak.adnan.9",
    github: "https://github.com/IstiakAdnan114",
    researchgate: "https://www.researchgate.net/profile/Md-Istiak-Adnan",
    grabcad: "https://grabcad.com/md.istiak.adnan-1"
  },
  about: `Recent Industrial and Production Engineering graduate from BUET with a strong foundation in manufacturing systems, operations management, machine learning, and quality control. Author of two peer-reviewed conference publications spanning stochastic modeling and NLP-based e-government analysis, alongside a ResearchGate poster on IoT-based pharmaceutical packaging, with an ongoing journal paper derived from an undergraduate thesis on automated colour recipe recommendation for reactive knit fabric dyeing using real industrial data. Hands-on industry experience includes Monte Carlo simulation and time study work at PRAN-RFL Group, complemented by part-time academic work at Udvash Academic and Admission Care. Proficient in Python, LaTeX, AutoCAD, SolidWorks, and core ML libraries, with a versatile technical skill set applicable across engineering, analytics, and operations domains. Driven by a desire to bridge engineering knowledge with practical impact, with a keen interest in applied research and innovation across industry and operations domains.
`,
  education: [
    {
      institution: "Bangladesh University of Engineering and Technology (BUET)",
      degree: "B.Sc. in Industrial and Production Engineering (IPE)",
      period: "2021 - 2026",
      color: "indigo",
      detailsLabel: "Explore IPE curriculum",
      detailsTitle: "What I studied in Industrial & Production Engineering",
      detailsIntro: "My BUET education combined manufacturing engineering, operations research, product design, quality, automation, management, and applied analytical methods. The catalogue below highlights the principal professional courses and what each area covered.",
      catalogueUrl: "https://ipe.buet.ac.bd/undergraduate-courses",
      courses: [
        {
          code: "IPE 105",
          title: "Cost and Management Accounting",
          category: "Engineering foundations",
          credits: "3.0",
          description: "Costing methods, manufacturing accounts, budgeting, financial statements, and using cost information for engineering decisions."
        },
        {
          code: "IPE 205",
          title: "Manufacturing Processes I",
          category: "Manufacturing systems",
          credits: "3.0",
          description: "Casting, welding, forming, finishing, powder metallurgy, process selection, tooling concepts, and manufacturing cost considerations."
        },
        {
          code: "IPE 207",
          title: "Probability and Statistics",
          category: "Analytics and optimization",
          credits: "4.0",
          description: "Probability distributions, estimation, hypothesis testing, regression, analysis of variance, experimental design, and stochastic engineering problems."
        },
        {
          code: "IPE 209",
          title: "Engineering Economy",
          category: "Engineering foundations",
          credits: "2.0",
          description: "Cash-flow analysis, discounting, investment appraisal, rates of return, depreciation, inflation, and sensitivity analysis."
        },
        {
          code: "IPE 301",
          title: "Measurement, Instrumentation and Control",
          category: "Automation and technology",
          credits: "3.0",
          description: "Engineering measurement principles, industrial instruments, sensors, control concepts, and their practical use in production systems."
        },
        {
          code: "IPE 303",
          title: "Product Design I",
          category: "Product and systems design",
          credits: "3.0",
          description: "Customer needs, product specifications, concept generation, value engineering, human factors, standards, and mechanical design fundamentals."
        },
        {
          code: "IPE 305",
          title: "Manufacturing Processes II",
          category: "Manufacturing systems",
          credits: "3.0",
          description: "Machining theory, cutting tools and economics, conventional and advanced machining, plastics processing, and process selection."
        },
        {
          code: "IPE 307",
          title: "Operations Research",
          category: "Analytics and optimization",
          credits: "4.0",
          description: "Mathematical modelling, linear and integer programming, transportation and assignment models, dynamic programming, queues, and simulation."
        },
        {
          code: "IPE 311",
          title: "Material Handling and Maintenance Management",
          category: "Operations and supply chain",
          credits: "3.0",
          description: "Material-flow analysis, conveyors and storage systems, warehouse design, packaging, maintenance strategies, reliability, and plant asset management."
        },
        {
          code: "IPE 315",
          title: "Operations Management",
          category: "Operations and supply chain",
          credits: "3.0",
          description: "Forecasting, inventory, aggregate planning, MPS and MRP, capacity, scheduling, work study, group technology, TQC, and JIT."
        },
        {
          code: "IPE 317",
          title: "Product Design II",
          category: "Product and systems design",
          credits: "3.0",
          description: "Reverse engineering, design for assembly and disassembly, reliability, product life cycle, prototyping, CAD, and engineering system design."
        },
        {
          code: "IPE 319",
          title: "Quality Management",
          category: "Quality and human systems",
          credits: "3.0",
          description: "Statistical process control, process capability, acceptance sampling, reliability, quality costs, ISO standards, and total quality management."
        },
        {
          code: "IPE 329",
          title: "Numerical Analysis",
          category: "Analytics and optimization",
          credits: "3.0",
          description: "Numerical solutions, interpolation, curve fitting, differentiation, integration, differential equations, and computational optimization."
        },
        {
          code: "IPE 403",
          title: "Project and Environmental Management",
          category: "Management and sustainability",
          credits: "3.0",
          description: "Project planning, CPM and PERT, budgeting, resource allocation, project control, environmental impact assessment, and industrial sustainability."
        },
        {
          code: "IPE 407",
          title: "Ergonomics and Safety Management",
          category: "Quality and human systems",
          credits: "3.0",
          description: "Human-machine interaction, biomechanics, anthropometry, workplace design, industrial hazards, risk management, safety standards, and worker wellbeing."
        },
        {
          code: "IPE 409",
          title: "CAD/CAM",
          category: "Automation and technology",
          credits: "3.0",
          description: "2D and 3D CAD, numerical control, CNC programming, CAM integration, flexible manufacturing systems, and industrial robotics."
        },
        {
          code: "IPE 411",
          title: "Industrial and Business Management",
          category: "Management and sustainability",
          credits: "3.0",
          description: "Management theory, organizational design, human resources, leadership, information systems, marketing, ethics, and business operations."
        },
        {
          code: "IPE 419",
          title: "Computer-Integrated Manufacturing",
          category: "Automation and technology",
          credits: "3.0",
          description: "Computer-aided process planning, PLCs, robots, automated storage and handling, flexible manufacturing, and factory automation."
        },
        {
          code: "IPE 451",
          title: "Supply Chain Management",
          category: "Operations and supply chain",
          credits: "3.0",
          description: "Sourcing, supplier selection, materials planning, logistics, inventory, warehousing, distribution, traceability, and lead-time reduction."
        },
        {
          code: "IPE 400",
          title: "Project and Thesis",
          category: "Research and practice",
          credits: "3.0",
          description: "A supervised engineering research project applying analysis, experimentation, design, and technical communication to a substantive problem."
        },
        {
          code: "IPE 300",
          title: "Industrial Practice",
          category: "Research and practice",
          credits: "3.0",
          description: "Structured industrial exposure connecting classroom methods with real production, operations, quality, and organizational practices."
        }
      ]
    },
    {
      institution: "Govt. Azizul Haque College, Bogura",
      degree: "Higher Secondary Certificate (HSC) — Science",
      period: "2018 - 2020",
      color: "purple",
      detailsLabel: "View study details",
      detailsTitle: "Higher Secondary Science Background",
      detailsIntro: "My higher-secondary studies established the science and mathematics foundation that prepared me for engineering education.",
      catalogueUrl: "",
      courses: [
        { code: "", title: "Physics", category: "Core science", credits: "", description: "Mechanics, waves, electricity, magnetism, optics, and introductory modern physics." },
        { code: "", title: "Chemistry", category: "Core science", credits: "", description: "Physical, inorganic, and organic chemistry with practical laboratory work." },
        { code: "", title: "Higher Mathematics", category: "Mathematics", credits: "", description: "Algebra, trigonometry, calculus, coordinate geometry, vectors, and applied mathematical reasoning." }
      ]
    },
    {
      institution: "Rural Development Academy Laboratory School and College, Bogura",
      degree: "Secondary School Certificate (SSC) — Science",
      period: "2013 - 2018",
      color: "violet",
      detailsLabel: "View study details",
      detailsTitle: "Secondary Science Background",
      detailsIntro: "My secondary education developed a broad grounding in science, mathematics, communication, and analytical problem-solving.",
      catalogueUrl: "",
      courses: [
        { code: "", title: "General Science", category: "Science foundation", credits: "", description: "Foundational concepts across physics, chemistry, biology, and practical scientific observation." },
        { code: "", title: "Mathematics", category: "Mathematics", credits: "", description: "Algebra, geometry, trigonometry, measurement, and structured problem-solving." }
      ]
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
      items: ["Bengali (Native)", "English (Professional)", "Hindi (Conversational)"]
    }
  ],
  projects: [
    {
      title: "Adnan's Personal Portfolio",
      description: "This personal portfolio showcases my journey, skills, and experiences in a single interactive platform. Through this project, I learned the fundamentals of HTML, CSS, and JavaScript, and also leveraged various AI tools to enhance design, layout, and content creation.",
      tags: ["HTML", "CSS", "JavaScript", "AI"],
      period: "Aug 2025 – Sep 2025",
      links: [
        { name: "Portfolio", url: "https://my-portfolio-adnan.vercel.app/", type: "external" },
        { name: "Github", url: "https://github.com/IstiakAdnan114/My_portfolio", type: "github" }
      ],
      coverImage: "",
      images: [],
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
      coverImage: "/images/IoT-project.jpg",
      images: [
        { src: "/images/IoT-project.jpg", caption: "Smart real-time pill dispensing and packaging prototype" }
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
      coverImage: "/images/slice and scrape.jpg",
      images: [
        { src: "/images/slice and scrape.jpg", caption: "Fabricated Slice and Scrape prototype" },
        { src: "/images/Project cover_page_short.jpg", caption: "Slice and Scrape product design overview" }
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
      coverImage: "/images/laferrari_rc.jpg",
      images: [
        { src: "/images/laferrari_rc.jpg", caption: "SolidWorks LaFerrari surface model render" }
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
      coverImage: "",
      images: [],
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
  `,
      blocks: [] as BlogBlock[]
    },
    {
      id: 2,
      title: "#",
      excerpt: "#",
      date: "Oct 15, 2025",
      category: "Manufacturing",
      image: "https://picsum.photos/seed/lean/1200/800",
      content: `
Likhbo pore `,
      blocks: [] as BlogBlock[]
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
      type: "Conference",
      title: "eGov-Lens: A Multi-Dimensional Machine Learning Approach to Aspect-Based Public Feedback Analysis on Bengali e-Government Platforms",
      authors: "Fuad, M. M., Mazid, A. A., Adnan, M. I., Das, T., Prapti, S. S., & Mahbub, N.",
      journal: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
      year: "2025",
      link: "https://doi.org/10.1109/ICCIT68739.2025.11491291",
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
      title: "A Hybrid Data-Driven Framework for Reactive Dye Recipe Recommendation in Textile Dyeing: A Case Study on Cotton and Blended Knit Fabrics",
      authors: "Fuad, M. M., Adnan, M. I., & Al Aziz, R.",
      journal: "TBD",
      year: "2025",
      link: "",
      status: "In Preparation"
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
      title: "Open to Work",
      content: "Recently graduated and actively seeking full-time opportunities across engineering, analytics, and operations. Open to meaningful roles where I can contribute and grow — feel free to reach out!",
      date: "June 15, 2026",
      priority: "high"
    }
  ]
};
