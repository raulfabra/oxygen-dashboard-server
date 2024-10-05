import { Request, Response, Router } from "express";
import { Booking } from "../interfaces/Booking";
import bookingsData from "../data/dataBookings.json";

const bookingsController = Router();

bookingsController.get("/", async (req: Request, res: Response) => {
  try {
    if (!bookingsData || bookingsData.length === 0) {
      res.status(404).json({ message: "No bookings found" });
    }
    // Si hay datos, los retornamos con un código 200 (OK)
    res.status(200).json(bookingsData);
  } catch (error: any) {
    // En caso de error, retornamos una respuesta 500 (Internal Server Error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

bookingsController.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  // Buscamos la habitación por su id
  const booking = bookingsData.find((booking) => booking["id"] === Number(id));

  if (!booking) {
    res.status(404).json({ message: "booking not found" });
  } else {
    res.status(200).json(booking);
  }
});

bookingsController.post("/", async (req: Request<{}, {}, Booking>, res: Response) => {
  const { body } = req;

  // Obtener todos los ids de bookingsData y calcular el máximo
  const ids = bookingsData.map((booking) => booking["id"]);
  const maxId = Math.max(...ids);

  // Crear un nuevo booking con un id incrementado
  const newBooking = {
    ...body,
    id: maxId + 1,
    orderDate: body.orderDate.toDateString(),
    checkin: body.checkin.toDateString(),
    checkout: body.checkout.toDateString(),
  };

  // Agregar la nueva habitación a bookingsData
  bookingsData.push(newBooking);

  // Enviar la respuesta con el nuevo array
  res.status(201).json([...bookingsData, newBooking]);
});

bookingsController.put("/:id", async (req: Request<{ id: number }, {}, Booking>, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  // Encontramos el índice de la booking por su id
  const bookingByIndex = bookingsData.findIndex((booking) => booking["id"] === Number(id));

  // Si encontramos la booking, la actualizamos
  if (bookingByIndex !== -1) {
    const updatedbooking = {
      ...bookingsData[bookingByIndex],
      ...body,
      orderDate: body.orderDate.toDateString(),
      checkin: body.checkin.toDateString(),
      checkout: body.checkout.toDateString(),
    };

    // Actualizamos el array de bookings con el objeto actualizado
    bookingsData[bookingByIndex] = updatedbooking;

    // Enviamos la respuesta con la booking actualizada
    res.status(200).json(updatedbooking);
  }

  // Si no encontramos la booking, enviamos una respuesta 404
  res.status(404).json({ message: "booking not found" });
});

bookingsController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  // Encontramos el índice de la booking por su id
  const bookingByIndex = bookingsData.findIndex((booking) => booking["id"] === Number(id));

  // Si la booking existe, la eliminamos
  if (bookingByIndex !== -1) {
    // Eliminamos la booking del array
    const deletedbooking = bookingsData.splice(bookingByIndex, 1); // splice devuelve un array con los elementos eliminados

    res.status(200).json({ message: "booking deleted successfully", deletedbooking });
  }

  // Si no encontramos la booking, enviamos una respuesta 404
  res.status(404).json({ message: "booking not found" });
});

export default bookingsController;
