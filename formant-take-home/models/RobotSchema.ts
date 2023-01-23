import { z } from 'zod'

export const RobotSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    arms: z.coerce.number({  required_error: "Arms is required" }).min(0).max(8),
    description: z.string({   required_error: "Description is required",}),
    id: z.string(),
});