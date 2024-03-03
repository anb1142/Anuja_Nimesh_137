import {
	Card,
	CardContent,
	FormLabel,
	Slider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes, getUserRecipes } from "../services/recipe/recipe.service";
import { IRecipes } from "../services/recipe/recipe.type";

type Props = { id?: string };

const Recipes = (props: Props) => {
	const [recipes, setRecipes] = useState<IRecipes>([]);
	const [query, setQuery] = useState("");
	const [time, setTime] = useState<number[]>([0, 1000]);
	const handleCookingTime = (event: Event, newValue: number | number[]) => {
		setTime(newValue as number[]);
	};
	useEffect(() => {
		const getData = async () => {
			const res = await (props.id ? getUserRecipes(props.id) : getRecipes());
			if (res.data) setRecipes(res.data);
		};
		getData();
	}, []);
	const filteredRecipes = recipes.filter(
		(recipe) =>
			(recipe.user.username.includes(query) ||
				recipe.user.firstName.includes(query) ||
				recipe.user.lastName.includes(query) ||
				recipe.name.includes(query)) &&
			recipe.cookingTime >= time[0] &&
			recipe.cookingTime <= time[1],
	);
	const highest = recipes
		.map((recipe) => recipe.cookingTime)
		.sort((a, b) => b - a)[0];
	return (
		<section style={{ width: "40vh" }}>
			<div
				style={{
					marginBottom: "2vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<TextField
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					label={"Filter with Recipe name or user"}
					sx={{ width: "100%", mb: "2vh" }}
				/>
				<FormLabel sx={{ alignSelf: "baseline" }}>Cooking Time</FormLabel>
				<Slider
					getAriaLabel={() => "Cooking Time"}
					value={time}
					onChange={handleCookingTime}
					valueLabelDisplay="auto"
					getAriaValueText={(value) => `${value} Minutes`}
					max={highest}
					sx={{ width: "92%" }}
				/>
			</div>
			<Stack>
				{filteredRecipes.map((recipe) => (
					<Card
						key={recipe._id}
						variant="outlined"
						sx={{
							width: "40vh",
							mb: "2vh",
						}}
					>
						<CardContent>
							<Typography
								sx={{
									display: "flex",
									justifyContent: "space-between",
									mb: "1vh",
								}}
							>
								<span>
									{recipe.name} - {recipe.cookingTime} Minutes
								</span>
								<Link to={`/user/${recipe.user._id}`} style={{ opacity: 0.5 }}>
									{recipe.user.username}
								</Link>
							</Typography>
							<Typography
								sx={{
									mb: ".5vh",
								}}
							>
								Ingredients: <br />
								{recipe.ingredients}
							</Typography>
							<Typography>
								Instructions: <br />
								{recipe.instructions}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Stack>
		</section>
	);
};

export default Recipes;
