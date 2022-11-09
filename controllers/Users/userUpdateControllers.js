const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const bcrypt = require("bcrypt");
const { endpointResponse } = require("../../helpers/success");

module.exports = {
  updateUser: catchAsync(async (req, res, next) => {
    try {
      const { user } = req;

      const response = await user.update({ ...req.body });

      endpointResponse({
        res,
        message: "User Update",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error User update] - [UserUpdateController - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
