"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const validation = __importStar(require("../validation"));
class ticketController extends controller_1.default {
    constructor(routePath) {
        super(routePath);
        this.initialRoutes();
    }
    initialRoutes() {
        this.router.post('/', this.createTicket);
        this.router.put('/', this.updateTicket);
        this.router.get('/', this.getTicket);
    }
    createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validReq = validation.newTicket(req.body);
                let newTicket = yield (new ticket_model_1.default(validReq)).save();
                res.send(newTicket);
            }
            catch (err) {
                res.status(400).json({ error: err });
            }
        });
    }
    updateTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validReq = validation.updateTicket(req.body);
                yield ticket_model_1.default.findOneAndUpdate({ _id: validReq.id }, validReq);
                res.json(validReq);
            }
            catch (err) {
                res.status(400).json({ error: err });
            }
        });
    }
    getTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (req.body.status) {
                    let status = validation.getTicketStatus(req.body.status);
                    result = yield ticket_model_1.default.find(status).sort({ lastupdate_timestamp: 'desc' });
                }
                else {
                    result = yield ticket_model_1.default.find().sort({
                        status: 'desc',
                        lastupdate_timestamp: 'desc'
                    });
                }
                res.json(result);
            }
            catch (err) {
                res.status(400).json({ error: err });
            }
        });
    }
}
exports.default = ticketController;
