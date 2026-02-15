import {
  getWorkshopByIdQuery,
  getAllWorkshopsQuery,
  checkEnrollmentQuery,
} from "../../models/workshop/Workshop.js";

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

export const getWorkshopsPage = async (req, res, next) => {
  try {
    const workshops = await getAllWorkshopsQuery();

    res.render("pages/workshops", {
      title: "Workshops & Training",
      workshops: workshops,
    });
  } catch (err) {
    next(err);
  }
};

// Workshop Detail Page
export const getWorkshopDetailPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workshop = await getWorkshopByIdQuery(id);

    if (!workshop) {
      return res.status(404).render("error/error", {
        message: "Workshop not found",
        status: 404,
      });
    }

    // Check if user is logged in and already enrolled
    let isEnrolled = false;
    let user = null;
    if (req.session && req.session.userId) {
      user = {
        id: req.session.userId,
        name: req.session.userName,
        email: req.session.userEmail,
      };
      const enrollment = await checkEnrollmentQuery(id, req.session.userId);
      isEnrolled = !!enrollment;
    }

    res.render("pages/workshop-detail", {
      title: workshop.title,
      workshop: workshop,
      user: user,
      isEnrolled: isEnrolled,
    });
  } catch (err) {
    next(err);
  }
};
