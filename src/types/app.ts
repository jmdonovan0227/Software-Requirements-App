export type CreditObject = {
    credits?: number;
    error?: string;
};

export type Requirement = {
    req_title: string;
    req_details: string[];
};


export type DashboardState = {
    aiData: Requirement[]
    isPending: boolean
    currentCredits: number
}

export type ReqResponse = {
    requirements: Requirement[];
};