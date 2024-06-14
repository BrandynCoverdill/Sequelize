import { Router } from 'express';
import { User } from '../models/user.js';

const users = await User.findAll();

export const userRouter = new Router();

userRouter.get('/', (req, res) => {
	res.json(users.map((user) => user));
});

userRouter.get('/:id', (req, res) => {
	const id = +req.params.id;
	const user = users.filter((user) => user.id === id)[0];
	if (user === undefined) {
		res.json({ msg: 'User not defined' });
	}
	res.send(user);
});
