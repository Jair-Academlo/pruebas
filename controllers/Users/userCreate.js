const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");
const { User } = require("../../database/models");

module.exports = {
  crearUser: catchAsync(async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);

      endpointResponse({
        res,
        message: "result successfully",
        body: newUser,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
