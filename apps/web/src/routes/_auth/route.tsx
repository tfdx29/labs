import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import AppLayout from "@/common/layout/app-layout";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
    return { session };
  },
});

function AuthLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
