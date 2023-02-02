import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
// import { AuthMemberModule } from "../auth_member/auth.member.module";
// import { UserModule } from "../member/member.module";
@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_SECRET,
        }),
        PassportModule,
        // AuthMemberModule,
    ],
    providers: [JwtStrategy, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
