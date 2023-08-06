import { Request, Response } from 'express';
import Unit, { IUnit } from '../models/unit';
import User from '../models/user';

export async function registerUnit(req: Request, res: Response) {
    try {
        const { userId, name } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'Manager ID is required.' });
        }
        if (!name) {
            return res.status(400).json({ error: 'Unit name is required.' });
        }

        const manager = await User.findById(userId);
        if (!manager) {
            return res.status(404).json({ error: 'Manager user not found.' });
        }
        if (!manager.company?.isManager) {
            return res.status(400).json({ error: 'User has to be a manager.' });
        }

        const unit: IUnit = new Unit({ name, company: manager.company?.id });
        await unit.save();
        res.status(201).json(unit);
    } catch (err) {
        res.status(500).json({ error: 'Could not register unit.' });
    }
}

export async function getUnits(_req: Request, res: Response) {
    try {
        const units = await Unit.find();
        res.json(units);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve units.' });
    }
}
