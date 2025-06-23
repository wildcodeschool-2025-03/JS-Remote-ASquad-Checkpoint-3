import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select b.*, t.type, t.has_treasure FROM boat AS b JOIN tile AS t ON b.coord_x = t.coord_x AND b.coord_y = t.coord_y ORDER BY b.coord_y, b.coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [results] = await databaseClient.query<Result>(
      "UPDATE boat set coord_x =?, coord_y =? WHERE id=?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    return results.affectedRows;
  }
}

export default new BoatRepository();
