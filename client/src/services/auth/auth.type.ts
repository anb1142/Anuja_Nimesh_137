import { AxiosResponse } from "axios";

export interface ISignInRequestDto {
	username: string;
	password: string;
}

export type IUser = {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	token: string;
};
export type ISignInResponseDto = AxiosResponse<IUser>;

export interface ISignUpRequestDto {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}
