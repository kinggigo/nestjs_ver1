import {
    Body,
    Controller,
    Get,
    HttpStatus,
    // Inject,
    Param,
    Post,
    UploadedFile,
    // UseGuards,
    UseInterceptors,
    Request,
    // Inject,
    // PreconditionFailedException,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { DefaultResult } from "../../../common/resultCode";
import {
    // Config,
    // RestrictedGuard,
    // LoggerService,
    // GuestGuard,
    LoggerService,
    // RestrictedGuard,
} from "../../common";
// import { Service } from "../../tokens";
import { LoginInput, MemberData } from "../model";
import { MemberInput } from "../model/member.input";
import { MemberService } from "../service";
import * as jwt from "jsonwebtoken";
import { SignupInput } from "../model/signup.input";
// import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
// import { Service } from "../../tokens";
@Controller("member")
@ApiTags("member")
@ApiBearerAuth()
export class MemberController {
    public constructor(
        // @Inject(Service.CONFIG)
        // private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly memberService: MemberService
    ) {}

    @Get("/:id")
    @ApiOperation({ description: "유저 유무 확인" })
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async findOne(@Param("id") id: string): Promise<DefaultResult> {
        const user = await this.memberService.findById(id);
        const result = new DefaultResult();
        if (user) {
            result.code = "200";
        } else {
            result.code = "404";
        }
        result.message = "조회가 완료되었습니다.";
        this.logger.info(JSON.stringify(result));

        return result;
    }

    @Post()
    // @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: HttpStatus.CREATED, type: MemberData })
    public async create(
        @Body() input: MemberInput,
        @Request() req: any
    ): Promise<DefaultResult> {
        const result = new DefaultResult();
        console.log(req.user);
        result.code = "201";
        result.message = "board 생성완료";
        // this.logger.info(`Created new board with Id ${board.id}`);

        return result;
    }

    @Post("/signup")
    // @UseGuards(GuestGuard)
    @ApiOperation({ description: "유저 생성" })
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async signup(@Body() input: SignupInput): Promise<DefaultResult> {
        try {
            console.log("signup", JSON.stringify(input));
            const result = new DefaultResult();
            const memberInput = new MemberInput();

            memberInput.user_id = input.user_id;
            memberInput.pwd = input.pwd;
            memberInput.email = input.email;
            memberInput.name = input.name;
            memberInput.nickname = input.nickname;
            memberInput.phone = input.phone;
            memberInput.sex = input.sex;
            const getUser = await this.memberService.findByUserIdAndSSO(
                input.user_id
            );
            if (getUser) {
                result.code = "400";
                result.message = "이미 유저가 존재합니다.";
                return result;
            }
            const create = await this.memberService.create(memberInput);

            result.code = "200";
            result.data = create;
            result.data["token"] = jwt.sign(
                { role: "restricted", id: input.user_id },
                `${process.env.JWT_SECRET}`,
                {
                    algorithm: "HS256",
                    issuer: "DEFAULT_ISSUER",
                }
            );
            result.message = "생성이 완료되었습니다.";
            console.log(JSON.stringify(result));
            return result;
        } catch (e) {
            const result = new DefaultResult();
            console.log(e);
            result.code = "500";
            result.message = e.string();
            return result;
        }
    }

    @Post("/signup/imageUpload")
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
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads/userImage",
                filename: (req, file, callback) => {
                    const uniqueSuffix =
                        Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        })
    )
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async signupImageUpload(
        @UploadedFile("file") file: Express.Multer.File
    ): Promise<DefaultResult> {
        console.log("file", file);
        this.logger.info(`Add Image File name : ${file.filename}`);
        const result = new DefaultResult();
        result.code = "200";
        result.data = { filename: file.filename };
        result.message = "success";
        return result;
    }

    @Post("/login")
    // @UseGuards(GuestGuard)
    @ApiResponse({ status: HttpStatus.OK, type: DefaultResult })
    public async login(@Body() input: LoginInput): Promise<DefaultResult> {
        const result = new DefaultResult();
        const findeId = await this.memberService.validatePwd(input);
        if (findeId) {
            result.code = "200";
            result.data = {
                token: jwt.sign(
                    {
                        role: "restricted",
                        id: input.user_id,
                        // grade: "test",
                    },
                    `${process.env.JWT_SECRET}`,
                    {
                        algorithm: "HS256",
                        issuer: "DEFAULT_ISSUER",
                    }
                ),
            };
            result.message = "로그인이 완료되었습니다";
        } else {
            result.code = "400";
            result.message = "로그인실패.";
        }

        return result;
    }
}
