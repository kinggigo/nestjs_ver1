import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { LoginInput } from "../model";
import { Member } from "../model/member.entity";
import { MemberInput } from "../model/member.input";

@Injectable()
export class MemberService {
    public constructor(
        @InjectRepository(Member)
        private readonly tblMemberRepository: Repository<Member>
    ) {}

    public async find(): Promise<Member[]> {
        return this.tblMemberRepository.find();
    }

    public async findById(id: string): Promise<Member | null> {
        return this.tblMemberRepository.findOne({ where: { user_id: id } });
    }

    public async findByUserIdAndSSO(id: string): Promise<Member | null> {
        return this.tblMemberRepository.findOne({
            where: { user_id: id },
        });
    }

    public async create(input: MemberInput): Promise<Member> {
        // const member = new tblMember();
        // tblMember.

        return this.tblMemberRepository.save(input);
    }

    public async validatePwd(loginData: LoginInput): Promise<Boolean> {
        const member = await this.tblMemberRepository.findOne({
            where: { user_id: loginData.user_id },
        });

        if (member) {
            //TODO : 비밀번호 변경
            if (loginData.pwd === member.pwd) {
                return true;
            }
        }

        return false;
    }
}
