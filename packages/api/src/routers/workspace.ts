import {
  workspace,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  deleteWorkspaceSchema,
} from "@labs/db/schema/workspace";
import { eq, and } from "drizzle-orm";
import { ORPCError } from "@orpc/server";

import { protectedProcedure } from "../index";

export const workspaceRouter = {
  create: protectedProcedure
    .input(createWorkspaceSchema)
    .handler(async ({ input, context: { db, session } }) => {
      const userId = session.user.id;

      const [newWorkspace] = await db
        .insert(workspace)
        .values({
          name: input.name,
          description: input.description ?? null,
          ownerId: userId,
        })
        .returning();
      return newWorkspace;
    }),

  update: protectedProcedure
    .input(updateWorkspaceSchema)
    .handler(async ({ input, context: { db, session } }) => {
      const userId = session.user.id;

      const [existing] = await db
        .select()
        .from(workspace)
        .where(eq(workspace.id, input.id))
        .limit(1);

      if (!existing) {
        throw new ORPCError("NOT_FOUND", { message: "Workspace not found" });
      }

      if (existing.ownerId !== userId) {
        throw new ORPCError("UNAUTHORIZED", {
          message: "You are not the owner of this workspace",
        });
      }

      const updateData: Partial<typeof workspace.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (input.name !== undefined) updateData.name = input.name;
      if (input.description !== undefined)
        updateData.description = input.description ?? null;

      const [updatedWorkspace] = await db
        .update(workspace)
        .set(updateData)
        .where(eq(workspace.id, input.id))
        .returning();

      return updatedWorkspace;
    }),

  delete: protectedProcedure
    .input(deleteWorkspaceSchema)
    .handler(async ({ input, context: { db, session } }) => {
      const userId = session.user.id;

      const [deleted] = await db
        .delete(workspace)
        .where(and(eq(workspace.id, input.id), eq(workspace.ownerId, userId)))
        .returning();

      if (!deleted) {
        throw new ORPCError("NOT_FOUND", {
          message:
            "Workspace not found or you don't have permission to delete it",
        });
      }

      return { success: true };
    }),

  getAll: protectedProcedure.handler(async ({ context: { db, session } }) => {
    const userId = session.user.id;
    return await db.query.workspace.findMany({
      where: (workspace, { eq }) => eq(workspace.ownerId, userId),
    });
  }),
};
