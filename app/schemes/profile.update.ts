import { z } from 'zod';

export type ProfileScheme = z.output<typeof ProfileSchemeObject>;

export const ProfileSchemeObject = z.object({
    displayed_name: z.string().min(1).max(32).optional(),
    is_public: z.boolean().optional(),
    user_avatar: z
        .string()
        .url()
        .or(z.string().regex(/^data:image\/(png|jpeg|jpg);base64,/))
        .optional(),
});
