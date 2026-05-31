import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const user = {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin' as const,
  };

  const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '24h' });

  res.json({ token, user });
};
