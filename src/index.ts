import express from 'express';
import dotenv from 'dotenv';

import authRouter from '@routes/authRouter';
import groupRouter from '@routes/groupRouter';
import eventRouter from '@routes/eventRouter';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/user', authRouter);
app.use('/group', groupRouter);
app.use('/event', eventRouter);

// TODO: Create a validator with zod

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.clear();
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
