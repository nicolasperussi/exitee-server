import { Request, Response } from 'express';
import prisma from '@database';

// Create event
export const createEvent = async (req: Request, res: Response) => {
	try {
		const { eventDate, groupId } = req.body;

		const event = await prisma.event.create({
			data: {
				eventDate: new Date(eventDate),
				group: {
					connect: { id: groupId },
				},
			},
			select: {
				eventDate: true,
				group: true,
			},
		});

		res.status(201).json(event);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Get all events
export const getAllEvents = async (req: Request, res: Response) => {
	try {
		const events = await prisma.event.findMany({
			select: {
				id: true,
				eventDate: true,
				group: true,
				attendees: true,
			},
		});

		res.status(200).json(events);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Get events by group
export const getEventsByGroup = async (req: Request, res: Response) => {
	try {
		const searchId = req.params.id;

		const events = await prisma.event.findMany({
			where: { groupId: searchId },
			select: {
				id: true,
				eventDate: true,
				attendees: true,
			},
		});

		res.status(200).json(events);
	} catch (error) {
		res.status(500).json(error);
	}
};
