import { Request, Response } from "express"; 

export class MainController {
  public static root(req: Request, res: Response): any {
    res.send("Up and Running!");
  }
}
