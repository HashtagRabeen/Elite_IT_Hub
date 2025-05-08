const paymentModel = require("../model/paymentModel");

const createPayment = async (req, res) => {
  try {
    const {
      transaction_code,
      status,
      total_amount,
      userId,
      userName,
    } = req.body;

    const payment = await paymentModel.create({
      transaction_code,
      status,
      total_amount,
      userId,
      userName,
    });

    res.status(201).json({ message: "Payment recorded", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not save payment", error: err.message });
  }
};
const getPayment = async (req, res) => {
  try {
    let showPayment = await paymentModel.find();
    res
      .status(201)
      .json({ message: "Inquiry found successfully", showPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting payment history", error });
  }
};

module.exports={createPayment,getPayment}
