import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import { viewUsersSchemaController } from "../controllers/viewUsersSchemaController.js";

const router = express.Router();

router.get(
    "/viewUsersSchema/:userId", requireSignIn, viewUsersSchemaController,
);

export default router;