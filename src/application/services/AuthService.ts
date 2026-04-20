import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import logger from '../../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'ozaco-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ozaco-refresh-secret-key';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  private generateTokens(user: any) {
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' } // Short lived
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // Long lived
    );

    return { accessToken, refreshToken };
  }

  async login(email: string, password?: string) {
    if (!password) throw new Error('Password is required');
    
    logger.debug(`Login attempt for: ${email}`);
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.role !== 'admin' || !user.password) {
      logger.warn(`Failed login attempt: ${email} - Unauthorized`);
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Failed login attempt: ${email} - Incorrect password`);
      throw new Error('Invalid credentials');
    }

    const tokens = this.generateTokens(user);

    logger.info(`Successful admin login: ${email}`);
    return { 
        ...tokens,
        user: { 
            id: user.id, 
            email: user.email, 
            role: user.role
        } 
    };
  }

  async refresh(token: string) {
    try {
      const payload = jwt.verify(token, JWT_REFRESH_SECRET) as any;
      
      // Better validation:
      if (!payload.id) throw new Error('Invalid token');
      
      // Re-sign just the access token or both if we want sliding window
      return jwt.sign(
        { id: payload.id, role: payload.role },
        JWT_SECRET,
        { expiresIn: '15m' }
      );
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async setupAdmin(email: string, password?: string) {
    if (!password) throw new Error('Password is required');
    
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return existingUser;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({ 
      email, 
      password: hashedPassword, 
      role: 'admin' 
    });
    
    logger.info(`Admin system initialized for: ${email}`);
    return newUser;
  }
}
