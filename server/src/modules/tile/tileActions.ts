import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const { coord_x, coord_y } = req.body;

    if (
      coord_x == null ||
      coord_y == null ||
      typeof coord_x !== "number" ||
      typeof coord_y !== "number"
    ) {
      res.sendStatus(422);
      return;
    }

    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (!tile || tile.length === 0) {
      res.sendStatus(422);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
