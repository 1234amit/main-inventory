import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { viewUsersControllers } from "../controllers/viewUsersControllers.js";

const router = express.Router();

router.get(
    "/view-users", requireSignIn, isAdmin, viewUsersControllers,
);

export default router;