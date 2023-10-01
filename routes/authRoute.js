import express from "express"
import { forgotPasswordController, registerController, loginController, testController } from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

// router object
const router = express.Router();
// routing register || method post
router.post("/register", registerController);
// routing login || method post
router.post("/login", loginController);

// forget password || post
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected route auth for user
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;