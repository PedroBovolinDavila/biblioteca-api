import { Request, Response } from 'express';
import User from '../models/User';

class AdminController {

  public async new(req: Request, res: Response): Promise<Response> {
    const { adminId, userId } = req.body;

    const verifyAdmin = await User.findById(adminId);

    if (!verifyAdmin.isAdmin) {
      return res.status(401).send();
    }

    try {

      const updatedUser = await User.findByIdAndUpdate(userId, {
        isAdmin: true
      })

      return res.status(200).json(updatedUser);

    } catch (err) {
      return res.status(401).json(err);
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { adminId, userId } = req.body;

    const verifyAdmin = await User.findById(adminId);

    if (!verifyAdmin.isAdmin) {
      return res.status(401).send();
    }

    if(userId === process.env.OW_ID) {
      return res.status(401).send();
    }

    try {

      const updatedUser = await User.findByIdAndUpdate(userId, {
        isAdmin: false
      })

      return res.status(200).json(updatedUser);

    } catch (err) {
      return res.status(401).json(err);
    }
  }

}

export default new AdminController();