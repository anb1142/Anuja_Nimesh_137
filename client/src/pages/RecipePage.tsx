import { Button, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Recipes from "../components/Recipes";

function RecipePage() {
	const { id } = useParams();
	return (
		<>
			<Typography
				component={"h1"}
				variant="h1"
				fontWeight={500}
				sx={{
					fontSize: { lg: "6vh", md: "5.5vw", sm: "8vw", xs: "12vw" },
					marginBottom: "2vh",
				}}
			>
				Recipes
				<Button
					component={Link}
					href="/new"
					variant="contained"
					sx={{ ml: "2vh" }}
				>
					New
				</Button>
			</Typography>
			<Recipes id={id} />
		</>
	);
}

export default RecipePage;
