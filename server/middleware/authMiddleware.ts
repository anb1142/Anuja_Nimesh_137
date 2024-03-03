import asyncHandler from "express-async-handler";
import User from "../services/user/user.model";
import jwtWrapper from "../utils/jwtWrapper";

const protect = asyncHandler(async (req, res, next) => {
	const auth = req.headers.authorization;
	if (auth?.startsWith("Bearer")) {
		try {
			const token = auth.split(" ")[1];
			const decoded = jwtWrapper.verify(token);
			const user = await User.findById(decoded._id).select("-password");
			if (user === null) {
				res.status(401);
				throw new Error("Not authorized");
			}
			req.body.auth = user;

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized");
	}
});

export default protect;
