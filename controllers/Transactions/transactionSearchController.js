const createHttpError = require("http-errors");
const { Transaction } = require("../../database/models");
const { endpointResponse } = require("../../helpers/success");
const { catchAsync } = require("../../helpers/catchAsync");

const { Op } = require("sequelize");
const { paginate } = require("../../database/paginate/paginate");

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

  /* get: catchAsync(async (req, res, next) => {
    try {
      const { page, limit = 10 } = req.query;

      let options = {
        limit,
        offset: +page * limit,
      };

      const { count, rows } = await Transaction.findAndCountAll(options);

      endpointResponse({
        res,
        message: "Transactions retrieved successfully",
        body: {
          total: count,
          transactions: rows,
        },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions] - [transactioons - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
}; */

  listTransactions: async (req, res) => {
    try {
      const {
        q,
        page = 1,
        limit = 10,
        order_by,
        order_direction = "asc",
      } = req.query;

      let search = {};
      let order = [];

      if (q) {
        search = {
          where: { name: { [Op.like]: `%${q}%` } },
        };
      }

      if (order_by && order_direction) {
        order.push([order_by, order_direction]);
      }

      const transform = (records) => {
        return records.map((Transaction) => {
          return {
            Transaction,
          };
        });
      };

      const transactions = await paginate(
        Transaction,
        page,
        limit,
        search,
        order,
        transform
      );

      return res.status(200).json({
        success: true,
        message: "operacion exitosa",
        code: transactions,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
