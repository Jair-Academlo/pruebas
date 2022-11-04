const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");
const { ErrorObject } = require("../../helpers/error");
const { Transaction } = require("../../database/models/Transaction");

module.exports = {
  crearTransaccion: catchAsync(async (req, res, next) => {
    try {
      const newTransaction = await Transaction.create(req.body);

      endpointResponse({
        res,
        message: "result successfully",
        body: newTransaction,
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
