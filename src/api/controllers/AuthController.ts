import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required' });
      
      const accessToken = await this.authService.refresh(refreshToken);
      res.status(200).json({ accessToken });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };

  setup = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.setupAdmin(email, password);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
