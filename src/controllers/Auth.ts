import { Request, Response } from 'express';
import prisma from '@database';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, gender, birthDate, password } = req.body;

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = {
			name,
			email,
			gender,
			birthDate: new Date(birthDate),
			password: hashPassword,
		};

		const user = await prisma.user.create({
			data: { ...newUser },
		});

		res.status(201).json(user);
	} catch (err) {
		res.json(err);
	}
};
export const loginUser = async (req: Request, res: Response) => {
	try {
		const login = { email: req.body.email, password: req.body.password };

		const user = await prisma.user.findUnique({
			where: { email: login.email },
		});

		if (!user) return res.status(404).json({ error: 'User not found' });

		if (bcrypt.compareSync(login.password, user.password)) {
			// TODO: Return Json Web Token somehow
			res.status(200).json('User logged in successfully');
		} else {
			res.status(500).json({ error: 'Incorrect password' });
		}
	} catch (err) {}
};
