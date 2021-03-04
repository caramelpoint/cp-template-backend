interface ServerConfig {
  port: number;
  secret: string;
  expirationTime: number;
}

export interface DatabaseConfig {
  type: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  entities: string[];
  synchronize: boolean;
  dropSchema: boolean;
  logging: boolean;
  migrationsTableName: string;
  migrations: string[];
  cli: { migrationsDir: string };
  migrationsRun: boolean;
}

export default () => {
  const serverConfig: ServerConfig = {
    port: parseInt(process.env.SERVER_PORT) || 3000,
    secret: process.env.SERVER_JWT_SECRET || 'TopseyCret',
    expirationTime: parseInt(process.env.SERVER_JWT_EXPIRATION_TIME) || 3600,
  };

  const databaseConfig: DatabaseConfig = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT) || 5432,
    entities: [`dist/**/*.entity{.ts,.js}`],
    synchronize: process.env.TYPEORM_SYNCHRONIZE ? process.env.TYPEORM_SYNCHRONIZE === 'true' : false,
    dropSchema: process.env.TYPEORM_DROP_SCHEMA ? process.env.TYPEORM_DROP_SCHEMA === 'true' : false,
    logging: process.env.TYPEORM_LOG ? process.env.TYPEORM_LOG === 'true' : false,
    migrationsTableName: 'database_migration',
    migrations: ['dist/migration/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migration',
    },
    migrationsRun: process.env.TYPEORM_RUN_MIGRATION ? process.env.TYPEORM_RUN_MIGRATION === 'true' : true,
  };

  return {
    server: serverConfig,
    database: databaseConfig,
  };
};
