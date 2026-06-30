import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";

export const Route = createFileRoute("/_public/_guest")({
  loader: async () => {
    const session = await authClient.getSession();
    return { isLoggedIn: !!session?.data };
  },
  component: GuestLayout,
});

function GuestLayout() {
  const { isLoggedIn } = Route.useLoaderData();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  if (shouldRedirect) {
    return <Loader text="You are already logged in. Redirecting to dashboard..." />;
  }

  return <Outlet />;
}
