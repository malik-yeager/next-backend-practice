import { Request, Response } from "express";
import { getHomeData } from "../services/home";

export const getHome = (req: Request, res: Response) => {
    const data = getHomeData();
    res.json(data);
};
