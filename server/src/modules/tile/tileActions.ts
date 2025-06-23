import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all boats from the database
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;
  const [tile] = await tileRepository.readByCoordinates(coord_x, coord_y);

  if (!tile) {
    res.sendStatus(422);
    return;
  }
  if (coord_x === undefined || coord_y === undefined) {
    res.sendStatus(422);
    return;
  }
  next();
};

export default {
  browse,
  validate,
};
