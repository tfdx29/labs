import { createFileRoute, useNavigate } from "@tanstack/react-router";
import z from "zod";

import SignInForm from "@/components/sign-in-form";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_public/_guest/login")({
  validateSearch: loginSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  return (
    <SignInForm
      redirect={redirect}
      onSwitchToSignUp={() => navigate({ to: "/register", search: (prev) => ({ redirect: prev.redirect }) })}
    />
  );
}
