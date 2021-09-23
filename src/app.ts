import express, { Application } from 'express';
import { connect as MongooseCon } from 'mongoose';
import dotenv from 'dotenv';
import Controller from './controllers/controller';
import ticketController from './controllers/ticket.contoller';

class App {
    public app: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;
        this.app.listen(port, () => { console.log(`Server is running on port ${this.port}`); })
        
        this.initialMiddleware();
        this.initialController(controllers);
    }

    private initialMiddleware() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private initialController(controllers: Controller[]) {
        for (let controller of controllers) {
            this.app.use(controller.routePath, controller.router);
        }
    }
}

// Setup Dependencies 
dotenv.config();
MongooseCon(process.env.MONGOOSE_CONNECT as string, (err) => console.log(err ? err : 'Mongoose connected !'));

// Start Server
const server = new App(
    [
        new ticketController('/ticket')
    ],
    (parseInt(process.env.PORT as string, 10) || 3000)
);