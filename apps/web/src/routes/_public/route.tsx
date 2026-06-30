import { Outlet, createFileRoute } from "@tanstack/react-router";
import { HeaderBlock } from "@labs/ui/components/header-block";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] h-svh">
      <HeaderBlock />
      <Outlet />
    </div>
  );
}
