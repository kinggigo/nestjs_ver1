import Joi = require("joi");
import { JoiValidationPipe } from "../../common";

export class BoardPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({});
    }
}
