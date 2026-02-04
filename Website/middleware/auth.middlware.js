import { UnAuthorizedError } from "../utils/error.js";

export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  throw new UnAuthorizedError("User not authenticated. Please login first");
};


