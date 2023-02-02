import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityDefault } from "../../common/model/entityDefault";

@Entity({ name: "BD_COMMENTINFO" })
export class CommentInfo extends EntityDefault {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "contents" })
    public contents: string;

    @Column({ name: "user_id" })
    public user_id: string;

    @Column({ name: "feed_id" })
    public feed_id: number;

    @Column({ name: "parent_id", nullable: true })
    public parent_id: number;
}
