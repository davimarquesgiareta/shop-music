"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

export default function LoginPage() {
  const [formType, setFormType] = useState<"login" | "signup">("login");

  const toggleFormType = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md">
        {formType == "login" ? (
          <>
            <LoginForm />
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
            </p>
            <button
              onClick={toggleFormType}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            <SignUpForm />
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
            </p>
            <button
              onClick={toggleFormType}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </main>
  );
}