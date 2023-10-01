import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import { allUsersSchemaController } from "../controllers/allUsersSchemaController.js";

const router = express.Router();

router.get(
    "/allUsersSchema", requireSignIn, isAdmin, allUsersSchemaController,
);

export default router;