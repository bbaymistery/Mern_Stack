import express from "express";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router();

router.post("/", verifyAdmin, createHotel);//dahsboard
router.put("/:id", verifyAdmin, updateHotel);//dashboard
router.delete("/:id", verifyAdmin, deleteHotel);//dashboard


router.get("/find/:id", getHotel);
router.get("/", getHotels);


router.get("/countByCity", countByCity);//featured component(UI)terefden kullandik
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
