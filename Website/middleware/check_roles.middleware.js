import { UnAuthorizedError, ForbiddenError } from "../utils/error.js";

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.userRole) {
      throw new UnAuthorizedError("User not authenticated. Please login first.");
    }

    if (!roles.includes(req.session.userRole)) {
      throw new ForbiddenError("You do not have permission to access this resource.");
    }

    next();
  };
};
