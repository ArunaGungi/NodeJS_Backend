const express = require("express");
const dotenv = require("dotenv").config();
const contactsRouter = require("./routes/contactsRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const userRouter = require("./routes/userRouter");

connectDB();
const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/user", userRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`))