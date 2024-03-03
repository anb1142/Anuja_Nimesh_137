import asyncHandler from "express-async-handler";
import Recipe from "./recipe.model";

export const getRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find()
		.sort({
			createdAt: -1,
		})
		.populate("user");
	res.status(200).json(recipes);
});
export const getUserRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find({ user: req.body.auth.id })
		.sort({
			createdAt: -1,
		})
		.populate("user");
	res.status(200).json(recipes);
});

export const setRecipe = asyncHandler(async (req, res) => {
	const { name, ingredients, instructions, cookingTime } = req.body;
	if (!name || !ingredients || !instructions || !cookingTime) {
		res.status(400);
		throw new Error("Add all fields");
	}

	const recipe = await Recipe.create({
		name,
		ingredients,
		instructions,
		cookingTime,
		user: req.body.auth.id,
	});
	res.status(200).json(recipe);
});
