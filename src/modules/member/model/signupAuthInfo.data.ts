import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class SignupAuthInfoData {
    @ApiProperty({
        description: "SignupAuthInfo unique ID",
        example: "36635263",
    })
    public readonly id: number;

    @Column({ name: "member_id" })
    public member_id: number;

    @Column({ name: "terms_mandatory_yn" })
    public terms_mandatory_yn: string;

    @Column({ name: "auth_yn" })
    public auth_yn: String;

    @Column({ name: "auth_req_date" })
    public auth_req_date: String;

    @Column({ name: "auth_end_date" })
    public auth_end_date: String;
}
