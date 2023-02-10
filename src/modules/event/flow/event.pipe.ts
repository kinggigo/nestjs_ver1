import Joi = require("joi");
import { JoiValidationPipe } from "../../common";

export class EventPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({});
    }
}
