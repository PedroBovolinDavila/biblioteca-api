import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

class verifyAdmin {
  public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { adminId } = req.body;

    const selectedUser = await User.findById(adminId);

    if (!selectedUser) {
      return res.status(401).send();
    }

    if (selectedUser.isAdmin) {
      next();
    } else {
      return res.status(401).send();
    }
  }
}

export default new verifyAdmin();