import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

/**  @access_Admin */
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

/**  @access_Admin */
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel =
      await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.status(200).json(updatedHotel);
  } catch (err) { next(err); }
};

/**  @access_Admin */
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) { next(err); }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels =
      await Hotel
        .find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 }, })
        .limit(req.query.limit);
    // const hotels = await Hotel.find({})
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const countByCity = async (req, res, next) => {
  //localhost:8800/api/hotels/countByCity?cities=berlin,madrid,london
  const cities = req.query.cities.split(",");// , vergun yuxardakina gore
  try {
    const list = await Promise.all(cities.map((city) => Hotel.countDocuments({ city: city })));
    console.log(list.length);
    //[2,1,1] berlin 2 mardrid 1london 1
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    //req.para,s.id  it is about id which we send on client side It is hote id
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map((room) => { return Room.findById(room) }));
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
