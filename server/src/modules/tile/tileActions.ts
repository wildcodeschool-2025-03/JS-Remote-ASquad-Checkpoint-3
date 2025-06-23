import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;

  const [tile] = await tileRepository.readByCoordinates(coord_x, coord_y);

  if (!tile) {
    res.sendStatus(422);
  } else {
    next();
  }
};

export default {
  browse,
  validate,
};
