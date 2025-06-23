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
  try {
    const { coord_x, coord_y } = req.body;
    if (typeof coord_x !== "number" || typeof coord_y !== "number") {
      res.status(422).json({
        error: "invalide coordinates",
      });
      return;
    }

    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (!tile) {
      res.status(422).json({
        error: "no tile found",
      });
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
