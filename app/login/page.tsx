"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import OffWhiteNav from "@/components/OffWhiteNav";
import { LogIn } from "lucide-react";
import Link from "next/link";

// Create a separate component that uses useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/hub";
  const [isLoading, setIsLoading] = useState(false);

  // Handle login with Google
  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="mb-8" data-oid="dqfsj..">
      <p className="mb-6" data-oid="s84ehmr">
        Sign in to access the KITESTUDIOS Resource Hub.
      </p>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center border-2 border-gray-200 dark:border-zinc-800 px-4 py-3 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        data-oid="9y9c-do"
      >
        {isLoading ? (
          <span data-oid="gsgr7h5">Signing in...</span>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" data-oid="92l.u10" /> Sign in with
            Google
          </>
        )}
      </button>
    </div>
  );
}

// Main component with Suspense boundary
export default function LoginPage() {
  return (
    <div className="page-wrapper" data-oid="seubz86">
      <OffWhiteNav data-oid="f2unz13" />
      <div
        className="min-h-screen bg-white dark:bg-black off-white-grid py-20"
        data-oid="ec1-mcz"
      >
        <div className="container mx-auto px-4" data-oid=":1x8rl1">
          <div
            className="max-w-md mx-auto border-2 border-gray-200 dark:border-zinc-800 p-12"
            data-oid="t5.i_s5"
          >
            <h1
              className="text-3xl font-bold mb-8 industrial-text"
              data-oid="1xje7h_"
            >
              RESOURCE HUB LOGIN
            </h1>

            <Suspense
              fallback={<div data-oid="1c5euov">Loading...</div>}
              data-oid="9mgyqku"
            >
              <LoginForm data-oid="law7nyq" />
            </Suspense>

            <div
              className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-zinc-800"
              data-oid="-2zroei"
            >
              <Link
                href="/"
                className="text-sm hover:underline"
                data-oid="x1kb0al"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
