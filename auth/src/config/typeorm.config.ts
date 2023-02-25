import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('develıpment connection db')
        return {
          type: this.configService.get<any>('DB_TYPE'),
          synchronize: JSON.parse(
            this.configService.get<string>('SYNCHRONIZE'),
          ),
          database: this.configService.get<string>('POSTGRES_DB'),
          host: this.configService.get<string>('POSTGRES_HOST'),
          port: this.configService.get<number>('POSTGRES_PORT'),
          username: this.configService.get<string>('POSTGRES_USER'),
          password: this.configService.get<string>('POSTGRES_PASSWORD'),
          autoLoadEntities: true,
        }
      } else if (process.env.NODE_ENV === 'test') {
        return {
          type: this.configService.get<any>('DB_TYPE'),
          synchronize: JSON.parse(
            this.configService.get<string>('SYNCHRONIZE'),
          ),
          database: this.configService.get<string>('POSTGRES_DB'),
          host: this.configService.get<string>('POSTGRES_HOST'),
          port: this.configService.get<number>('POSTGRES_PORT'),
          username: this.configService.get<string>('POSTGRES_USER'),
          password: this.configService.get<string>('POSTGRES_PASSWORD'),

          autoLoadEntities: true,
        }
      } else if (process.env.NODE_ENV === 'production') {
        return {
          type: 'postgres',
          synchronize: JSON.parse(
            this.configService.get<string>('SYNCHRONIZE'),
          ),
          database: 'postgres',
          autoLoadEntities: true,
          migrationsRun: JSON.parse(
            this.configService.get<string>('MIGRATIONS_RUN'),
          ),
          // So this property is going to make sure that all of our different migrations get ran when we are starting up our database
          // ssl: {
          //   rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
          // },
        }
      } else {
        throw new Error('unknown environment')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
