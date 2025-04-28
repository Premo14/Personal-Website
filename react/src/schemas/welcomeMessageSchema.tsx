import * as z from "zod";

export const welcomeMessageSchema = z.object({
    message: z.string().min(1, "Message field is required.").max(255, "Message must be less than 255 characters.")
})

export type WelcomeMessage = z.infer<typeof welcomeMessageSchema>
