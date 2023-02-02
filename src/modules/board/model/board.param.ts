import { ApiProperty } from "@nestjs/swagger";

export class GetBoardParam {
    @ApiProperty({ name: "search", required: false })
    search?: string;
}
