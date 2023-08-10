import { Request, Response } from 'express';
import Unit, { IUnit } from '../models/unit';

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
