import { Request, Response } from 'express';
import Company from '../models/company';
import User from '../models/user';

export async function getCompanies(_req: Request, res: Response) {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve companies.' });
    }
}

export async function updateCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { userId, name } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'Manager ID is required.' });
        }
        if (!name) {
            return res.status(400).json({ error: 'Company name is required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Manager user not found.' });
        }
        if (!user.company?.isManager) {
            return res.status(400).json({ error: 'User has to be a manager.' });
        }

        const updatedCompany = await Company.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found.' });
        }

        res.json(updatedCompany);
    } catch (err) {
        res.status(500).json({ error: 'Could not update the company.' });
    }
}

export async function updateCompanyMember(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { userId, isManager } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'Manager ID is required.' });
        }
        if (isManager === undefined) {
            return res.status(400).json({ error: 'Permission isManager is required.' });
        }

        const manager = await User.findById(userId);
        if (!manager) {
            return res.status(404).json({ error: 'Manager user not found.' });
        }

        if (!manager.company?.isManager) {
            return res.status(400).json({ error: 'First user has to be a manager.' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!user.company.id.equals(manager.company.id)) {
            return res.status(400).json({ error: 'User has to belong to manager\'s company.' });
        }

        let company = user.company;
        company.isManager = isManager;

        await user.updateOne({ company });
        res.status(201).json({});
    } catch (err) {
        res.status(500).json({ error: 'Could not update company member.' });
    }
}
