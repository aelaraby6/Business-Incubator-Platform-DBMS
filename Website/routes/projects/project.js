import { Router } from "express";
const router = Router();
const routes = {
  signupRoute: "/v1/auth/signup",
  loginRoute: "/v1/auth/login",
};

const projects = [
  {
    id: 1,
    title: "AI Learning Platform",
    description:
      "An intelligent learning management system powered by AI to personalize educational experiences for students.",
    problem:
      "Inconsistent learning approaches for diverse student backgrounds and learning styles. Traditional education systems use one-size-fits-all methods, leaving many students behind. Our platform uses AI to personalize the learning experience for each student based on their pace, learning style, and goals.",
    solution:
      "We have built an intelligent learning management system that uses AI and machine learning to adapt content based on individual student progress and learning style, provide real-time analytics for educators, and generate interactive AI-powered content tailored to each student.",
    techStack: ["React", "Node.js", "Python", "TensorFlow"],
    team: [
      {
        initials: "JD",
        name: "John Doe",
        role: "Lead Developer",
        color: "bg-blue-500",
      },
      {
        initials: "AK",
        name: "Anna Kumar",
        role: "AI/ML Specialist",
        color: "bg-purple-500",
      },
    ],
    teamCount: "2 members",
    status: "In Progress",
    links: { github: "#", demo: "#", website: "#" },
    fundingStage: "Seed Round",
    targetMarket: "EdTech, K-12, Higher Education",
    startDate: "January 2024",
    lookingForCoFounders: true,
    neededRoles: "Product Manager needed",
  },
  {
    id: 2,
    title: "Sustainable Supply Chain",
    description:
      "Blockchain-based solution to track and ensure sustainability in global supply chains.",
    problem:
      "Lack of transparency in supply chain sustainability practices. Companies struggle to verify the environmental and social impact of their supply chains.",
    solution:
      "A blockchain-based platform that tracks products from source to consumer, providing immutable records of sustainability metrics and enabling transparent reporting.",
    techStack: ["Blockchain", "Solidity", "Web3"],
    team: [
      {
        initials: "SM",
        name: "Sarah Mohamed",
        role: "Founder & CEO",
        color: "bg-green-500",
      },
    ],
    teamCount: "1 member (Looking for Co-founders)",
    status: "Idea",
    links: { github: "#", demo: "#", website: "#" },
    fundingStage: "Pre-Seed",
    targetMarket: "Supply Chain, Sustainability, ESG",
    startDate: "March 2024",
    lookingForCoFounders: true,
    neededRoles: "CTO, Blockchain Developer",
  },
  {
    id: 3,
    title: "Metaverse Gaming App",
    description:
      "Cross-platform metaverse gaming experience with NFT integration and social features.",
    problem:
      "Fragmented gaming experiences across platforms without true asset ownership. Gamers cannot truly own their in-game assets or transfer them between games.",
    solution:
      "A unified metaverse platform where players can own, trade, and use NFT-based assets across multiple games, with seamless cross-platform gameplay and social integration.",
    techStack: ["Unity", "Ethereum", "NFT"],
    team: [
      {
        initials: "RC",
        name: "Robert Chen",
        role: "Game Director",
        color: "bg-purple-500",
      },
      {
        initials: "NP",
        name: "Nina Patel",
        role: "3D Artist",
        color: "bg-pink-500",
      },
      {
        initials: "KL",
        name: "Kevin Lee",
        role: "Blockchain Developer",
        color: "bg-indigo-500",
      },
    ],
    teamCount: "3 members",
    status: "Completed",
    links: { github: "#", demo: "#", website: "#" },
    fundingStage: "Series A",
    targetMarket: "Gaming, Metaverse, Web3",
    startDate: "June 2023",
    lookingForCoFounders: false,
    neededRoles: "",
  },
];

router.get("/", (req, res) => {
  res.render("projects/projects", { routes, projects });
});

router.get("/new" , (req ,res) => {
  res.render("projects/add-project" , {routes});
})

router.get("/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).render("error/error", {
      routes,
      error: { message: "Project not found", status: 404 },
    });
  }

  res.render("projects/project-detail", { routes, project });
});

export default router;