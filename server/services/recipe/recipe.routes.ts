import express from "express";
import protect from "../../middleware/authMiddleware";
import { getRecipes, getUserRecipes, setRecipe } from "./recipe.controller";

const RecipeRoutes = express.Router();

RecipeRoutes.route("/").get(protect, getRecipes).post(protect, setRecipe);
RecipeRoutes.route("/:id").get(protect, getUserRecipes);

export default RecipeRoutes;
