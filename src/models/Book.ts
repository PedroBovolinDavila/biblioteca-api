import { Schema, model, Document } from 'mongoose';

interface BookInterface extends Document {
  name: string;
  author: string;
  desc?: string;
  buyLink: string;
}

const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  desc: { type: String },
  buyLink: { type: String, required: true }
})

export default model<BookInterface>('Book', BookSchema);