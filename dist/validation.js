"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketStatus = exports.updateTicket = exports.newTicket = void 0;
const joi_1 = __importDefault(require("joi"));
const ticketStatusArr = ['pending', 'accepted', 'resolved', 'rejected'];
const newTicket = (reqBody) => {
    const joiObj = joi_1.default.object({
        information: joi_1.default.string().min(1).max(40).required(),
        title: joi_1.default.string().min(1).max(40).required(),
        description: joi_1.default.string().min(1).max(100).required(),
        contact_information: joi_1.default.string().min(1).max(100).required(),
    });
    const { error } = joiObj.validate(reqBody);
    if (error)
        throw error.details[0].message;
    return reqBody;
};
exports.newTicket = newTicket;
const updateTicket = (reqBody) => {
    const joiObj = joi_1.default.object({
        id: joi_1.default.string().min(1).max(40).required(),
        information: joi_1.default.string().min(1).max(40),
        title: joi_1.default.string().min(1).max(40),
        description: joi_1.default.string().min(1).max(100),
        contact_information: joi_1.default.string().min(1).max(100),
        status: joi_1.default.string().min(1).max(10)
    });
    const { error } = joiObj.validate(reqBody);
    if (error)
        throw error.details[0].message;
    if (reqBody.status && !ticketStatusArr.includes(reqBody.status))
        throw `Unknown status (${reqBody.status})`;
    return reqBody;
};
exports.updateTicket = updateTicket;
const getTicketStatus = (reqStatus) => {
    if (!ticketStatusArr.includes(reqStatus))
        throw `Unknown status (${reqStatus})`;
    return { status: reqStatus };
};
exports.getTicketStatus = getTicketStatus;
