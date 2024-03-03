import { Container } from "@mui/material";
import React from "react";

function AlignCenter(props: {
	children: React.ReactNode;
	mt?: string | number;
}) {
	return (
		<Container
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				mt: props.mt ? props.mt : 14,
				width: "100%",
				px: 0,
			}}
		>
			{props.children}
		</Container>
	);
}

export default AlignCenter;
