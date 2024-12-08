"use client";

import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between mb-16">
      <div className="flex items-center gap-2">
        <Leaf className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">CleanTech</h1>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-600">Welcome, {user.username}!</span>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}