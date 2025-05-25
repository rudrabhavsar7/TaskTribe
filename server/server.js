import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Routes
// app.use('/',()=>console.log("Api is working"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
