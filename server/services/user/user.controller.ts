import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwtWrapper from "../../utils/jwtWrapper";
import User, { IUser } from "./user.model";

export const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, username, password } = req.body;
	if (!firstName || !lastName || !username || !password) {
		res.status(400);
		throw new Error("Add all fields");
	}

	const userName = await User.findOne({ username });
	if (userName) {
		res.status(400);
		throw new Error("Username is already being used");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		firstName,
		lastName,
		username,
		password: hashedPassword,
	});

	if (!user) {
		res.status(400);
		throw new Error("Invalid user data");
	}

	res.status(201).json(userData(user));
});
export const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		res.status(400);
		throw new Error("Invalid User Data");
	}

	res.status(201).json(userData(user));
});
export const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(400);
		throw new Error("User not Found");
	}
	res.status(200).json({
		_id: user._id,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
	});
});

export const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.body.auth);
});

const userData = (user: IUser) => ({
	_id: user._id,
	username: user.username,
	firstName: user.firstName,
	lastName: user.lastName,
	token: jwtWrapper.generate(user._id),
});
