import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    company: {
        id: mongoose.Types.ObjectId;
        isManager: boolean;
    }
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    company: {
        type: {
            id: { type: Schema.Types.ObjectId, ref: 'Company' },
            isManager: { type: Boolean, default: false },
        },
        required: true
    }
});

export default mongoose.model<IUser>('User', UserSchema);
