import { z } from "zod";
import { auth } from "@clerk/nextjs";
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
            const { userId } = auth();
            return ctx.db.book.create({
                data: {
                    name: input.name,
                    url: input.url,
                    userId: userId
                },
            });
        }),

    getAll: publicProcedure.query(({ ctx, input }) => {
        const { userId } = auth();
        return ctx.db.book.findMany({
            where: {
                userId: userId,
            },
            orderBy: { createdAt: "desc" },
        });
    }),
});
