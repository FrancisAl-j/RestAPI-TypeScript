import { Request, Response } from "express";
import { IUser } from "../utils/interfaces";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { Payload } from "../utils/interfaces";
import { generateToken } from "../utils/generateToken";

// Sign up
export const authRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password }: IUser = req.body;

  if (!name) {
    res.status(400).json({ message: "Name field required" });
    return;
  }

  if (!email) {
    res.status(400).json({ message: "Email field required" });
    return;
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    res.status(400).json({ message: "Email already existed." });
    return;
  }

  if (password.trim().length < 8) {
    // Don't do this -> return res.status(400).json({ message: "Password should be 8 characters long." }); it will cause an error on typescript since this is a return type
    res.status(400).json({ message: "Password should be 8 characters long." });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Create an account." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};

// Signin
export const authSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email field required" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Password field required" });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Invalid credentials, please check your email and password.",
      });

      return;
    }

    const checkPassword: boolean = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      res.status(401).json({
        message: "Invalid credentials, please check your email and password.",
      });

      return;
    }
    const userObject = user.toObject() as IUser;

    // Creating a payload, this can be use to retrieve or to check for user
    const payload: Payload = {
      _id: userObject._id,
      email: user.email,
      name: user.name,
    };

    // Generating token...
    generateToken(payload, res);

    const { password: hashedPassword, ...rest } = userObject;

    res.status(200).json(rest);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};

// Keeping the user logged in by checking their token/cookies
// Without this interface the Request won't recognize the "user" in req.user = user
interface CustomRequest extends Request {
  user?: any;
}

export const checkAuth = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};

// Log out
export const signout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 0 });

    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
      return;
    }
  }
};
