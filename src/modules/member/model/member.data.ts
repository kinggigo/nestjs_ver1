import { ApiProperty } from "@nestjs/swagger";

export class MemberData {
    @ApiProperty({ description: "Passenger unique ID", example: "36635263" })
    public readonly id: number;

    @ApiProperty({ description: "USER ID", example: "testID" })
    public readonly user_id: string;

    @ApiProperty({ description: "USER PASSWORD", example: "QWERQWER#R" })
    public readonly password: string;

    @ApiProperty({ description: "USER NAEM", example: "test" })
    public readonly name: string;

    @ApiProperty({ description: "USER nickname", example: "tesla" })
    public readonly nickname: string;

    @ApiProperty({ description: "USER EMAIL", example: "test@naver.com" })
    public readonly email: string;

    @ApiProperty({ description: "USER PHONE", example: "010-111-1111" })
    public readonly phone: string;

    @ApiProperty({ description: "USER ROLE", example: "nomal" })
    public readonly status: String;

    @ApiProperty({ description: "USER sex", example: "m" })
    public readonly sex: string;

    @ApiProperty({ description: "USER today login", example: "2022-10-08" })
    public readonly today_login: String;

    @ApiProperty({ description: "USER last logined", example: "2022-10-08" })
    public readonly last_login: String;

    @ApiProperty({ description: "USER leaveDate", example: "" })
    public readonly leaved: String;

    @ApiProperty({ description: "USER Created Date", example: "2022-10-08" })
    public readonly created: String;

    @ApiProperty({ description: "USER Updated", example: "2022-10-08" })
    public readonly updated: String;
}
