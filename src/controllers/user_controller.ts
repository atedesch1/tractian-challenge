import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import Company, { ICompany } from '../models/company';

export async function registerUser(req: Request, res: Response) {
    try {
        const { userName, companyName } = req.body;

        if (!userName) {
            return res.status(400).json({ error: 'User name is required.' });
        }
        if (!companyName) {
            return res.status(400).json({ error: 'Company name is required.' });
        }

        const company: ICompany = new Company({ name: companyName });

        await company.save();

        const user: IUser = new User({
            name: userName,
            company: {
                id: company.id,
                isManager: true,
            },
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Could not register user.' });
    }
}

export async function inviteUser(req: Request, res: Response) {
    try {
        const { user, name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Invitee name is required.' });
        }

        const invitee: IUser = new User({
            name: name,
            company: {
                id: user.company.id,
                isManager: false,
            },
        });

        await invitee.save();
        res.status(201).json(invitee);
    } catch (err) {
        res.status(500).json({ error: 'Could not invite user.' });
    }
}

export async function getUsers(_req: Request, res: Response) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve users.' });
    }
}
