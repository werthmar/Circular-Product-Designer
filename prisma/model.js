/**
 * Custom model to handle all SQL request using prisma: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getDescriptions(type, items) {
    var descriptions;

    // Results can either be filtered by selected items or not
    if(items) {
        descriptions = await prisma.descriptions.findMany({
            where: {
                //type: type,
                id: { in: items }
            },
        });
    }

    else {    
        descriptions = await prisma.descriptions.findMany({
            where: { type: type },
        });
    }

    return descriptions;
}

// Searches the e.g. CBMxLCP matrix and returns the matching ids
export async function getMatchingIds(oldType, nextType, ids) {

    var result;
    var matchingIds = [];
    var matchingIdType

    // CBM -> LCP
    if( oldType == "CBM" && nextType == "LCP" ) {

        matchingIdType = 'LCP_id';
        result =  await prisma.lcpxcbm.findMany({
            select: { LCP_id: true },
            where: { 
                CBM_id: { in: ids }, 
                Priority: { 
                    gt: 2
                }
            },
            distinct: [ matchingIdType ],
            orderBy: { Priority: 'desc' }
        })     
    }
    // LCP -> CBM
    else if( oldType == "LCP" && nextType == "CBM" ) {

        matchingIdType = 'CBM_id';
        result =  await prisma.lcpxcbm.findMany({
            select: { CBM_id: true },
            where: { 
                LCP_id: { in: ids }, 
                Priority: { 
                    gt: 2
                }
            },
            distinct: [ matchingIdType ],
            orderBy: { Priority: 'desc' }
        })     
    }
    // LCP -> ED
    else if( oldType == "LCP" && nextType == "ED" ) {

        matchingIdType = 'ED_id';
        result =  await prisma.lcpxed.findMany({
            select: { ED_id: true },
            where: { 
                LCP_id: { in: ids }, 
                Priority: { 
                    gt: 2
                }
            },
            distinct: [ matchingIdType ],
            orderBy: { Priority: 'desc' }
        })     
    }
    // CBM -> ED
    else if( oldType == "CBM" && nextType == "ED" ) {

        matchingIdType = 'ED_id';
        result =  await prisma.cbmxed.findMany({
            select: { ED_id: true },
            where: { 
                CBM_id: { in: ids }, 
                Priority: { 
                    gt: 2
                }
            },
            distinct: [ matchingIdType ],
            orderBy: { Priority: 'desc' }
        })     
    }
    // ED -> CDP
    else if( oldType == "ED" && nextType == "CDP" ) {

        matchingIdType = 'cdp_id';
        result =  await prisma.edxcdp.findMany({
            select: { cdp_id: true },
            where: { 
                ed_id: { in: ids }, 
            },
            distinct: [ matchingIdType ]
        })     
    }



    // Transform the query result into array with just the ids
    result.forEach(element => {
        matchingIds.push( element[ matchingIdType ] );
    });
    
    return matchingIds

}