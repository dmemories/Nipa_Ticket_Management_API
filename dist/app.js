"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const ticket_contoller_1 = __importDefault(require("./controllers/ticket.contoller"));
class App {
    constructor(controllers, port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.app.listen(port, () => { console.log(`Server is running on port ${this.port}`); });
        this.initialMiddleware();
        this.initialController(controllers);
    }
    initialMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    initialController(controllers) {
        for (let controller of controllers) {
            this.app.use(controller.routePath, controller.router);
        }
    }
}
// Setup Dependencies 
dotenv_1.default.config();
(0, mongoose_1.connect)(process.env.MONGOOSE_CONNECT, (err) => console.log(err ? err : 'Mongoose connected !'));
// Start Server
const server = new App([
    new ticket_contoller_1.default('/ticket')
], (parseInt(process.env.PORT, 10) || 3000));
