import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

class UserController {

	public async findAll(req: Request, res: Response): Promise<Response> {
		try {

			const users = await User.find();

			return res.status(200).json(users);

		} catch (err) {
			return res.status(500).send();
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params;

		try {

			const user = await User.findById(userId);

			return res.status(200).json(user);

		} catch (err) {
			return res.status(400).send();
		}
	}

	public async new(req: Request, res: Response): Promise<Response> {
		const { name, lastName, email, password } = req.body;

		const verifyUser = await User.findOne({ name });

		if (verifyUser) {
			return res.status(401).send();
		}

		try {

			const user = await User.create({
				name,
				lastName,
				email,
				password: bcrypt.hashSync(password, 10)
			});

			return res.status(200).json(user);

		} catch (err) {
			return res.status(400).json(err);
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { userId, password } = req.body;

		const selectedUser = await User.findById(userId);

		if (!selectedUser) {
			return res.status(401).send();
		}

		const passwordMatch = bcrypt.compareSync(password, selectedUser.password);

		if (!passwordMatch) {
			return res.status(401).send();
		}

		try {

			const deletedUser = await User.findByIdAndDelete(userId);

			return res.status(200).json(deletedUser);

		} catch (err) {
			return res.status(400).json(err);
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { name, lastName, email, userId, userPassword } = req.body;

		const selectedUser = await User.findById(userId);

		if (!selectedUser) {
			return res.status(401).send();
		}

		const passwordMatch = bcrypt.compareSync(userPassword, selectedUser.password);

		if (!passwordMatch) {
			return res.status(401).send();
		}

		try {

			const updatedUser = await User.findByIdAndUpdate(userId, {
				name,
				lastName,
				email
			});

			return res.status(200).json(updatedUser);

		} catch (err) {
			return res.status(400).json(err);
		}
	}

	public async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const selectedUser = await User.findOne({ email });

		if(!selectedUser) {
			return res.status(401).send();
		}

		const passwordMatch = bcrypt.compareSync(password, selectedUser.password);

		if(!passwordMatch) {
			return res.status(401).send();
		}

		return res.status(200).json(selectedUser);
	}

}

export default new UserController;