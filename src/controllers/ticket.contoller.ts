import Controller from "./controller";
import { Request, Response } from "express";
import ticketModel from "../models/ticket.model";
import * as validation from '../validation';

export default class ticketController extends Controller {

    constructor(routePath: string) {
        super(routePath);
        this.initialRoutes();
    }

    public initialRoutes() {
        this.router.post('/',  this.createTicket);
        this.router.get('/',  this.getAllTicket);
    }

    private async createTicket(req: Request, res: Response): Promise<void> {
        try {
            let validReq: object = validation.newTicket(req.body);
            let newTicket = await (new ticketModel(validReq)).save();
            res.send(newTicket);
        } catch (err) {
            res.status(400).json({ error: err })
        }
    }

    private getAllTicket(req: Request, res: Response): void {
        res.send('Hello World !');
    }
}