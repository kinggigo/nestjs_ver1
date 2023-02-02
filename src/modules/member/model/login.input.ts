import { ApiProperty } from "@nestjs/swagger";

export class LoginInput {
    @ApiProperty({ required: true })
    user_id: string;

    // @ApiProperty({ example: "kakao , google, naver, facebook" })
    // loginSSO: string;
    @ApiProperty({ required: true, example: "pwd" })
    pwd: string;
}
