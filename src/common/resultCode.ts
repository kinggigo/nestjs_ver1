import { ApiProperty } from "@nestjs/swagger";

export class DefaultResult {
    @ApiProperty({ description: "결과 코드", example: "200" })
    public code: string = "0";

    @ApiProperty({ description: "결과 데이터", example: "{id :'111'..}" })
    public data: any;

    @ApiProperty({
        description: "결과 message",
        example: "조회에 성공하였습니다.",
    })
    public message: string;
}
