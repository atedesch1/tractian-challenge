import mongoose, { Schema, Document } from 'mongoose';

export interface IUnit extends Document {
    name: string;
    companyId: mongoose.Types.ObjectId;
}

const UnitSchema: Schema = new Schema({
    name: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
});

export default mongoose.model<IUnit>('Unit', UnitSchema);
