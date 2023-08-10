import Company, { ICompany } from '../models/company';
import Asset from '../models/asset';
import Unit from '../models/unit';

export default class CompanyStore {
    static async getCompanyOverview(id: string) {
        try {
            const company = await Company.findById(id);
            if (!company) {
                return null;
            }

            const units = await Unit.find({ companyId: id });

            const unitsWithAssets = await Promise.all(units.map(async unit => {
                const assets = await Asset.find({ unitId: unit.id });
                return {
                    unit,
                    assets,
                };
            }));

            return {
                company,
                assets: unitsWithAssets,
            };
        } catch (_) {
            throw new Error('Error fetching company overview.');
        }
    }
};
