import { Schema, model, Document } from 'mongoose';

interface AuthorInterface extends Document {
  name: string;
}

const AuthorSchema = new Schema({
  name: {type: String, required: true}
})

export default model<AuthorInterface>('Author', AuthorSchema);