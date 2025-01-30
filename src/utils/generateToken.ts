import jwt from "jsonwebtoken";
import {Mongoose} from "mongoose";

const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
};

export default generateToken;
