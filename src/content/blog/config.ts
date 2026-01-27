import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(["PUBLISH", "DRAFT", "SCHEDULE"]),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
