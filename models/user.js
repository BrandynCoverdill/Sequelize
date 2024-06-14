import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const User = sequelize.define(
	'user',
	{
		firstName: DataTypes.TEXT,
		lastName: DataTypes.TEXT,
		favoriteColor: {
			type: DataTypes.TEXT,
			defaultValue: 'green',
		},
	},
	{
		timestamps: false,
	}
);
