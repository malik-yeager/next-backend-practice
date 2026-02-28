import { Request, Response } from "express"
import * as userService from "../services/user.service"

export interface UserParams {
  id?: string
}

export class UserController {
  // ✅ Get all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers()

      res.json({
        status: "success",
        total: users.length,
        data: users,
      })
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      })
    }
  }

  // ✅ Get user by ID
  async getUserById(req: Request<UserParams>, res: Response) {
    const { id } = req.params
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing user ID",
      })

    try {
      const user = await userService.getUserById(id)
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "User not found",
        })

      res.json({
        status: "success",
        data: user,
      })
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      })
    }
  }

  // ✅ Create new user
  async createUser(req: Request, res: Response) {
    const { name, email, roleId, bio, social_links } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    try {
      const user = await userService.createUser(name, email, roleId, bio, social_links);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }


  // ✅ Update user by ID
  async updateUser(req: Request<UserParams>, res: Response) {
    const { id } = req.params
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing user ID",
      })

    const { name, email, roleId, bio, social_links } = req.body

    try {
      const user = await userService.updateUser(id, name, email, roleId, bio, social_links)
      res.json({
        status: "success",
        data: user,
      })
    } catch (err: any) {
      if (err.message === "User not found") {
        return res.status(404).json({
          status: "error",
          message: err.message,
        })
      }
      res.status(500).json({
        status: "error",
        message: err.message,
      })
    }
  }

  // ✅ Delete user by ID
  async deleteUser(req: Request<UserParams>, res: Response) {
    const { id } = req.params
    if (!id)
      return res.status(400).json({
        status: "error",
        message: "Missing user ID",
      })

    try {
      const result = await userService.deleteUser(id)
      res.json({
        status: "success",
        message: result.message,
      })
    } catch (err: any) {
      if (err.message === "User not found") {
        return res.status(404).json({
          status: "error",
          message: err.message,
        })
      }
      res.status(500).json({
        status: "error",
        message: err.message,
      })
    }
  }
}
