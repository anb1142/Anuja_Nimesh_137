import mongoose, { ObjectId } from "mongoose";

export interface IRecipe {
	user: ObjectId;
	name: string;
	ingredients: string;
	instructions: string;
	cookingTime: number;
	createdAt?: Date;
	updatedAt?: Date;
}
const recipeSchema = new mongoose.Schema<IRecipe>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			require: [true, "Name required"],
		},
		ingredients: {
			type: String,
			require: [true, "Ingredients required"],
		},
		instructions: {
			type: String,
			require: [true, "Instructions required"],
		},
		cookingTime: {
			type: Number,
			require: [true, "Cooking time required"],
		},
	},
	{
		timestamps: true,
	}
);

const Recipe = mongoose.model<IRecipe>("Recipe", recipeSchema);
export default Recipe;
