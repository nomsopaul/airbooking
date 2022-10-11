import express from 'express';
import {
  createFlight,
  getFlights,
  deleteFlight,
  updateFlight,
  getFlight,
  countByCity,
  countByType,
} from '../controllers/flight.js';
import Flight from "../modals/Flight.js"
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router ();

//create
router.post ('/', verifyAdmin, createFlight);
//update
router.put ('/:id', verifyAdmin, updateFlight);

//delete
router.delete ('/:id', verifyAdmin, deleteFlight);
//get
router.get ('/find/:id', getFlight);
//getall
router.get ('/', getFlights);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
