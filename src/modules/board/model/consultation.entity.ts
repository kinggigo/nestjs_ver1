import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityDefault } from "../../common/model/entityDefault";

@Entity({ name: "BD_CONSULTATION" })
export class Consultation extends EntityDefault {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "user_id" })
    public user_id: string;

    @Column({ name: "name" })
    public name: string;

    @Column({ name: "phone" })
    public phone: string;

    @Column({ name: "birth" })
    public birth: string;

    @Column({ name: "nationality" })
    public nationality: string;

    @Column({ name: "current_visa" })
    public current_visa: string;

    @Column({ name: "application_visa" })
    public application_visa: string;

    @Column({ name: "service_agree" })
    public service_agree: string;

    @Column({ name: "personality_agree" })
    public personality_agree: string;

    @Column({ name: "marketing_agree" })
    public marketing_agree: string;

    @Column({ name: "status", default: "new" })
    public status: string;
}
