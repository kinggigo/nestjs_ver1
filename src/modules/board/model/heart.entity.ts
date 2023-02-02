import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { EntityDefault } from "../../common/model/entityDefault";
import { BoardInfo } from "./boardInfo.entity";

@Entity({ name: "BD_HEART" })
export class Heart extends EntityDefault {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "user_id" })
    public user_id: string;

    // @Column({ name: "feed_id" })
    // public feed_id: number;
    @ManyToOne(() => BoardInfo)
    @JoinColumn({ name: "feed_id" })
    @Column({ name: "feed_id" })
    public feed_id: number;
}
