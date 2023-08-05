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

export async function updateCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found.' });
        }
        res.json(updatedCompany);
    } catch (err) {
        res.status(500).json({ error: 'Could not update the company.' });
    }
}

export async function deleteCompany(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedCompany = await Company.findByIdAndDelete(id);
        if (!deletedCompany) {
            return res.status(404).json({ error: 'Company not found.' });
        }
        res.json(deletedCompany);
    } catch (err) {
        res.status(500).json({ error: 'Could not delete the company.' });
    }
}
