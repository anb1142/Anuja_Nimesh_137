import http from "../../utils/http";
import { IAddRecipe, IRecipeDto, IRecipesDto } from "./recipe.type";

const API_URL = "/recipe";

export const getRecipes = async (): Promise<IRecipesDto> =>
	await http.get(API_URL);
export const getUserRecipes = async (id: string): Promise<IRecipesDto> =>
	await http.get(`${API_URL}/${id}`);

export const createRecipe = async (
	RecipeData: IAddRecipe
): Promise<IRecipeDto> => await http.post(API_URL, RecipeData);
