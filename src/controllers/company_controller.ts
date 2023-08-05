import { Request, Response } from 'express';
import Company, { ICompany } from '../models/company';

export async function createCompany(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const company: ICompany = new Company({ name });
        await company.save();
        res.status(201).json(company);
    } catch (err) {
        res.status(500).json({ error: 'Could not create the company.' });
    }
}

export async function getCompanies(_req: Request, res: Response) {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve companies.' });
    }
}
