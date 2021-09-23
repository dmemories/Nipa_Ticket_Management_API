"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('ticket', new mongoose_1.Schema({
    "information": { type: String, required: true },
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "contact_information": { type: String, required: true },
    "created_timestamp": { type: Date, default: Date.now },
    "lastupdate_timestamp": { type: Date, default: Date.now },
    "status": { type: String, default: 'pending' }
}));
