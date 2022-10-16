import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);//dashboard
router.delete("/:id", verifyUser, deleteUser);//dashboard
router.get("/:id", verifyUser, getUser);//dashboard
router.get("/", verifyAdmin, getUsers); //dashboard
export default router;
