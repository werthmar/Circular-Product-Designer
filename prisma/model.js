/**
 * Custom model to handle all SQL request using prisma: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDescriptions(type) {
    const descriptions = await prisma.descriptions.findMany({
        where: { type: type },
    });
    return descriptions;
}

