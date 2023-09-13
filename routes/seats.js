import express from 'express';
import { createSeat, deleteSeat, getSeat, getSeats, updateSeat, updateSeatAvailability } from '../controllers/seat.js';
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();

router.post("/:flightid", verifyAdmin, createSeat);

router.put("/:id", verifyAdmin, updateSeat);
router.put("availability/:id", updateSeatAvailability);

router.delete("/:id/:flightid", verifyAdmin, deleteSeat);

router.get("/:id", getSeat);

router.get("/", getSeats);

export default router;
