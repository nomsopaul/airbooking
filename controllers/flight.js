import Flight from "../modals/Flight.js"
import Seat from "../modals/Seat.js"

export const createFlight = async (req, res, next) => {
     const newFlight = new Flight (req.body);
  try {
    const savedFlight = await newFlight.save ();
    res.status (200).json (savedFlight);
  } catch (err) {
    next(err);
  }
}

export const updateFlight = async (req, res, next) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate (
      req.params.id,
      {$set: req.body},
      {new: true}
    );
    res.status (200).json (updatedFlight);
  } catch (err) {
    next(err);
  }
};

export const deleteFlight = async (req, res, next) => {
  try {
    await Flight.findByIdAndDelete (req.params.id);
    res.status (200).json ('Flight has been deleted');
  } catch (err) {
    next(err);
  }
};

export const getFlight = async (req, res, next) => {
 try {
    const flight = await Flight.findById (req.params.id);
    res.status (200).json(flight);
  } catch (err) {
   next(err);
  }
};


export const getFlights = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const flights = await Flight.find({ 
      ...others,
       cheapestPrice: { $gt: min | 0, $lt: max || 999},
       }).limit(req.query.limit);
    res.status (200).json(flights);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",") 
    const list = await Promise.all(cities.map(city=>{
      return Flight.countDocuments({city:city})
    }))
    res.status (200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
   const flightCount = await Flight.countDocuments({type:"flight"})
   const apartmentCount = await Flight.countDocuments({type:"apartment"});
   const carsCount = await Flight.countDocuments({type:"cars"});
   const taxisCount = await Flight.countDocuments({type:"taxis"});
   const hotelCount = await Flight.countDocuments({type:"hotel"});

    res.status (200).json ([
      {type: "flights", count: flightCount },
      {type: "apartments", count: apartmentCount },
      {type: "cars", count: carsCount },
      {type: "taxis", count: taxisCount },
      {type: "hotels", count: hotelCount },
    ]);
  } catch (err) {
    next (err);
  }
};


export const getFlightSeats = async(req, res, next) => {
  try{
    const flight = await Flight.findById(req.params.id)
    const list = await Promise.all(flight.seats.map((seat) => {
      return Seat.findById(seat);
    })
  );
  res.status(200).json(list)
  } catch (err) {
    next(err)
  }
};