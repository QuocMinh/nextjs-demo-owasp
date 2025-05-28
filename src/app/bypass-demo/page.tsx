"use client";
import Link from "next/link";

export default function BypassDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Bypass Authentication Demo</h1>
        <p className="mb-4">
          This page demonstrates how an attacker can bypass authentication in a Next.js application if authentication relies only on client-side cookies.
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li>
            <span className="font-semibold">Directly access the API:</span> Send a POST request to <code className="bg-gray-100 px-1">/api/login</code> with the correct username/password to receive the authentication cookie, or send requests to other APIs without authentication.
          </li>
          <li>
            <span className="font-semibold">Modify cookies in the browser:</span> Use DevTools to set the <code className="bg-gray-100 px-1">isLoggedIn=true</code> cookie, then access <Link href="/home" className="text-blue-600 underline">/home</Link> to enter the protected page without logging in.
          </li>
          <li>
            <span className="font-semibold">Bypass middleware:</span> If the middleware only checks client-side cookies, an attacker can simulate this cookie using tools like curl, Postman, or browser extensions.
          </li>
        </ol>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-semibold">Note:</p>
          <p>This is an educational example. Do not use this simple authentication mechanism in production!</p>
        </div>
        <Link href="/login" className="text-blue-600 underline">Back to Login Page</Link>
      </div>
    </div>
  );
}
