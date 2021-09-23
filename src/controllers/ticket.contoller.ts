import Controller from "./controller";
import { Request, Response } from "express";

export default class ticketController extends Controller {

    constructor(routePath: string) {
        super(routePath);
        this.initialRoutes();
    }

    public initialRoutes() {
        this.router.post('/',  this.createTicket);
        this.router.get('/',  this.getAllTicket);
    }

    private createTicket(req: Request, res: Response): void {
        res.send(req.body);
    }

    private getAllTicket(req: Request, res: Response): void {
        res.send('Hello World !');
    }
}