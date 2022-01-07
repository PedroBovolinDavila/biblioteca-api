import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes';

export class App {
	public app: express.Application;
	private port = process.env.PORT || 3333;

	constructor() {
		this.app = express();

		this.middlewares();
		this.database();
		this.routes();
		this.listen();
	}

	public getApp(): express.Application {
		return this.app;
	}

	private listen(): void {
		this.app.listen(this.port, () => console.log(`Server running on port: ${this.port}`));
	}

	private middlewares(): void {
		this.app.use(cors());
		this.app.use(express.json());
	}

	private database(): void {
		mongoose.connect(process.env.DATABASE_URL)
			.then(() => console.log('MONGODB Connected'))
			.catch(err => console.log(err));
	}

	private routes(): void {
		this.app.use('/users', userRoutes);
	}
}
