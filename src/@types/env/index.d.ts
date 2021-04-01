declare namespace NodeJS {
    export interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      NODE_ENV: string;
      DB_DEV_USER: string;
      DB_DEV_DATABASE: string;
      DB_DEV_PASSWORD: string;
      DB_DEV_HOST: string;
      REFRESH_TOKEN_SECRET: string;
      HASH_SALT: string;
    }
  }