import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

type IInputProps = TextFieldProps & {
	name: string;
	control: Control<FieldValues | any>;
};

const AppInput = (props: IInputProps) => (
	<Controller
		name={props.name}
		control={props.control}
		render={({ field }) => (
			<TextField
				{...props}
				{...field}
				margin={props.margin ? props.margin : "normal"}
				fullWidth={props.fullWidth ? props.fullWidth : true}
			/>
		)}
	/>
);

export default AppInput;
