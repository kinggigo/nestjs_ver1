import { ApiProperty } from "@nestjs/swagger";

export class GetEventParam {
    @ApiProperty({ name: "search", required: false })
    search?: string;
}
