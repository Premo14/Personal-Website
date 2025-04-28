import * as z from "zod";

export const toolSchema = z.object({
    name: z.string().min(1, "Tool name is required"),
    link: z.string().url("Must be a valid URL"),
    icon: z.string().min(1, "Icon URL or path is required"),
    categories: z.array(z.string()).min(1, "At least one category is required")
});

export const techStackSchema = z.object({
    tools: z.array(toolSchema),
});

// Types
export type Tool = z.infer<typeof toolSchema>;
