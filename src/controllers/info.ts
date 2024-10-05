import { Request, Response, Router } from "express";

const infoController = Router();

infoController.get("/", (req: Request, res: Response) => {
  try {
    // Información básica del hotel
    const hotelInfo = {
      name: "Hotel Paradise",
      endpoints: [
        { name: "Booking", path: "/booking", methods: ["GET", "POST", "PUT", "DELETE"] },
        { name: "Room", path: "/room", methods: ["GET", "POST", "PUT", "DELETE"] },
        { name: "User", path: "/user", methods: ["GET", "POST", "PUT", "DELETE"] },
        { name: "Customer", path: "/customer", methods: ["GET", "POST", "PUT", "DELETE"] },
      ],
    };

    // Devolvemos la información como JSON
    res.status(200).json(hotelInfo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }

    res.status(500).json({ message: "Unknown error occurred" });
  }
});

export default infoController;
