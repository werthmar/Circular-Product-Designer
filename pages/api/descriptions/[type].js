/**
 * Handles the client side request from the advisor page. Accesses the sql and reports back to view.
 * 
 * Input:
 * - Type: e.g. cbm for circular business model
 * - selected: optional, only used if results should be filterd based on selected elements from the user
 *    musst be set by /api/descriptions/[type]?selected=...
 */

import * as model from "../../../prisma/model";

export default async function handler(req, res) {
    const { type } = req.query
    console.log(req.query);

    const descriptions = await model.getDescriptions( type );

    res.status(200).send({ descriptions });
  }
  