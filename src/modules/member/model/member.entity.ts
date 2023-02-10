import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    NORMAL = "normal",
    STOP = "stop",
    RESIGN = "resign",
}

@Entity({ name: "MB_MEMBER" })
export class Member {
    public static readonly LENGTH_100 = 100;
    public static readonly LENGTH_50 = 50;
    public static readonly LENGTH_20 = 20;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "user_id", length: Member.LENGTH_100 })
    public user_id: string;

    @Column({ name: "pwd", length: Member.LENGTH_100 })
    public pwd: string;

    @Column({ name: "name", length: Member.LENGTH_100, nullable: true })
    public name: string;

    @Column({ name: "imageUrl", nullable: true })
    public imageUrl: string;

    @Column({ name: "nickname", length: Member.LENGTH_100, nullable: true })
    public nickname: string;

    @Column({ name: "email", length: Member.LENGTH_100 })
    public email: string;

    @Column({ name: "phone", length: Member.LENGTH_100, nullable: true })
    public phone: string;

    @Column({
        name: "status",
        type: "enum",
        enum: UserRole,
        default: UserRole.NORMAL,
    })
    public status: UserRole;

    @Column({ name: "sex", length: Member.LENGTH_100, nullable: true })
    public sex: string;

    @Column({
        name: "today_login",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public today_login: String;

    @Column({
        name: "last_login",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public last_login: String;

    @Column({
        name: "leaved",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public leaved: String;

    @Column({
        name: "created",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public created: String;

    @Column({
        name: "updated",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public updated: String;
}
