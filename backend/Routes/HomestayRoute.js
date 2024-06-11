import express from "express";
import  {
  getHomeStay,
  createHomestays,
  getHomestayById,
} from "../controller/HomestayController.js";

const homeStayRouter = express.Router();

homeStayRouter.post("/create_homestays", createHomestays);
homeStayRouter.get("/homestays_avail", getHomeStay);
homeStayRouter.get("/:id", getHomestayById);

export default homeStayRouter;
