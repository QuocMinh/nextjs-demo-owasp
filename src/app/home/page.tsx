"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Hello Admin! You have successfully logged in</h1>
        <Button
          onClick={handleLogout}
          text="Logout"
          color="red"
          loading={loading}
          className="mt-6"
        />
      </div>
    </div>
  );
}
