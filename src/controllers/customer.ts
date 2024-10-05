import { Request, Response, Router } from "express";
import { Customer } from "../interfaces/Customer";
import customersData from "../data/dataCustomer.json";

const customersController = Router();

customersController.get("/", async (req: Request, res: Response) => {
  try {
    if (!customersData || customersData.length === 0) {
      res.status(404).json({ message: "No customers found" });
    }
    // Si hay datos, los retornamos con un código 200 (OK)
    res.status(200).json(customersData);
  } catch (error: any) {
    // En caso de error, retornamos una respuesta 500 (Internal Server Error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

customersController.post("/", async (req: Request<{}, {}, Customer>, res: Response) => {
  // Save a customers
});

export default customersController;
