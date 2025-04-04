"use client";
import { Requirement } from "@/types/app";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function Results({ data, isPending } : { data: Requirement[], isPending: boolean }) {
    return (
        isPending ?  <div className="flex items-center justify-center w-full h-full"><div className="w-[5rem] h-[5rem] border-6 border-blue-400 border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="w-full p-4 border border-gray-200 shadow-md rounded-sm font-sans max-h-[100%] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 text-center underline">Building Your System</h1>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3 text-base font-semibold">Number</TableHead>
                            <TableHead className="w-1/3 text-base font-semibold">Category</TableHead>
                            <TableHead className="w-1/3 text-base font-semibold">Key Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {
                                data.map((requirement, index) => {
                                    return (
                                        <TableRow className='h-[120px]' key={`Category:${index}`}>
                                            <TableCell className="text-sm text-muted-foreground">{index + 1}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{requirement.req_title}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground whitespace-normal break-words">
                                                {
                                                    requirement.req_details.map((detail, index) => (
                                                        <p className="mb-1" key={`Detail:${index}`}>
                                                            <strong>{`${index + 1}. `}</strong>{detail}
                                                        </p>
                                                    ))
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                    </TableBody>
                </Table>
            </div>
      </div>
    ));
}