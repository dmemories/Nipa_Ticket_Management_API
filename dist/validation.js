"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTicket = void 0;
const joi_1 = __importDefault(require("joi"));
const newTicket = (reqBody) => {
    const joiObj = joi_1.default.object({
        information: joi_1.default.string().min(2).max(40).required(),
        title: joi_1.default.string().min(2).max(40).required(),
        description: joi_1.default.string().min(4).max(100).required(),
        contact_information: joi_1.default.string().min(4).max(100).required(),
    });
    const { error } = joiObj.validate(reqBody);
    if (error)
        throw error.details[0].message;
    return reqBody;
};
exports.newTicket = newTicket;
