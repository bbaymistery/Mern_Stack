import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import mongoose from "mongoose";

import { createError } from "../utils/error.js";
/**  @access_Admin */
export const createRoom = async (req, res, next) => {
  const hotelId = new mongoose.Types.ObjectId(req.params.hotelid);
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    //savedRoom id ni ModelHoteldeki rooms icine ekliyoruz Ve belelikle butun odalarin id leri eger o hotele aiddirse O hotelin rooms bomesi icerisinde olacag
    await Hotel.findByIdAndUpdate(
      hotelId.toString(),
      { $push: { rooms: savedRoom._id } },
      { safe: true, upsert: true, new: true },
    );

    res.status(200).json(savedRoom);
  } catch (err) { next(err); }
};

//it is the the as hotel update
/**  @access_Admin */
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true })
      ;
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};


/**  @access_Admin */
export const updateRoomAvailability = async (req, res, next) => {
  try {

    //!!! we r updating roomNumber not room !!!
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

/**  @access_Admin */
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

//iyt is the same as hotel controller
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
//iyt is the same as hotel controller

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
