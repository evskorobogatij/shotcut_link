import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('TYPEORM_HOST'),
      //   port: parseInt(this.getValue('TYPEORM_PORT')),
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),

      entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      // migrations: ['src/migration/*.ts'],
      synchronize: false,
      uuidExtension: 'uuid-ossp',
      ssl: false,
      installExtensions: true,

      migrationsRun: false,

      cli: {
        migrationsDir: 'src/migration',
      },

      //ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'TYPEORM_HOST',
  'TYPEORM_PORT',
  'TYPEORM_USERNAME',
  'TYPEORM_PASSWORD',
  'TYPEORM_DATABASE',
]);

export { configService };
