import { createFileRoute, useNavigate } from "@tanstack/react-router";
import z from "zod";

import SignUpForm from "@/components/sign-up-form";

const registerSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_public/_guest/register")({
  validateSearch: registerSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  return (
    <SignUpForm
      redirect={redirect}
      onSwitchToSignIn={() => navigate({ to: "/login", search: (prev) => ({ redirect: prev.redirect }) })}
    />
  );
}
