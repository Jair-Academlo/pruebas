const createHttpError = require("http-errors");
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error");

const { protectSession } = require("./userMiddleware");
module.exports = {
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
        `[Error ProtecAcount] - [ProtectAcount- POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
