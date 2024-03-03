import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppInput from "../components/AppInput";
import QuickForm from "../components/SignForm";
import { login } from "../services/auth/auth.service";
const loginSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup
		.string()
		.min(8, "Must be at least 8 characters")
		.max(32, "Must be less than 32 characters")
		.required("Required"),
});

export type ILoginInput = {
	username: string;
	password: string;
};

function Login() {
	const navigate = useNavigate();
	useEffect(() => {
		const userCookie = Cookies.get("user");
		if (userCookie) navigate("/");
	}, [navigate]);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginInput>({
		delayError: 300,
		mode: "onChange",
		resolver: yupResolver(loginSchema),
		defaultValues: { username: "", password: "" },
	});

	const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
		const res = await login(data);
		if (res) navigate("/");
	};
	return (
		<QuickForm
			name={"Sign In"}
			onSubmit={handleSubmit(onSubmit)}
			reRouteText={"Don't have an account? Register Here"}
			reRouteTo="/register"
		>
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
				type="password"
				label="Password"
				error={errors.password ? true : false}
				helperText={errors.password?.message}
			/>
		</QuickForm>
	);
}

export default Login;
