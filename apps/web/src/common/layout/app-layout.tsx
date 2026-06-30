import { useNavigate } from "@tanstack/react-router";
import { ReactNode } from "react";

import AppShellBlock from "@labs/ui/components/app-shell-block";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate({ to: "/login" });
  };

  if (isPending) {
    return <Loader text="Loading App..." />;
  }
  return (
    <AppShellBlock
      user={session?.user}
      onSignOut={handleSignOut}
      onNavigate={(href) => navigate({ to: href })}
    >
      {children}
    </AppShellBlock>
  );
}
