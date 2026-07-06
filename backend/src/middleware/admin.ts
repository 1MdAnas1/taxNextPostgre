import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};