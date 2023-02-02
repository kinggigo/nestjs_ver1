import { ApiProperty } from "@nestjs/swagger";

export class MemberInput {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    pwd: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    sex: string;
}
