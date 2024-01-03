import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
      if (token) {
        let secret = process.env.SESSION_SECRET as string
        const payload = await jwt.verify(token, secret);
        if (payload) {
          // store user data in request object
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malformed auth header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

