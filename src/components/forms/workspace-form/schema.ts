import { z } from "zod";

export const workspaceSchema = z.object({
    name: z.string().min(1, {message: 'worlspace name cannot be empty'}),
})