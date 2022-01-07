import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema({
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false }
});

export default model<UserInterface>('User', UserSchema);