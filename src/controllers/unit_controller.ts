import { Request, Response } from 'express';
import Unit, { IUnit } from '../models/unit';
import UnitStore from '../stores/unit_store';

export async function registerUnit(req: Request, res: Response) {
    try {
        const { user, name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Unit name is required.' });
        }

        const unit: IUnit = new Unit({ name, companyId: user.company.id });
        await unit.save();
        res.status(201).json(unit);
    } catch (err) {
        res.status(500).json({ error: 'Could not register unit.' });
    }
}

export async function getUnits(_req: Request, res: Response) {
    try {
        const units = await Unit.find();
        res.status(200).json(units);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve units.' });
    }
}

export async function getUnit(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { user } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Unit ID is required.' });
        }

        const unitWithAssets = await UnitStore.getUnitWithAssets(id);
        if (!unitWithAssets) {
            return res.status(404).json({ error: 'Unit not found.' });
        }
        if (!unitWithAssets.unit.companyId.equals(user.company.id)) {
            return res.status(403).json({ error: 'Unit has to belong to user\'s company.' });
        }

        res.status(200).json(unitWithAssets);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve unit.' });
    }
}