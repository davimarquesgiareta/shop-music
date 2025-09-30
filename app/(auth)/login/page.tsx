"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";

export default function LoginPage() {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const toggleFormType = () =>
    setFormType((prev) => (prev === "login" ? "signup" : "login"));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader />
        <CardContent>
          {formType === "login" ? <LoginForm /> : <SignUpForm />}
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            onClick={toggleFormType}
            className="text-sm text-primary hover:underline"
          >
            {formType === "login"
              ? "Don't have an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </CardFooter>
      </Card>
    </main>
  );
}
