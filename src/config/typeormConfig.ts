import { ConnectionOptions } from 'typeorm';

interface Configuration {
    development: ConnectionOptions,
    production: ConnectionOptions,
    test: ConnectionOptions,
}

const configs: Configuration = {
    development: {
        type: "postgres",
        host: process.env.DB_DEV_HOST,
        username: process.env.DB_DEV_USER,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_DATABASE,
        logging: ["query", "error"],
        migrations: ["./src/database/typeorm/migrations/**.ts"],
        entities: ["./src/models/index.ts"],
    },
    production: {
        type: "postgres",
        host: process.env.DB_DEV_HOST,
        username: process.env.DB_DEV_USER,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_DATABASE,
        logging: ["query", "error"],
        migrations: ["./src/database/typeorm/migrations/**.ts"],
        entities: ["./src/models/typeorm"],
    },
    test: {
        type: "postgres",
        host: process.env.DB_DEV_HOST,
        username: process.env.DB_DEV_USER,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_DATABASE,
        logging: ["query", "error"],
        migrations: ["./src/database/typeorm/migrations/**.ts"],
        entities: ["./src/models/typeorm"],
    },
}

export default configs;
