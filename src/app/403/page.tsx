import React from "react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">403 - Forbidden</h1>
        <p className="text-gray-700">You do not have permission to access this page.</p>
      </div>
    </div>
  );
}
