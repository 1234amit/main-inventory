import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
// import { allUsersSchemaController } from "../controllers/allUsersSchemaController.js";
import { updateUsersSchemaController } from "../controllers/updateUsersSchemaController .js";

const router = express.Router();

router.put(
    "/updateUsersSchema/:_id", requireSignIn, isAdmin, updateUsersSchemaController,
);

export default router;