import { Injectable } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
// import { AuthMemberService } from "../auth_member/auth.member.service";
// import { MemberService } from "./service";

@Injectable()
export class AuthService {
    constructor(
        // private readonly memberService: AuthMemberService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        // const user = await this.memberService.findById(username);
        // if (user) {
        //     return user;
        // }
        // return null;
    }

    async validateRole(
        username: string,
        grade: string,
        check: string
    ): Promise<any> {
        // const user = await this.memberService.findById(username);
        // console.log(user);
        // if (user) {
        //     if (user.grade.includes(check)) {
        //         return true;
        //     }
        //     return false;
        // }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
