import { PrismaClient } from "@prisma/client";

// database operations
const prisma = new PrismaClient();

export async function getCreditsById(id: string) {
    try {
        const credits = await prisma.credits.findUnique({
            where: { id }
        });

        return credits;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function createCreditsEntry(id: string) {
    try {
        const credits = await prisma.credits.create({
            data: { id, credits: 20 }
        });

        return credits;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function updateCreditsEntry(id: string, credits: number) {
    try {
        const updatedCredits = await prisma.credits.update({
            where: { id },
            data: { credits }
        });
    
        return updatedCredits;
    } catch(error) {
        console.log(error);
        return null;
    }
}