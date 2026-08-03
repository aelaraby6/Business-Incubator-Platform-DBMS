import {
  getAllMentors as getAllMentorsModel,
  addMentor as addMentorModel,
  deleteMentor as deleteMentorModel,
  updateMentor as updateMentorModel,
} from "../../models/admin/mentors.model.js";

export const getAllMentors = async (req, res, next) => {
  try {
    const mentors = await getAllMentorsModel();
    res.json(mentors);
  } catch (error) {
    next(error);
  }
};

export const addMentor = async (req, res, next) => {
  try {
    const mentor = await addMentorModel(req.body);
    res.status(201).json(mentor);
  } catch (error) {
    if (error.message?.includes("required")) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteMentor = async (req, res, next) => {
  try {
    const result = await deleteMentorModel(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message?.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

export const updateMentor = async (req, res, next) => {
  try {
    const mentor = await updateMentorModel(req.params.id, req.body);
    res.json(mentor);
  } catch (error) {
    if (error.message?.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};
