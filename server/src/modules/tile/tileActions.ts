import type { RequestHandler } from "express";
import client from "../../../database/client";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const [tiles] = await client.query("SELECT * FROM tile");
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
