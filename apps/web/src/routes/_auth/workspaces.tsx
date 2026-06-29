import WorkspacePage from "@/page/workspace";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/workspaces")({
  component: WorkspacePage,
});
