import { Box, Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

type QuickFormProps = {
	name: string;
	children: React.ReactNode;
	reRouteText?: string;
	reRouteTo?: string;
	submitText?: string;
	autoComplete?: string;
	buttonExtra?: React.ReactNode;
	onSubmit: React.FormEventHandler<Element>;
};

function QuickForm(props: QuickFormProps) {
	return (
		<Box
			component="form"
			onSubmit={props.onSubmit}
			autoComplete={props.autoComplete}
			sx={{
				borderRadius: "2vh",
				border: "1px solid #ccc",
				padding: { lg: 4, md: 4, sm: 4, xs: 3 },
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				width: { lg: "420px", md: "420px", sm: "420px", xs: "90vw" },
			}}
		>
			<Typography
				align="center"
				component="h1"
				variant="h5"
				sx={{
					pb: 2,
					cursor: "default",
				}}
			>
				{props.name}
			</Typography>
			{props.children}
			<Box
				sx={{
					width: "80%",
					display: "flex",
					justifyContent: "space-around",
					mt: 3,
				}}
			>
				<Button size="large" type="submit" variant="contained">
					{props.submitText || props.name}
				</Button>

				{props.buttonExtra && props.buttonExtra}
			</Box>

			{props.reRouteTo && (
				<Link sx={{ mt: 2 }} component={RouterLink} to={props.reRouteTo}>
					<Typography>{props.reRouteText}</Typography>
				</Link>
			)}
		</Box>
	);
}

export default QuickForm;
