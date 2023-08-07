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
        const { user, name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Company name is required.' });
        }

        const updatedCompany = await Company.findByIdAndUpdate(user.company.id, { name }, { new: true });
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
        const { user, isManager } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        if (isManager === undefined) {
            return res.status(400).json({ error: 'Permission isManager is required.' });
        }

        const member = await User.findById(id);
        if (!member) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!member.company.id.equals(user.company.id)) {
            return res.status(400).json({ error: 'User has to belong to manager\'s company.' });
        }

        let company = member.company;
        company.isManager = isManager;

        await member.updateOne({ company });
        res.status(201).json(member);
    } catch (err) {
        res.status(500).json({ error: 'Could not update company member.' });
    }
}
