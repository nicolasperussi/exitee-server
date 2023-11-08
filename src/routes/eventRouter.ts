import {
	createEvent,
	getAllEvents,
	getEventsByGroup,
} from '@controllers/Event';
import express from 'express';

const router = express.Router();

router.route('/').post(createEvent).get(getAllEvents);
router.route('/:id').get(getEventsByGroup);

export default router;
