import { Request, Response } from 'express';
import prisma from '@database';

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
	try {
		const { name, participants, events } = req.body;

		const group = await prisma.group.create({
			data: {
				name,
				participants,
				events,
			},
		});

		return res.status(201).json(group);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

// Get all groups
export const getAllGroups = async (req: Request, res: Response) => {
	try {
		const groups = await prisma.group.findMany();
		return res.status(200).json(groups);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Get group by id
export const getGroupById = async (req: Request, res: Response) => {
	try {
		const searchId = req.params.id;

		const group = await prisma.group.findUnique({ where: { id: searchId } });

		return res.status(200).json(group);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Get group by participant(s)
