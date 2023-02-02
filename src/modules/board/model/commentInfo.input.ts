import { ApiProperty } from "@nestjs/swagger";
import { EntityDefault } from "../../common/model/entityDefault";

export class CommentInfoInput extends EntityDefault {
    @ApiProperty()
    public contents: string;

    @ApiProperty()
    public user_id: string;

    @ApiProperty()
    public feed_id: number;

    @ApiProperty()
    public parent_id: number;
}
