import { getConfig } from './index'

let config = getConfig({
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "emufc",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "emufc",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql",
        logging: false
    },
    test: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "emufc_test",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "mysql",
        logging: false
    }
});

export default config