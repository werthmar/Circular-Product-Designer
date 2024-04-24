import * as model from "../../prisma/model";

export default async function handler(req, res) {

    const { items } = req.query;
    var selectedItems = JSON.parse(items);

    // Get the solution approaches ids
    var matchingIds = await model.getMatchingIds("ED", "SL", selectedItems);
    console.log(items);

    // Get the solution Approaches
    var solution_approaches = await model.getSolutionApproaches( matchingIds );

    // Get CDPs based on the cdp index in the solution approaches
    var cdps = await model.getCdps( solution_approaches );

    // Join CDPs and Sls together into one dataset
    cdps.forEach( ( cdp, cdpIndex ) =>
    {
        cdp.solution_approaches = [];

        solution_approaches.forEach( (sl, slIndex) =>
        {
            if( sl.cdp_id == cdp.cdp_id ) {
                cdp.solution_approaches.push( sl );
            }
        });

    });
    
    res.status(200).send({ cdps });

}