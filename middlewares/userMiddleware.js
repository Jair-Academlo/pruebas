const createHttpError = require("http-errors");
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error");
require("dotenv").config({ path: "./config" });
const jwt = require("jsonwebtoken");

// Model
const { User } = require("../database/models");

module.exports = {
  protectSession: catchAsync(async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith("Bearer")) {
        throw new ErrorObject("No token provided", 403);
      }

      const token = authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new ErrorObject(
          "The owner of this token does not exist anymore",
          403
        );
      }

      req.sessionUser = user;
      next();
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error sessionUser] - [sessionUser- POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  protectAccount: catchAsync(async (req, res, next) => {
    try {
      const { sessionUser, user } = req;

      if (sessionUser.id !== user.id) {
        throw new ErrorObject("You do not own this account", 403);
      }
      next();
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error ProtecAcount-1] - [ProtectAcount- POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
