import { SignedIn, SignUpButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  // do some initial logic to see if there is a session if not,
  // redirect user to dashboard
  return (
    <div className='flex flex-col justify-center items-center text-center w-full h-[80vh]'>
      <h1 className="text-4xl font-serif mb-2">Welcome To Software Requirements App</h1>
      <p className="mb-4 text-xl">This app leverages the DeepSeek R1 LLM to help guide users in planning and defining software systems.</p>
      <SignedIn>
        <SignUpButton>
          <Button className="p-6 text-lg hover:cursor-pointer">Get Started</Button>
        </SignUpButton>
      </SignedIn>
      <SignedOut>
        <Link href="/dashboard">
          <Button className="p-6 text-lg hover:cursor-pointer">Get Started</Button>
        </Link>
      </SignedOut>
    </div>
  )
}
