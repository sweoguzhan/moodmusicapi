import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import friendRoutes from "./routes/frinedRoutes";
import musicRoutes from "./routes/musicRoutes";

// .env dosyasını yükle
dotenv.config();

// MongoDB'ye bağlan
connectDB();

// Express uygulamasını başlat
const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json()); // JSON body parse

// Kullanıcı rotalarını kullan
app.use("/api/users", userRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/friends", friendRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
