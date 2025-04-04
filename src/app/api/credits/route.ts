import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditsById, createCreditsEntry, updateCreditsEntry } from "@/prisma-db";
import { CreditObject } from "@/types/app";


// get information about the current user on start of application
export async function POST() {
    try {
        // get current auth status of user
        const { userId } = await auth();

        // if user is not logged return an error status and some error text
        if(!userId) {
            return NextResponse.json({
                error: "Unauthorized"
            }, { status: 401 });
        }

        // check to see if we found a matching user (if not create them with 20 credits initially)
        const exists = await getCreditsById(userId);

        if(!exists) {
            const credits = await createCreditsEntry(userId);
            const resp : CreditObject = { credits: credits?.credits ?? 0 };
            return NextResponse.json(resp);
        }

        const resp : CreditObject = { credits: exists.credits };
        return NextResponse.json(resp);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

// update the current user's record 
export async function PUT(request : NextRequest) {
    try {
        // get current auth status of user
        const { userId } = await auth();

        // if user is not logged return an error status and some error text
        if(!userId) {
            return NextResponse.json({
                error: "Unauthorized"
            }, { status: 401 });
        }

        const exists = await getCreditsById(userId);

        if(!exists) {
            const resp : CreditObject = { error: "Could Not Update Credits With Passed User ID" };
            return NextResponse.json(resp);
        }

        const data = await request.json();
        const updatedData = await updateCreditsEntry(userId, data.credits);
        const resp : CreditObject = { credits: updatedData?.credits ?? 0 };
        return NextResponse.json(resp);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}