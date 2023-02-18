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
    const { type } = req.query;
    const { items } = req.query;
    var selectedItems;
    console.log(req.query);

    // Transform the String from the API request into an Array of Strings
    if( items != 'undefined' ) {
      selectedItems = JSON.parse( "[" + items + "]" )[0];
    }
    
    // Split type
    let typeArr = type.split(",");
    var oldType = typeArr[0];
    var nextType = typeArr[1];

    const matchingIds = await model.getMatchingIds(oldType, nextType, selectedItems);


    //var types = type.map(); //Position 0 = oldType, Position 1 = Type we want to load.

    //var selectedItems = items.substring( 1, items.length -1 ).split(",");


    const descriptions = await model.getDescriptions( nextType, matchingIds );

    res.status(200).send({ descriptions });
  }
  