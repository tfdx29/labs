import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { user } from "./auth";

export const workspace = sqliteTable(
  "workspace",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description"),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    entitiesCount: integer("entities_count").default(0).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("workspace_ownerId_idx").on(table.ownerId)],
);

export const workspaceRelations = relations(workspace, ({ one }) => ({
  owner: one(user, {
    fields: [workspace.ownerId],
    references: [user.id],
  }),
}));

export const createWorkspaceSchema = createInsertSchema(workspace)
  .pick({
    name: true,
    description: true,
  })
  .extend({
    name: z.string().min(1),
  });

export const updateWorkspaceSchema = createInsertSchema(workspace)
  .pick({
    id: true,
    name: true,
    description: true,
  })
  .extend({
    id: z.string(),
    name: z.string().min(1).optional(),
  });

export const deleteWorkspaceSchema = createInsertSchema(workspace)
  .pick({
    id: true,
  })
  .extend({
    id: z.string(),
  });
