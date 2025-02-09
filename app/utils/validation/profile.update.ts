import { z } from 'zod';

export const ProfileScheme = z.object({
    displayed_name: z
        .string()
        .min(1, { message: 'Username is too short' })
        .max(32, 'Username is too long')
        .optional(),
    is_public: z.boolean().optional(),
});
