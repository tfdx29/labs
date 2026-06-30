import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(true);
  const { redirect } = Route.useSearch();

  return showSignIn ? (
    <SignInForm
      redirect={redirect}
      onSwitchToSignUp={() => setShowSignIn(false)}
    />
  ) : (
    <SignUpForm
      redirect={redirect}
      onSwitchToSignIn={() => setShowSignIn(true)}
    />
  );
}
