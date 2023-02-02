import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";
import { CommonModule } from "../common";
import { MemberController } from "./controller/member.controller";
import { Member } from "./model/member.entity";
import { MemberService } from "./service/member.service";

@Module({
    imports: [CommonModule, TypeOrmModule.forFeature([Member]), AuthModule],
    controllers: [MemberController],
    providers: [MemberService],
})
export class UserModule {}
