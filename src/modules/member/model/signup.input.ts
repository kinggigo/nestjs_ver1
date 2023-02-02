import { ApiProperty } from "@nestjs/swagger";

export class SignupInput {
    @ApiProperty({ required: true, example: "id" })
    user_id: string;

    @ApiProperty({ required: true, example: "pwd" })
    pwd: string;

    @ApiProperty({ required: true, example: "name" })
    name: string;

    @ApiProperty({ example: "nickname" })
    nickname: string;

    @ApiProperty({ example: "andus@anduschain.io" })
    email: string;

    @ApiProperty({ example: "01011112222" })
    phone: string;

    @ApiProperty({ example: "m / f" })
    sex: string;
}
