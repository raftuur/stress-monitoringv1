"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import api from "@/services/api";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      Cookies.set("token", response.data.access_token, {
        expires: 1,
      });

      Cookies.set("role", response.data.role, {
        expires: 1,
      });

      console.log("TOKEN COOKIE:", Cookies.get("token"));

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.detail ??
        "Email atau password salah"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8">

          <h1 className="mb-2 text-center text-3xl font-bold">
            Stress Monitoring
          </h1>

          <p className="mb-8 text-center text-gray-500">
            Login to your account
          </p>

          <div className="space-y-6">

            <div>
              <Label>Email</Label>

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}