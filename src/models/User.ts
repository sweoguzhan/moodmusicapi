import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    birthDate: Date;
    gender: "Male" | "Female" | "Other";
    avatar?: string;

    friendCode: string; // Kullanıcının benzersiz arkadaş ekleme kodu
    friends: mongoose.Types.ObjectId[]; // Kullanıcının arkadaşlarının ID'leri
    currentMood?: string; // Kullanıcının anlık durumu
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        birthDate: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        avatar: { type: String, default: "" },

        friendCode: { type: String, unique: true }, // Arkadaş eklemek için benzersiz kod
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Arkadaş listesi
        currentMood : { type: String, default: "Undefined" }, // Kullanıcının anlık durumu
    },
    { timestamps: true }
);

// Şifre hashleme
userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Şifre doğrulama
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password!);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
