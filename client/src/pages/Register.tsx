import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppInput from "../components/AppInput";
import QuickForm from "../components/SignForm";
import { register } from "../services/auth/auth.service";

const registerSchema = yup.object().shape({
	firstName: yup.string().required("First Name is Required"),
	lastName: yup.string().required("Last Name is Required"),
	username: yup.string().required("Username is Required"),
	password: yup
		.string()
		.min(8, "Must be at least 8 characters")
		.max(32, "Must be less than 32 characters")
		.required("Required"),
	password2: yup
		.string()
		.required("Required")
		.oneOf([yup.ref("password")], "Passwords does not match"),
});
type IRegisterInput = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	password2: string;
};
function Register() {
	const navigate = useNavigate();
	useEffect(() => {
		const userCookie = Cookies.get("user");
		if (userCookie) navigate("/");
	}, [navigate]);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
		const obj = {
			firstName: data.firstName,
			lastName: data.lastName,
			username: data.username,
			password: data.password,
		};
		const res = await register(obj);
		if (res) navigate("/");
	};

	return (
		<QuickForm
			name={"Register"}
			onSubmit={handleSubmit(onSubmit)}
			reRouteText={"Already registered ? Login Here"}
			reRouteTo="/login"
		>
			<AppInput
				name="firstName"
				control={control}
				label="First Name"
				error={errors.firstName ? true : false}
				helperText={errors.firstName?.message}
			/>
			<AppInput
				name="lastName"
				control={control}
				label="Last Name"
				error={errors.lastName ? true : false}
				helperText={errors.lastName?.message}
			/>
			<AppInput
				name="username"
				control={control}
				label="Username"
				error={errors.username ? true : false}
				helperText={errors.username?.message}
			/>
			<AppInput
				name="password"
				control={control}
				label="Password"
				type="password"
				error={errors.password ? true : false}
				helperText={errors.password?.message}
			/>
			<AppInput
				name="password2"
				control={control}
				label="Retype Password"
				type="password"
				error={errors.password2 ? true : false}
				helperText={errors.password2?.message}
			/>
		</QuickForm>
	);
}

export default Register;
