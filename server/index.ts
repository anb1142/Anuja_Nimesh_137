import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorMiddleware";
import UserRoutes from "./services/user/user.routes";
import RecipeRoutes from "./services/recipe/recipe.routes";

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users/", UserRoutes);
app.use("/api/recipe/", RecipeRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
