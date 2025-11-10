import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { requireAuth } from "../middlewares/auth.middleware"

const router = Router()
const userController = new UserController()

router.get("/", requireAuth, userController.getAllUsers);
router.get("/:id", requireAuth, userController.getUserById);
router.post("/", requireAuth, userController.createUser);
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);


export default router
