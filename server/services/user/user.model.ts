import mongoose, { ObjectId } from "mongoose";
export interface IUser {
	_id: ObjectId;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		firstName: {
			type: String,
			required: [true, "First Name required"],
		},
		lastName: {
			type: String,
			required: [true, "Last Name required"],
		},
		username: {
			type: String,
			required: [true, "Username required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password required"],
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
