import { Request, Response, NextFunction } from 'express';
import User from '../models/user'

export async function authenticateManager(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['auth'];
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  if (!user.company.isManager) {
    return res.status(403).json({ error: 'User is required to be a manager.' });
  }

  req.body.user = user;
  next();
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['auth'];
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  req.body.user = user;
  next();
}