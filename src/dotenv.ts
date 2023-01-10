import { config } from 'dotenv';

config();

function getOrThrow(key: string) {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}

export const NODE_ENV = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';
export const DB_PASSWORD = getOrThrow('DB_PASSWORD');
export const DB_HOST = getOrThrow('DB_HOST');
export const DB_PORT = parseInt(getOrThrow('DB_PORT'));
export const DB_USERNAME = getOrThrow('DB_USERNAME');
export const DB_DATABASE = getOrThrow('DB_DATABASE');
