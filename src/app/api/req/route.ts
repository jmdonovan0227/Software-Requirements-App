import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { InferenceClient } from "@huggingface/inference";
import { Requirement } from "@/types/app";
const API_KEY = process.env.API_KEY;

const client = new InferenceClient(API_KEY);

export async function POST(request: NextRequest) {
    const { userId } = await auth();

    if(!userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const chatCompletion = await client.chatCompletion({
        provider: "fireworks-ai",
        model: "deepseek-ai/DeepSeek-R1",
        messages: [
            {
                role: "user",
                content: data.message + "Please format as a numbered list for each requirement and key details as dashes. You may bold the title (not the number) for each requirement but do not format the key details in any other way than I mentioned. Feel free to mention any suggested technologies in key details that would fit my needs.",
            },
        ],
    });

    // get the content of the message from deepseek, split into an array where each element is delimited by the newline character
    // remove all spacing at the front and back of string and then use .filter(Boolean) to remove any null or undefined values.
    const lines = chatCompletion.choices[0].message.content?.split('\n').map(line => line.trim()).filter(Boolean);

    // requirements is an array of all requirements found by deepseek
    const requirements : Requirement[] = [];
    // update the current requirement we are looking at. Each time we find a number with a period 1. we can remove it from the
    // title and begin add key details to the req_details array.
    let currentRequirement : Requirement | null = null;

    // if lines = all requirements and key details we found is not null
    // then do something...
    if(lines) {
        for (const line of lines) {
            if (/^\d+\./.test(line)) {
              const req_title = line.replace(/^\d+\.\s*/, '').replaceAll("*", "");
              // current requirement shows "**" at front and back of strings (replaceAll handles this after removing the numbers and periods)
              currentRequirement = { req_title, req_details: [] };
              requirements.push(currentRequirement);
            } else if (line.startsWith('-') && currentRequirement) {
              const req_detail = line.replace(/^-/, '').trim();
              currentRequirement.req_details.push(req_detail);
            }
          }
    }

    return NextResponse.json({ requirements });
}