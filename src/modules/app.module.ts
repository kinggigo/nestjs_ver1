import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommonModule } from "./common";
import { PassengerModule } from "./passenger/passenger.module";

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.TYPEORM_HOST,
            port: 3306,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            synchronize: true,
            entities: [__dirname + "/**/**/*.entity.ts"],
            timezone: "Asia/Seoul",
        }),
        PassengerModule,
    ],
})
export class ApplicationModule {}
