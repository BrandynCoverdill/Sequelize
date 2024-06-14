import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import path from 'node:path';
import { sequelize } from './config/database.js';
import { userRouter } from './routes/users.js';
import { User } from './models/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// Try to connect to the database
try {
	console.log('Connecting to the database..'.yellow);
	sequelize.authenticate();
	console.log('Database connection successful'.green);
} catch (error) {
	console.error('Database connection failed: '.red, error);
}

// Try to synchronize the database
try {
	console.log('Syncing to the database..'.yellow);
	await sequelize.sync();
	console.log('Synchronizing successfull'.green);
} catch (error) {
	console.error('Could not sync to the database: '.red, error);
}

// START database practice

User.bulkCreate([
	{
		firstName: 'Leon',
		lastName: 'Kennedy',
		favoriteColor: 'blue',
	},
	{
		firstName: 'Ashley',
		lastName: 'Graham',
	},
	{
		firstName: 'Ada',
		lastName: 'Wong',
		favoriteColor: 'purple',
	},
	,
	{
		firstName: 'Chris',
		lastName: 'Redfield',
		favoriteColor: 'red',
	},
	,
	{
		firstName: 'Albert',
		lastName: 'Wesker',
		favoriteColor: 'amber',
	},
]);

// END database practice

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/users', userRouter);

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}/`);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/404.html'));
});
