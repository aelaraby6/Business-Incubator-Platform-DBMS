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
