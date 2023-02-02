import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import { Member } from "../../member/model";
import {
    BoarderInfoInput,
    BoardInfo,
    CommentInfo,
    CommentInfoInput,
    Heart,
} from "../model";
// import { findLikeBoards } from "../model/findLikeBoards.input";

@Injectable()
export class BoardService {
    public constructor(
        @InjectRepository(BoardInfo)
        private readonly boardRepo: Repository<BoardInfo>,

        @InjectRepository(Heart)
        private readonly heartRepo: Repository<Heart>,

        // @InjectRepository(Member)
        // private readonly memberRepo: Repository<Member>,

        @InjectRepository(CommentInfo)
        private readonly commentRepo: Repository<CommentInfo>
    ) {}

    public async find(): Promise<BoardInfo[]> {
        return this.boardRepo.find({ order: { createdAt: "desc" } });
    }

    public async findById(id: number): Promise<BoardInfo | null> {
        return this.boardRepo.findOne({ where: { id: id } });
    }

    public async findWordContain(search: string): Promise<BoardInfo[] | null> {
        return this.boardRepo
            .createQueryBuilder()
            .where("contents LIKE :word", { word: `%${search}%` })
            .orderBy("createdAt", "DESC")
            .getMany();
    }

    public async create(input: BoarderInfoInput): Promise<BoardInfo> {
        const board = new BoardInfo();
        board.user_id = input.user_id;
        board.subject = input.subject;
        board.contents = input.contents;
        board.image_url = input.image_url;

        return this.boardRepo.save(board);
    }

    public async getHearts(board: number) {
        // const user = await this.memberRepo.findOne({
        //     where: { user_id: userid },
        // });
        return await this.heartRepo.find({
            where: { feed_id: board },
        });
    }

    public async getHeartById(board: number, user_id: string) {
        // const user = await this.memberRepo.findOne({
        //     where: { user_id: user_id },
        // });
        return await this.heartRepo.find({
            where: { feed_id: board, user_id: user_id },
        });
    }

    public async setHeart(board: number, userid: string) {
        // const user = await this.memberRepo.findOne({
        //     where: { user_id: userid },
        // });
        // if (!user) {
        //     return;
        // }
        const insert = new Heart();
        insert.feed_id = board;
        insert.user_id = userid;
        return await this.heartRepo.save(insert);
    }

    public async removeHeart(board: number, userid: string) {
        // const user = await this.memberRepo.findOne({
        //     where: { user_id: userid },
        // });
        // if (!user) {
        //     return;
        // }
        const del = new Heart();
        del.feed_id = board;
        del.user_id = userid;
        return await this.heartRepo.delete(del);
    }

    public async createComment(input: CommentInfoInput) {
        const insertData = new CommentInfo();
        insertData.feed_id = input.feed_id;
        insertData.contents = input.contents;
        insertData.parent_id = input.parent_id;
        insertData.user_id = input.user_id;

        return await this.commentRepo.save(insertData);
    }

    public async getComment(feed_id: number) {
        return await this.commentRepo.find({ where: { feed_id: feed_id } });
    }

    public async findLikeBoards(user_id: string) {
        return this.heartRepo
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.feed_id", "id")
            .where("m.user_id = :id", { id: user_id })
            .orderBy("m.createdAt", "DESC")
            .getMany();
    }
}
