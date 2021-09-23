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
        this.router.get('/',  this.getTicket);
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

    private async getTicket(req: Request, res: Response): Promise<void> {
        try {
            let result: object;
            if (req.body.status) {
                let status: object = validation.getTicketStatus(req.body.status);
                result = await ticketModel.find(status).sort({ lastupdate_timestamp: 'desc' });
            }
            else {
                result = await ticketModel.find().sort({
                    status: 'desc',
                    lastupdate_timestamp: 'desc'
                });
            }
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }
}