import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    create: publicProcedure
        .input(z.object({ name: z.string().min(1), url: z.string().min(1), userId: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return ctx.db.book.create({
                data: {
                    name: input.name,
                    url: input.url,
                    userId: input.userId
                },
            });
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.book.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),
});
