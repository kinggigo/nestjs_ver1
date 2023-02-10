import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "../common";
import { Member } from "../member/model";
import { EventController } from "./controller/event.controller";
import { EventInfo } from "./model";

import { EventService } from "./service/event.service";

@Module({
    controllers: [EventController],
    providers: [EventService],
    imports: [
        EventModule,
        CommonModule,
        TypeOrmModule.forFeature([EventInfo, Member]),
    ],
})
export class EventModule {}
