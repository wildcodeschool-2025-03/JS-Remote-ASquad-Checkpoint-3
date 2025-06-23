import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  const tiles = await tileRepository.readAll();

  try {
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coords = await tileRepository.readByCoordinates(
      req.body.coord_x,
      req.body.coord_y,
    );

    if (coords.length !== 0) {
      next();
    } else {
      res.status(422).json({ error: "Coordinates not found" });
    }
  } catch (err) {
    res.sendStatus(422);
  }
};

export default {
  browse,
  validate,
};
