import { ApiProperty } from "@nestjs/swagger";

export class BoarderInfoInput {
    @ApiProperty()
    public user_id: string;

    @ApiProperty()
    public subject: string;

    @ApiProperty()
    public contents: string;

    @ApiProperty()
    public image_url: string;
}
