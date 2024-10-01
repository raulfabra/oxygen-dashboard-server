import { Request, Response, Router } from "express";
import { Customer } from "../interfaces/Customer";

export const customersController = Router();

customersController.get("/", async (req: Request, res: Response) => {
  // Get all customers
});

customersController.post("/", async (req: Request<{}, {}, Customer>, res: Response) => {
  // Save a customers
});
