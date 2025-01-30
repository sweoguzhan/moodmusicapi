import User from "../models/User";
import mongoose from "mongoose";

const addFriend = async (userId: string, friendCode: string) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    const friend = await User.findOne({ friendCode });
    if (!friend) throw new Error("Friend not found with this code.");

    // @ts-ignore
    if (user.friends.includes(friend._id)) throw new Error("Already friends.");

    // @ts-ignore
    user.friends.push(friend._id);
    // @ts-ignore
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    return { message: "Friend added successfully", friend };
};

const removeFriend = async (userId: string, friendId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    const friend = await User.findById(friendId);
    if (!friend) throw new Error("Friend not found.");

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    return { message: "Friend removed successfully" };
};

const getFriends = async (userId: string) => {
    const user = await User.findById(userId).populate("friends", "firstName lastName email avatar");
    if (!user) throw new Error("User not found.");

    return user.friends;
};

export default { addFriend, removeFriend, getFriends };
