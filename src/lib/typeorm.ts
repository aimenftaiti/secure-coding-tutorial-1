import { DataSource } from 'typeorm'
import { User } from '../entities/user'
import * as env_variables from './dotenv'
import { UserSubscriber } from '../subscribers/user.subscriber';

let datasource: DataSource;

export const AppDataSource = (): DataSource => {
    datasource = new DataSource({
        type: "postgres",
        host: env_variables.DB_HOST,
        port: env_variables.DB_PORT,
        username: env_variables.DB_USERNAME,
        password: env_variables.DB_PASSWORD,
        database: env_variables.DB_DATABASE,
        entities: [User],
        synchronize: true,
        logging: false,
        subscribers: [UserSubscriber]
    });
    return datasource
}

export const getInitializedAppDataSource = async (): Promise<DataSource> => {
    return datasource.isInitialized ? datasource : await datasource.initialize()
}