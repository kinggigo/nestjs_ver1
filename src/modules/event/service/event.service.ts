import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventInfoInput, EventInfo } from "../model";
// import { findLikeEvents } from "../model/findLikeEvents.input";

@Injectable()
export class EventService {
    public constructor(
        @InjectRepository(EventInfo)
        private readonly eventRepo: Repository<EventInfo> // @InjectRepository(Member)
    ) // private readonly memberRepo: Repository<Member>,

    {}

    public async find(): Promise<EventInfo[]> {
        return this.eventRepo.find({ order: { createdAt: "desc" } });
    }

    public async findById(id: number): Promise<EventInfo | null> {
        return this.eventRepo.findOne({ where: { id: id } });
    }

    public async findWordContain(search: string): Promise<EventInfo[] | null> {
        return this.eventRepo
            .createQueryBuilder()
            .where("contents LIKE :word", { word: `%${search}%` })
            .orderBy("createdAt", "DESC")
            .getMany();
    }

    public async create(input: EventInfoInput): Promise<EventInfo> {
        const event = new EventInfo();
        event.subject = input.subject;
        event.url = input.url;
        event.reg_date = input.reg_date;

        return this.eventRepo.save(event);
    }

    // public async findLikeEvents(user_id: string) {
    //     return this.heartRepo
    //         .createQueryBuilder("m")
    //         .leftJoinAndSelect("m.feed_id", "id")
    //         .where("m.user_id = :id", { id: user_id })
    //         .orderBy("m.createdAt", "DESC")
    //         .getMany();
    // }
}
