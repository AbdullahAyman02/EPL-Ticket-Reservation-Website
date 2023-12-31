import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_URL, {
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        useUTC: false,
        dateStrings: true,  
        typeCast: function (field, next) {  
            if (field.type === 'DATETIME') {  
                return field.string()  
            }  
            return next()  
        },
    },
    timezone: '+02:00',
});

export default db;