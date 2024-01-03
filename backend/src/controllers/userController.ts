import { Router, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/user"

const UserRouter = Router();

interface ISignUpBody {
  username: string;
  password: string;
}

interface ISignupRequest extends Request {
  body: ISignUpBody;
}

// Signup route to create a new user
UserRouter.post("/signup", async (req: ISignupRequest, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
  } catch (error) {
    res.status(400).send(`error: ${error}`);
  }
});

interface ILoginBody {
  username: string;
  password: string;
}

interface ILoginRequest extends Request {
  body: ILoginBody;
}

const SECRET = process.env.SESSION_SECRET as string;

// Login route to verify a user and get a token
UserRouter.post("/login", async (req: ILoginRequest, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default UserRouter;

// test