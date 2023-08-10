import Unit, { IUnit } from '../models/unit';
import Asset from '../models/asset';

export default class UnitStore {
    static async getUnitWithAssets(id: string) {
        try {
            const unit = await Unit.findById(id);
            if (!unit) {
                return null;
            }
        
            const assets = await Asset.find({ unitId: id });
            return {
                unit,
                assets,
            };
        } catch (_) {
            throw new Error('Error fetching unit with assets');
        }
    }
};
