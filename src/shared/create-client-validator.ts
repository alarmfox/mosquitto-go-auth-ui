import {z} from "zod";


export const createClientInput = z.object({
    name: z.string().max(100),
});


export type CreateClientInput = z.infer<typeof createClientInput>;
