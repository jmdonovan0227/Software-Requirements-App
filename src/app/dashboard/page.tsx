"use client";
import { useEffect } from "react";
import { Results } from "@/components/results";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import { CreditObject, ReqResponse } from "@/types/app";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setAiData, clearAiData, setIsPending, setCurrentCredits } from "../../store/dashboardSlice";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
    const dispatch = useDispatch();
    const aiData = useSelector((state: RootState) => state.dashboardReducer.aiData);
    const isPending = useSelector((state: RootState) => state.dashboardReducer.isPending);
    const currentCredits = useSelector((state: RootState) => state.dashboardReducer.currentCredits);
    const { pending } = useFormStatus();
    const { userId, isSignedIn } = useAuth();

    useEffect(() => {
        const fetchCreditsData = async() => {
            const response = await fetch("/api/credits", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({})
            });
    
            const credits : CreditObject = await response.json();

            if(credits?.credits) {
                dispatch(setCurrentCredits(credits.credits));
            }

            else {
                console.log('error fetching credits');
            }
        }

        fetchCreditsData();
    }, [dispatch]);

    const onSubmit = async(event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!userId || !isSignedIn) {
            return;
        }

        if(currentCredits <= 0) return;


        try {
            dispatch(setIsPending(true));
            const formData = new FormData(event.currentTarget);
            const message = formData.get("search");
    
            if(message) {
                //
                const response = await fetch("/api/req", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({ message })
                });
    
                const data : ReqResponse = await response.json();

                if(data && data.requirements[0].req_title && data.requirements[0].req_details.length > 0) {
                    dispatch(setCurrentCredits(currentCredits - 1));

                    await fetch("/api/credits", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ credits: currentCredits - 1 })
                    });

                    dispatch(setAiData(data.requirements));
                }
                else {
                    dispatch(clearAiData());
                }
            }
        } catch(error) {
            console.log(error);
        } finally {
            dispatch(setIsPending(false));
        }
    };
    
    return (
        <div className='flex flex-col h-[82.5vh] w-[97.5vw] md:w-[90vw] lg:w-[80vw]'>
            <div className='flex w-full border border-gray-300 h-[50%] mb-4 shadow-lg rounded-md'>
                <Results data={aiData} isPending={isPending} />
            </div>

            <div className='h-[30%] w-full items-center'>
                <form onSubmit={(event) => onSubmit(event)} className="flex flex-col items-center justify-around w-full h-full">
                    <Textarea name="search" className="h-[50%] w-full border border-gray-400 shadow-md text-lg p-2 rounded-md font-sans" placeholder="Please enter your requirements here..."></Textarea>
                    {
                        currentCredits > 0 ? <Button className='p-7 text-xl cursor-pointer mt-2' type="submit" disabled={pending}>Submit</Button> : (
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='p-7 text-xl cursor-pointer mt-2' type="submit" disabled={pending}>Submit</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Sorry, You Have Run Out Of Credits!</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You&apos;ve reached the limit. Please purchase more credits to continue.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )
                    }
                </form>
            </div>
        </div>
    );
}