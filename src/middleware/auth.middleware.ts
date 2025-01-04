import { Request, Response, NextFunction } from "express";
import { environment } from "../config/enviroment.js";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization;

  if (!token || token !== `Bearer ${environment.apiToken}`) {
    res.status(403).json({ error: "Forbidden: Invalid or missing token" });
    return;
  }

  next();
};
