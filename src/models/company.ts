import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
    name: string;
}

const CompanySchema: Schema = new Schema<ICompany>({
    name: { type: String, required: true },
});

export default mongoose.model<ICompany>('Company', CompanySchema);
