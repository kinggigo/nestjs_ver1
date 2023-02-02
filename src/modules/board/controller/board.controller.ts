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
import { CommentInfoInput, HeartInput } from "../model";
import { BoarderInfoInput } from "../model/boardInfo.input";
import { GetBoardParam } from "../model/board.param";
// import { findLikeBoards } from "../model/findLikeBoards.input";
import { BoardService } from "../service/board.service";

@Controller("board")
@ApiTags("board")
@ApiBearerAuth()
export class BoardController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly boardService: BoardService
    ) {}

    @Get()
    @ApiResponse({ status: HttpStatus.CREATED, type: DefaultResult })
    public async getBoard(
        @Query() query: GetBoardParam
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        try {
            console.log("@@");
            if (query.search != null) {
                result.data = await this.boardService.findWordContain(
                    query.search
                );
            } else {
                result.data = await this.boardService.find();
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
    public async creatBoard(
        @Body() input: BoarderInfoInput
    ): Promise<DefaultResult> {
        const inputResult = this.boardService.create(input);
        const result = new DefaultResult();
        result.data = inputResult;
        result.code = "200";
        result.message = "생성 성공";
        return result;
    }

    @Get("/heart")
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    @ApiOperation({ deprecated: true })
    public async getHeart(
        @Query("board") board: number
        // @Query("userid") userid: string
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        result.data = await this.boardService.getHearts(board);
        if (result.data.length === 0) {
            result.code = "404";
        } else {
            result.code = "200";
        }
        return result;
    }

    @Post("/heart")
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    @ApiOperation({ deprecated: true })
    public async checkHeart(@Body() input: HeartInput): Promise<DefaultResult> {
        const result = new DefaultResult();

        const search = await this.boardService.getHeartById(
            input.feed_id,
            input.user_id
        );
        if (search.length == 0) {
            result.data = await this.boardService.setHeart(
                input.feed_id,
                input.user_id
            );
        } else {
            result.data = await this.boardService.removeHeart(
                input.feed_id,
                input.user_id
            );
        }
        this.logger.info(JSON.stringify(result));
        return result;
    }

    @Post("/comment")
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async createComment(
        @Body() CommentInfoInput: CommentInfoInput
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        const search = await this.boardService.createComment(CommentInfoInput);
        result.data = search;
        return result;
    }

    @Get("/comment")
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    @ApiOperation({ deprecated: true })
    public async getComment(
        @Query("feed_id") feed_id: number
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        const search = await this.boardService.getComment(feed_id);
        result.code = "200";
        result.data = search;
        result.message = "조회가 완료되었습니다.";
        return result;
    }

    @Get(":id")
    // @UseGuards(RestrictedGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async getOneBoard(@Param("id") id: string): Promise<DefaultResult> {
        const result = new DefaultResult();

        if (id == undefined) {
            result.data = this.boardService.find();
        } else {
            result.data = this.boardService.findById(+id);
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

    @Get("/board/like")
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async findLikeBoards(
        @Query("user_id") user_id: string
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        console.log(user_id);
        const search = await this.boardService.findLikeBoards(user_id);
        result.data = search;
        return result;
    }
}
