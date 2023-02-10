import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityDefault } from "../../common/model/entityDefault";

@Entity({ name: "EV_EVENTINFO" })
export class EventInfo extends EntityDefault {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "subject", default: "" })
    public subject: string;

    @Column({ name: "url", default: "" })
    public url: string;

    @Column({ name: "reg_date", default: "" })
    public reg_date: string;

}
