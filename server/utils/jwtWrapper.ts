import { ObjectId } from "mongoose";

const jwt = require("jsonwebtoken");

export default {
	generate: (_id: ObjectId) =>
		jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" }),
	verify: (token: string) => jwt.verify(token, process.env.JWT_SECRET),
};
