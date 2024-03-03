import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppInput from "../components/AppInput";
import QuickForm from "../components/SignForm";
import { createRecipe } from "../services/recipe/recipe.service";
import { IAddRecipe } from "../services/recipe/recipe.type";
const loginSchema = yup.object().shape({
	name: yup.string().required("Name required"),
	ingredients: yup.string().required("Ingredients required"),
	instructions: yup.string().required("Instructions required"),
	cookingTime: yup.number().min(1).required("Cooking Time required"),
});

function NewRecipe() {
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddRecipe>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(loginSchema),
		defaultValues: {
			name: "",
			ingredients: "",
			instructions: "",
			cookingTime: 0,
		},
	});

	const onSubmit: SubmitHandler<IAddRecipe> = async (data) => {
		const res = await createRecipe(data);
		if (res) navigate("/");
	};
	return (
		<QuickForm name={"New Recipe"} onSubmit={handleSubmit(onSubmit)}>
			<AppInput
				name="name"
				control={control}
				label="Name"
				error={errors.name ? true : false}
				helperText={errors.name?.message}
			/>
			<AppInput
				name="ingredients"
				control={control}
				label="Ingredients"
				error={errors.ingredients ? true : false}
				helperText={errors.ingredients?.message}
			/>
			<AppInput
				name="instructions"
				control={control}
				label="Instructions"
				error={errors.instructions ? true : false}
				helperText={errors.instructions?.message}
				multiline
				rows={3}
			/>
			<AppInput
				name="cookingTime"
				control={control}
				label="Cooking Time in Minutes"
				error={errors.cookingTime ? true : false}
				helperText={errors.cookingTime?.message}
			/>
		</QuickForm>
	);
}

export default NewRecipe;
