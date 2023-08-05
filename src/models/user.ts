import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    company: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
