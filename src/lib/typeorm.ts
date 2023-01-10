import { DataSource } from 'typeorm'
import { User } from '../entities/user'
import * as env_variables from '../dotenv'
import { UserSubscriber } from '../subscribers/user.subscriber';

export const AppDataSource =
    (): DataSource => {
        return new DataSource({
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
    }

export const getInitializedAppDataSource = async (): Promise<DataSource> => {
    const datasource: DataSource = AppDataSource()
    return datasource.initialize()
}