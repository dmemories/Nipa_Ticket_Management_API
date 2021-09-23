import express, { Router } from "express";

export default class Controller {

    public router: Router;
    public routePath: string;

    constructor(routePath: string) {
        this.router = express.Router();
        this.routePath = routePath;
    }

}