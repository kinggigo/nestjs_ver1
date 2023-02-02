import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityDefault } from "../../common/model/entityDefault";

@Entity({ name: "MB_TERMSAGREEINFO" })
export class TermsAgreeInfo extends EntityDefault {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "member_id" })
    public member_id: number;

    @Column({ name: "terms_mandatory_yn" })
    public terms_mandatory_yn: string;

    @Column({ name: "terms_mandatory_date" })
    public terms_mandatory_date: String;

    @Column({ name: "terms_optional_yn" })
    public terms_optional_yn: String;

    @Column({ name: "terms_optional_date" })
    public auth_end_date: String;
}
