import { ApiProperty } from "@nestjs/swagger";

export class findLikeBoards {
    @ApiProperty()
    public user_id: string;
}
