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
        this.router.put('/',  this.updateTicket);
        this.router.get('/',  this.getAllTicket);
    }

    private async createTicket(req: Request, res: Response): Promise<void> {
        try {
            let validReq: object = validation.newTicket(req.body);
            let newTicket: object = await (new ticketModel(validReq)).save();
            res.send(newTicket);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    private async updateTicket(req: Request, res: Response): Promise<void> {
        try {
            let validReq: any = validation.updateTicket(req.body);
            await ticketModel.findOneAndUpdate({ _id: validReq.id }, validReq);
            res.json(validReq);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }
     /* await Item.findOneAndUpdate({ _id: req.params.id }, reqBody);
        res.status(200).json({"result" : `Update Successfully \n${JSON.stringify(reqBody)}\n`}) */

    private getAllTicket(req: Request, res: Response): void {
        res.send('Hello World !');
    }
}