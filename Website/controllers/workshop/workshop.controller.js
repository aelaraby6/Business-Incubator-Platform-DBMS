import {
  getAllWorkshopsQuery,
  getWorkshopByIdQuery,
  joinWorkshopQuery,
  leaveWorkshopQuery,
} from "../../models/workshop/Workshop.js";

// 1. Get All
export const getAllWorkshops = async (req, res, next) => {
  try {
    const workshops = await getAllWorkshopsQuery();

    res.json({
      status: "success",
      results: workshops.length,
      data: { workshops },
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get One
export const getOneWorkshop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workshop = await getWorkshopByIdQuery(id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json({
      status: "success",
      data: { workshop },
    });
  } catch (err) {
    next(err);
  }
};

// 3. Attend 
export const attendWorkshop = async (req, res, next) => {
  try {
    const workshopId = req.params.id;
    const userId = req.user.id;

    const workshop = await getWorkshopByIdQuery(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    const result = await joinWorkshopQuery(workshopId, userId);

    if (!result) {
      return res
        .status(400)
        .json({ message: "You have already joined this workshop." });
    }

    res.json({
      status: "success",
      message: "You joined the workshop successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// 4. Cancel Attendance 
export const cancelAttendance = async (req, res, next) => {
  try {
    const workshopId = req.params.id;
    const userId = req.user.id;

    const result = await leaveWorkshopQuery(workshopId, userId);

    if (!result) {
      return res
        .status(400)
        .json({ message: "You are not attending this workshop anyway." });
    }

    res.json({
      status: "success",
      message: "Attendance cancelled successfully.",
    });
  } catch (err) {
    next(err);
  }
};
