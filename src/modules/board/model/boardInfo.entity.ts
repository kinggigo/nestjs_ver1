import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityDefault } from "../../common/model/entityDefault";

@Entity({ name: "BD_BOARDINFO" })
export class BoardInfo extends EntityDefault {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "user_id" })
    public user_id: string;

    @Column({ name: "subject", default: "" })
    public subject: string;

    @Column({ name: "contents" })
    public contents: string;

    @Column({ name: "contents_write_min", default: 0 })
    public contents_write_min: number;

    @Column({ name: "contents_write_max", default: 0 })
    public contents_write_max: number;

    @Column({ name: "image_url", nullable: true })
    public image_url: string;

    @Column({ name: "user_image_url", nullable: true })
    public user_image_url: string;

    @Column({ name: "upload_file_url1", nullable: true })
    public upload_file_url1: string;

    @Column({ name: "upload_file_url2", nullable: true })
    public upload_file_url2: string;

    @Column({ name: "upload_file_url3", nullable: true })
    public upload_file_url3: string;

    @Column({ name: "upload_count", default: 0 })
    public upload_count: number;

    @Column({ name: "admin", nullable: true })
    public admin: string;

    @Column({ name: "list_level", default: 0 })
    public list_level: number;

    @Column({ name: "read_level", default: 0 })
    public read_level: number;

    @Column({ name: "write_level", default: 0 })
    public write_level: number;

    @Column({ name: "reply_level", default: 0 })
    public reply_level: number;

    @Column({ name: "comment_level", default: 0 })
    public comment_level: number;

    @Column({ name: "down_level", default: 0 })
    public down_level: number;

    @Column({ name: "count_delete", default: 0 })
    public count_delete: number;

    @Column({ name: "count_modify", default: 0 })
    public count_modify: number;

    @Column({ name: "read_point", default: 0 })
    public read_point: number;

    @Column({ name: "write_point", default: 0 })
    public write_point: number;

    @Column({ name: "comment_point", default: 0 })
    public comment_point: number;

    @Column({ name: "download_point", default: 0 })
    public download_point: number;

    @Column({ name: "category_list", nullable: true })
    public category_list: string;

    @Column({ name: "use_category", nullable: true })
    public use_category: string;
}
