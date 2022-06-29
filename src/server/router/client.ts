import { createRouter } from "./context";
import { createClientInput } from "../../shared/create-client-validator";
import { randomBytes } from "crypto";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const clientRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.client.findMany();
    },
  })
  .mutation("create", {
    input: createClientInput,
    async resolve({ ctx, input }) {
      // TODO: work on random password generator
      let password = "";
      randomBytes(48, function (err, buffer) {
        if (err) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'something went wrong' });
        }
        password = buffer.toString('hex');
      });

      return await ctx.prisma.client.create({
        data: {
          name: input.name,
          password
        },
      });
    }
  })
  .mutation("delete", {
    input: z.string().max(100),
    async resolve({ctx, input}) {
      return await ctx.prisma.client.delete({
        where: {
          id: input
        }
      });
    }
  });
