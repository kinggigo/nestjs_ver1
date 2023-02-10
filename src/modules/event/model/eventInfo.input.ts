import { ApiProperty } from "@nestjs/swagger";

export class EventInfoInput {

    @ApiProperty()
    public subject: string;

    @ApiProperty()
    public url: string;

    @ApiProperty()
    public reg_date: string;
}
