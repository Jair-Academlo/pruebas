const createHttpError = require("http-errors");
/* const { Transaction } = require('../../database/models') */
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");
const { getTransactions } = require("../../services/transactions");

module.exports = {
  /*   getAllTransactions: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll();
      endpointResponse({
        res,
        message: 'Transactions obtained',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error obtaining TransactionSearch] - [transactionSearchController - GET]: ${error.message}`, 
      )
      next(httpError)
    }
  }),
} */

  get: catchAsync(async (req, res, next) => {
    try {
      const transactions = await getTransactions(req.query.page);
      endpointResponse({
        res,
        message: "Transactions retrieved successfully",
        body: transactions,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions] - [transactioons - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
