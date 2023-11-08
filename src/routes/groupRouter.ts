import { createGroup, getAllGroups, getGroupById } from '@controllers/Group';
import express from 'express';

const router = express.Router();

router.route('/').post(createGroup).get(getAllGroups);
router.route('/:id').get(getGroupById);

export default router;
