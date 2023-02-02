import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class EntityDefault {
    @CreateDateColumn()
    public createdAt: string;

    // @Column({ name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
    @UpdateDateColumn()
    public updatedAt: string;
}
