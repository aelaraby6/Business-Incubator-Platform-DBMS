import {
  getAllProjects as getAllProjectsModel,
  getProjectById as getProjectByIdModel,
  updateProjectStatus as updateProjectStatusModel,
  getProjectsByStatus as getProjectsByStatusModel,
  toggleProjectApproved as toggleProjectApprovedModel,
  getProjectsStats as getProjectsStatsModel,
} from "../../models/admin/projects.model.js";

export const getAllProjects = async (req, res, next) => {
  try {
    res.json(await getAllProjectsModel());
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await getProjectByIdModel(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProjectStatus = async (req, res, next) => {
  try {
    const project = await updateProjectStatusModel(req.params.id, req.body.status);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjectsByStatus = async (req, res, next) => {
  try {
    res.json(await getProjectsByStatusModel(req.params.status));
  } catch (error) {
    next(error);
  }
};

export const toggleProjectApproved = async (req, res, next) => {
  try {
    const project = await toggleProjectApprovedModel(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjectsStats = async (req, res, next) => {
  try {
    res.json(await getProjectsStatsModel());
  } catch (error) {
    next(error);
  }
};
