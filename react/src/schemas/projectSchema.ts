import * as z from "zod";

export const portfolioProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    tools: z.array(z.string()).optional(),
    description: z.string().min(1, "Description is required"),
    sourceLink: z.string().url().optional(),
    liveLink: z.string().url().optional(),
});

export type PortfolioProjectFormValues = z.infer<typeof portfolioProjectSchema>;
