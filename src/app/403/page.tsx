import React from "react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          403 - Forbidden
        </h1>
        <p className="text-gray-700">
          You do not have permission to access this page.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Back to Login Page
        </Link>
      </div>
    </div>
  );
}
