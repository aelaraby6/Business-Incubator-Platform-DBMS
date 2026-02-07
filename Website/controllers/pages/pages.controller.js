export const getAboutPage = (req, res) => {
  res.render("pages/about", {
    title: "Who We Are",
  });
};

export const getMentorsPage = (req, res) => {
  const mentors = [
    {
      name: "Ahmed Ali",
      role: "Senior Backend Engineer",
      company: "Googie", 
      image: "/assets/images/naguib.png",
      bio: "Architecting scalable APIs and Microservices. I turn coffee into clean, efficient code.",
      color: "#FFDE59", 
    },
    {
      name: "Abdelrahman Elaraby",
      role: "Senior DevOps Engineer",
      company: "Sbotify", 
      image: "/assets/images/araby.png",
      bio: "Master of CI/CD pipelines, Kubernetes, and Docker. I make sure production never breaks on Fridays.",
      color: "#FF90E8", 
    },
    {
      name: "Abdelrahman Selim",
      role: "Frontend Architect",
      company: "Annazon", 
      image: "/assets/images/selim.jpeg", 
      bio: "State Management obsession (Redux, Zustand). obsessed with pixel-perfect UIs and Web Performance.",
      color: "#5465FF",
    },
  ];

  res.render("pages/mentors", {
    title: "Meet Our Mentors",
    mentors: mentors,
  });
};

// workshopController.js

export const getWorkshopsPage = (req, res) => {
  const workshops = [
    {
      title: "Building Your MVP in 4 Weeks",
      category: "Product Development",
      description: "Learn how to validate your idea and build a minimum viable product fast. No code? No problem.",
      trainer: "Sarah Mitchell",
      date: "March 15, 2026",
      location: "Hall A - Building 3",
      duration: "3 Hours",
      total_seats: 30,
      seats_available: 12,
      color: "#5465FF",
      icon: "fa-solid fa-rocket"
    },
    {
      title: "Pitch Deck Mastery",
      category: "Fundraising",
      description: "Craft a compelling pitch deck that investors can't ignore. Learn storytelling, design, and delivery.",
      trainer: "Ahmed Hassan",
      date: "March 18, 2026",
      location: "Innovation Lab",
      duration: "2 Hours",
      total_seats: 25,
      seats_available: 8,
      color: "#5465FF",
      icon: "fa-solid fa-rocket"
    },
    {
      title: "Growth Hacking 101",
      category: "Marketing",
      description: "Grow your startup without breaking the bank. Viral loops, referral programs, and SEO hacks.",
      trainer: "Maria Rodriguez",
      date: "March 22, 2026",
      location: "Workshop Room B",
      duration: "4 Hours",
      total_seats: 20,
      seats_available: 0,
      color: "#FF90E8",
      icon: "fa-solid fa-chart-line"
    },
    {
      title: "Customer Discovery Workshop",
      category: "Strategy",
      description: "Talk to users. Validate assumptions. Build what people actually want.",
      trainer: "David Chen",
      date: "March 25, 2026",
      location: "Meeting Room 2",
      duration: "3 Hours",
      total_seats: 15,
      seats_available: 5,
      color: "#78FFD6",
      icon: "fa-solid fa-users"
    },
    {
      title: "Legal Basics for Startups",
      category: "Legal & Compliance",
      description: "Incorporation, contracts, IP protection. Everything you need to know to avoid legal disasters.",
      trainer: "Layla Ibrahim",
      date: "March 28, 2026",
      location: "Conference Room",
      duration: "2 Hours",
      total_seats: 30,
      seats_available: 18,
      color: "#FFB5E8",
      icon: "fa-solid fa-gavel"
    },
    {
      title: "Financial Modeling for Non-Finance Founders",
      category: "Finance",
      description: "Revenue projections, burn rate, unit economics. Master the numbers that matter.",
      trainer: "Omar Khalil",
      date: "April 2, 2026",
      location: "Hall A - Building 3",
      duration: "4 Hours",
      total_seats: 25,
      seats_available: 15,
      color: "#B4E7CE",
      icon: "fa-solid fa-chart-pie"
    },
    {
      title: "UI/UX Design Thinking",
      category: "Design",
      description: "User research, wireframing, prototyping. Design products people love to use.",
      trainer: "Nour Mahmoud",
      date: "April 5, 2026",
      location: "Design Studio",
      duration: "5 Hours",
      total_seats: 20,
      seats_available: 7,
      color: "#A8E6CF",
      icon: "fa-solid fa-palette"
    },
    {
      title: "Social Media Marketing on a Budget",
      category: "Marketing",
      description: "Content strategy, engagement hacks, and analytics. Build a following without spending a fortune.",
      trainer: "Yasmine Farid",
      date: "April 8, 2026",
      location: "Media Lab",
      duration: "3 Hours",
      total_seats: 35,
      seats_available: 22,
      color: "#FFD3B6",
      icon: "fa-solid fa-hashtag"
    },
    {
      title: "Agile & Scrum for Startups",
      category: "Project Management",
      description: "Sprint planning, daily standups, retrospectives. Ship faster, iterate smarter.",
      trainer: "Karim Youssef",
      date: "April 12, 2026",
      location: "Workshop Room A",
      duration: "4 Hours",
      total_seats: 25,
      seats_available: 0,
      color: "#DCEDC1",
      icon: "fa-solid fa-diagram-project"
    }
  ];

  res.render("pages/workshops", {
    title: "Workshops & Training",
    workshops: workshops,
  });
};

