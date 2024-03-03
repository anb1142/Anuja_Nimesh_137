import Cookies from "js-cookie";
import http from "../../utils/http";
import {
	ISignInRequestDto,
	ISignInResponseDto,
	ISignUpRequestDto,
	IUser,
} from "./auth.type";

const API_URL = "/users";

const save_cookie = (name: string, data: IUser) => {
	Cookies.set(name, JSON.stringify(data), { expires: 7, sameSite: "Strict" });
};

export const login = async (
	userData: ISignInRequestDto
): Promise<ISignInResponseDto | false> => {
	const res = await http.post(`${API_URL}/login`, userData);
	if (res.data) {
		save_cookie("user", res.data);
		return res.data;
	}
	return false;
};

export const getMe = async (): Promise<ISignInResponseDto | false> => {
	const res = await http.get(`${API_URL}/me`);
	if (res.data) {
		return res.data;
	}
	logout();
	return false;
};

export const register = async (
	userData: ISignUpRequestDto
): Promise<ISignInResponseDto | false> => {
	const res = await http.post(API_URL, userData);
	if (res.data) {
		save_cookie("user", res.data);
		return res.data;
	}
	return false;
};

export const logout = () => {
	Cookies.remove("user");
};
