import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "../common";
import { Member } from "../member/model";
import { BoardController } from "./controller/board.controller";
import { BoardInfo, CommentInfo, Heart } from "./model";

import { BoardService } from "./service/board.service";

@Module({
    controllers: [BoardController],
    providers: [BoardService],
    imports: [
        BoardModule,
        CommonModule,
        TypeOrmModule.forFeature([BoardInfo, Heart, Member, CommentInfo]),
    ],
})
export class BoardModule {}
