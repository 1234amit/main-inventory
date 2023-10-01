import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
// import { viewUsersControllers } from "../controllers/viewUsersControllers.js";
import { viewSingleUserController } from "../controllers/viewSingleUserController.js";

const router = express.Router();

router.get(
    "/view-single-user/:_id", requireSignIn, isAdmin, viewSingleUserController,
);

export default router;