import "dotenv/config";

import dns from "dns";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fullstack-chat-app-yghb.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Chat App Backend is running!" });
});

connectDB();

export default app;