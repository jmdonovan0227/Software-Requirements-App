import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function NavigationBar() {
    return (
        <div className='flex justify-between items-center w-full h-[10vh] border-b-2 border-gray-300 shadow-lg sticky top-0]'>
            <h1 className='ml-2 font-sans text-xl md:text-2xl lg:text-3xl font-semibold'>SR App</h1>
            <div className="flex items-center h-full mr-4">
                <div className="mr-2">
                    <SignedOut>
                        <SignInButton>
                            <Button className="text-md p-6 hover:cursor-pointer">Sign In</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
}