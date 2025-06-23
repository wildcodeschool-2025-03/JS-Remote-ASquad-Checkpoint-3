import type { RequestHandler } from "express";
import client from "../../../database/client";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const [tiles] = await client.query("SELECT * FROM tile");
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;

  if (typeof coord_x !== "number" || typeof coord_y !== "number") {
    res.sendStatus(422);
    return;
  }

  try {
    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (tiles.length === 0) {
      res.sendStatus(422);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
