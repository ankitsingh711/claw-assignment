import { Response, Request } from 'express';
import SessionModel from '../models/sessionModel';
import { IUser } from '../models/userModel';

interface CustomRequest extends Request {
  user? : IUser
}

export const getSessions = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const sessions = await SessionModel.find();
    res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
