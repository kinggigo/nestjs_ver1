import { ApiProperty } from "@nestjs/swagger";
import { EntityDefault } from "../../common/model/entityDefault";

export class ConsultationUpdate extends EntityDefault {
    @ApiProperty()
    public id: number;

    @ApiProperty({ nullable: true })
    public parent_id: string;

    @ApiProperty({ nullable: true })
    public nationality: string;

    @ApiProperty({ nullable: true })
    public current_visa: string;

    @ApiProperty({ nullable: true })
    public application_visa: string;

    @ApiProperty({ nullable: true })
    public service_agree: string;

    @ApiProperty({ nullable: true })
    public personality_agree: string;

    @ApiProperty({ nullable: true })
    public marketing_agree: string;

    @ApiProperty({ nullable: true })
    public status: string;
}
