import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req:Request,res:Response,next:NextFunction) {
    const token = req.headers.authorization;
    if(!token){
      return  res.status(401).json({message: "Unauthorized"});
    }

    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!);
    if(!decoded){
        return res.status(401).json({message: "Unauthorized"});
    }

    const userId = (decoded as any).payload.sub;
    if(!userId){
        return res.status(401).json({message: "Unauthorized"});
    }
    //@ts-ignore
    req.userId = (decoded as any).payload.sub;
    next();


}