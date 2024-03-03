import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logout } from "../services/auth/auth.service";
import { ISignInResponseDto } from "../services/auth/auth.type";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<ISignInResponseDto | false>(false);
	const [loading, setLoading] = useState(true);
	// if(!user)
	useEffect(() => {
		const userCookie = Cookies.get("user");
		if (!userCookie) {
			navigate("/login");
		}
		const checkUser = async () => {
			const res = await getMe();
			setUser(res);
			setLoading(false);
		};
		checkUser();
		if (!user && !loading) {
			logout();
			navigate("/login");
		}
	}, [loading, user, navigate]);
	useEffect(() => {}, []);

	return <>{children}</>;
};

export default ProtectedRoute;
