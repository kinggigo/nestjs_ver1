import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    UploadedFile,
    // UseGuards,
    // UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { DefaultResult } from "../../../common/resultCode";
import { LoggerService } from "../../common";
import { EventInfoInput } from "../model/eventInfo.input";
import { GetEventParam } from "../model/event.param";
// import { findLikeEvents } from "../model/findLikeEvents.input";
import { EventService } from "../service/event.service";

@Controller("event")
@ApiTags("event")
@ApiBearerAuth()
export class EventController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly eventService: EventService
    ) {}

    @Get()
    @ApiResponse({ status: HttpStatus.CREATED, type: DefaultResult })
    public async getEvent(
        @Query() query: GetEventParam
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        try {
            console.log("@@");
            if (query.search != null) {
                result.data = await this.eventService.findWordContain(
                    query.search
                );
            } else {
                result.data = await this.eventService.find();
            }

            result.code = "200";
            result.message = "조회성공";
            return result;
        } catch (e) {
            this.logger.error(e);
            result.code = "5000";
            result.message = e;
            return result;
        }
    }

    @Post()
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.CREATED, type: DefaultResult })
    public async creatEvent(
        @Body() input: EventInfoInput
    ): Promise<DefaultResult> {
        const inputResult = this.eventService.create(input);
        const result = new DefaultResult();
        result.data = inputResult;
        result.code = "200";
        result.message = "생성 성공";
        return result;
    }

    @Get(":id")
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async getOneEvent(@Param("id") id: string): Promise<DefaultResult> {
        const result = new DefaultResult();

        if (id == undefined) {
            result.data = await this.eventService.find();
        } else {
            result.data = await this.eventService.findById(+id);
        }
        result.code = "200";
        result.message = "조회가 완료되었습니다.";

        return result;
    }

    @Post("/file")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @ApiOperation({ deprecated: true })
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads/contents",
                filename: (req, file, callback) => {
                    const uniqueSuffix =
                        Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
            // limits: {
            //     fileSize: 1000,
            // },
        })
    )
    handleUpload(@UploadedFile("file") file: Express.Multer.File) {
        console.log("file", file);
        this.logger.info(`Add File name : ${file.filename}`);
        const result = new DefaultResult();
        result.code = "200";
        result.data = { filename: file.filename };
        result.message = "success";
        return result;
    }
}
