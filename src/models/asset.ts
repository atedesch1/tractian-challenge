import mongoose, { Schema, Document } from 'mongoose';

export enum AssetStatus {
    Running = 'Running',
    Alerting = 'Alerting',
    Stopped = 'Stopped',
}

export interface IAsset extends Document {
    name: string;
    description: string;
    model: string;
    owner: string;
    status: AssetStatus;
    healthLevel: number;
    image: string;
    unitId: mongoose.Types.ObjectId;
}

const AssetSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    model: { type: String, required: true },
    owner: { type: String, required: true },
    status: { type: String, enum: AssetStatus, required: true },
    healthLevel: { type: Number, min: 0, max: 100, required: true },
    image: { type: String, required: true },
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
});

export default mongoose.model<IAsset>('Asset', AssetSchema);
