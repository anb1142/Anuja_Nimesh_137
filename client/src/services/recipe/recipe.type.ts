import { AxiosResponse } from "axios";
import { IUser } from "../auth/auth.type";

export interface IRecipe {
	_id: string;
	user: IUser;
	name: string;
	ingredients: string;
	instructions: string;
	cookingTime: number;
	createdAt: Date;
	updatedAt: Date;
}
export interface IAddRecipe {
	name: string;
	instructions: string;
	ingredients: string;
	cookingTime: number;
}

export type IRecipes = Array<IRecipe>;

export type IRecipesDto = AxiosResponse<IRecipes>;
export type IRecipeDto = AxiosResponse<IRecipe>;
