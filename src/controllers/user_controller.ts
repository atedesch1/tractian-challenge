import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import Company from '../models/company';

export async function createUser(req: Request, res: Response) {
    try {
        const { name, companyId } = req.body;

        if (companyId && !(await Company.findById(companyId))) {
            return res.status(404).json({ error: 'Company not found.' });
        }
        
        const user: IUser = new User({ name, company: companyId });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Could not create the user.' });
    }
}

export async function getUsers(_req: Request, res: Response) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve users.' });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name, companyId } = req.body;

        if (companyId && !(await Company.findById(companyId))) {
            return res.status(404).json({ error: 'Company not found.' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { name, company: companyId }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Could not update the company.' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: 'Could not delete the company.' });
    }
}
