import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './api/routes/AuthRoutes';
import productRoutes from './api/routes/ProductRoutes';
import shopRoutes from './api/routes/ShopRoutes';
import scentTypeRoutes from './api/routes/ScentTypeRoutes';
import uploadRoutes from './api/routes/UploadRoutes';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db';
import logger from './config/logger';

// Infrastructure Models for Initial Seeding
import { UserModel } from './infrastructure/database/schemas/UserSchema';
import { ProductModel } from './infrastructure/database/schemas/ProductSchema';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5175","https://teempraa.vercel.app"]
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// HTTP Request Logging
const morganFormat = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganFormat, {
  stream: { write: (message) => logger.http(message.trim()) },
}));

// Initialize Database & Seeding
const initializeApp = async () => {
    try {
        await connectDB();

        // 1. Seed Official Admin (read from environment to avoid hardcoding)
        const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
        const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;

        if (adminEmail && adminPassword) {
            const adminExists = await UserModel.findOne({ email: adminEmail });
            
            if (!adminExists) {
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                const admin = new UserModel({
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'admin'
                });
                await admin.save();
                logger.info(`👤 Authorized TEEMPRAA Admin Created from Env: ${adminEmail}`);
            }
        } else {
            logger.warn('⚠️ Admin seeding skipped: INITIAL_ADMIN_EMAIL or INITIAL_ADMIN_PASSWORD not set in .env');
        }

        // 2. Seed Initial Products
        const productsCount = await ProductModel.countDocuments();
        if (productsCount === 0) {
            const samples = [
                {
                    name: 'Royal Emerald',
                    price: 4500,
                    notes: 'Bulgarian Rose, Malaysian Oud',
                    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop'],
                    category: 'Luxury',
                    description: 'A coronation of the senses.',
                    inStock: true
                }
            ];
            await ProductModel.insertMany(samples);
            logger.info('📦 Masterpiece Inventory Initialized');
        }
    } catch (error: any) {
        logger.error(`❌ Initialization Error: ${error.message}`);
    }
};

initializeApp();

// Core Admin Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/categories', scentTypeRoutes);
app.use('/api/upload', uploadRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('TEEMPRAA Admin API is running...');
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`${err.status || 500} - ${err.message}`);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  logger.info(`🚀 Admin System Online: Port ${PORT}`);
});
