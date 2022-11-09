const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");
const { ErrorObject } = require("../../helpers/error");

require("dotenv").config({ path: "./config.env" });
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../database/models");

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ErrorObject("Wrong credentials 1", 400);
      }

      const isValidPassword = await bcryptjs.compare(password, user.password);

      /* if (!isValidPassword) {
        throw new ErrorObject("Wrong credentials 2", 400);
      }
 */
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1day",
      });

      user.password = undefined;

      endpointResponse({
        res,
        message: "login successfully",
        body: { user, token },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error auth login] - [loginController - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
