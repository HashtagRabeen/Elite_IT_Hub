const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 9000;

const connectDb = require("./src/db/connect");
connectDb();
const studentRouter = require("./src/Routes/studentRoute");
const courseRouter = require("./src/Routes/courseRoute");
const authRouter = require("./src/Routes/authRoute");
const assignmentRouter = require("./src/Routes/assignmentRoute");
const successRouter = require("./src/Routes/successRoute");
const testimonialRouter = require("./src/Routes/testimonialRoute");
const inquiryRouter = require("./src/Routes/inquiryRoute");
const enrollRouter = require("./src/Routes/enrollRoute");
const paymentRouter = require("./src/Routes/paymentRoute");

app.use(express.json());
app.use(cors());

app.use("/upload", express.static("./public/images"));
app.use("/api", studentRouter);
app.use("/api", courseRouter);
app.use("/api", authRouter);
app.use("/api", assignmentRouter);
app.use("/api", successRouter);
app.use("/api", testimonialRouter);
app.use("/api", inquiryRouter);
app.use("/api", enrollRouter);
app.use("/api", paymentRouter);

app.listen(PORT, () => {
  console.log(`The port is listening in port: ${PORT}`);
});
