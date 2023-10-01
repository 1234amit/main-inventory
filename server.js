import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import createuserSchema from './routes/createuserSchema.js';
import cors from 'cors';
import viewUserRoute from './routes/viewUserRoute.js';
import viewUsersSchema from './routes/viewUsersSchema.js';
import allUsersSchema from './routes/allUsersSchema.js';
import updateUsersSchema from './routes/updateUsersSchema.js';
import viewSingleUserRoute from './routes/viewSingleUserRoute.js';

// configure dotenv
dotenv.config();

// connect db
connectDB();

// rest objects
const app = express();

// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/createUserSchema", createuserSchema);
app.use("/api/v1/viewUsers", viewUserRoute);
app.use("/api/v1/view_users_schema", viewUsersSchema);
app.use("/api/v1/all_users_schema", allUsersSchema);
app.use("/api/v1/update_users_schema", updateUsersSchema);
app.use("/api/v1/viewSingleUser", viewSingleUserRoute);



// rest api
app.get("/", (req, res) => {
    res.send({
        message: "Wellcome to my server"
    })
})

// port

const PORT = process.env.PORT || 8888;

// run and listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})