import { ApiProperty } from "@nestjs/swagger";
import { EntityDefault } from "../../common/model/entityDefault";

export class ConsultationInput extends EntityDefault {
    @ApiProperty()
    public user_id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public birth: string;

    @ApiProperty()
    public nationality: string;

    @ApiProperty()
    public current_visa: string;

    @ApiProperty()
    public application_visa: string;

    @ApiProperty()
    public service_agree: string;

    @ApiProperty()
    public personality_agree: string;

    @ApiProperty()
    public marketing_agree: string;

    @ApiProperty()
    public status: string;
}
