import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import {AuthRequest} from "../types/express";

const registerUser = async (userData: Partial<IUser>) => {
    const { firstName, lastName, email, password, birthDate, gender } = userData;


    console.log(userData);
    if (!email || !password) throw new Error("Email and password are required.");

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists.");

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        birthDate,
        gender,
        friendCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    });

    return await newUser.save();
};




const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password.");

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) throw new Error("Invalid email or password.");

    return user;
};


const getProfile = async (userId: string) => {
    const user = await User.findById(userId).select("-password"); // Şifreyi hariç tutalım
    if (!user) throw new Error("User not found.");

    return user;
};

export default { registerUser, loginUser,getProfile};
