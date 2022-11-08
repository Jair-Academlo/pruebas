const { ErrorObject } = require("../helpers/error");
const { Transaction } = require("../database/models");

exports.getTransactions = async (page) => {
  try {
    const data = await Transaction.findAndCountAll({
      limit,
      offset,
    });
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
