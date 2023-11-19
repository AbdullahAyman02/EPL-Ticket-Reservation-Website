import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

//Add your password to .env file
const db = new Sequelize(process.env.DB_URL, {
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default db;