import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { createUserSchemaController } from "../controllers/createUserSchemaController.js";

const router = express.Router();

router.post(
    "/create-user-schema", requireSignIn, isAdmin, createUserSchemaController,
);

export default router;