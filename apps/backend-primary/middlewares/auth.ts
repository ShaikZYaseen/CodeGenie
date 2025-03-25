import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!,{
            algorithms:["RS256"],
        });
        const userId = (decoded as any).sub;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // @ts-ignore
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}