// Trang login bảo mật với giới hạn số lần đăng nhập sai
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function LoginSecurePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [wait, setWait] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (wait !== null && wait > 0 && remaining === 0) {
      const timer = setInterval(() => {
        setWait((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remaining, wait]);

  useEffect(() => {
    if (wait === 0 && error) {
      setError("");
      setWait(null);
    }
  }, [error, wait]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login-secure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/home");
      } else {
        setError(data.message || "Login failed");
        if (typeof data.remaining === "number") setRemaining(data.remaining);
        if (typeof data.wait === "number") setWait(data.wait);
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login Secure</h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
            <br />
            {remaining !== null && remaining > 0 && (
              <span> (Remaining {remaining} attempts)</span>
            )}
            {wait !== null && wait > 0 && (
              <span> (Please try again in {wait} seconds)</span>
            )}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          text="Login"
          loading={loading}
          color="blue"
          disabled={loading || (wait !== null && wait > 0)}
        />
      </form>
    </div>
  );
}
