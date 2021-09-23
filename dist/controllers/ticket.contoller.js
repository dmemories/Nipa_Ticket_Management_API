"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
class ticketController extends controller_1.default {
    constructor(routePath) {
        super(routePath);
        this.initialRoutes();
    }
    initialRoutes() {
        this.router.post('/', this.createTicket);
        this.router.get('/', this.getAllTicket);
    }
    createTicket(req, res) {
        res.send(req.body);
    }
    getAllTicket(req, res) {
        res.send('Hello World !');
    }
}
exports.default = ticketController;
