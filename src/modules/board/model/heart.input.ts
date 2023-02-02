import { ApiProperty } from "@nestjs/swagger";
import { EntityDefault } from "../../common/model/entityDefault";

export class HeartInput extends EntityDefault {
    @ApiProperty()
    public user_id: string;

    @ApiProperty()
    public feed_id: number;
}
