"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!userId) {
      setError("Please enter your user ID");
      setIsLoading(false);
      return;
    }

    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum) || userIdNum <= 0) {
      setError("Please enter a valid user ID");
      setIsLoading(false);
      return;
    }

    try {
      await login(userIdNum);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid user ID");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-10">
          <Logo variant="auth" size="lg" href="/" />
        </div>

        <Card className="shadow-2xl border-gray-800 bg-gray-900/95 backdrop-blur-sm border-2">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enter your user ID to access your movie recommendations
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-900/30 border-red-700 text-red-100"
                >
                  <AlertCircle className="h-4 w-4 text-red-300" />
                  <AlertDescription className="text-red-100 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="userId" className="text-gray-200 font-medium">
                  User ID
                </Label>
                <Input
                  id="userId"
                  type="number"
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-600 focus:ring-red-600 focus:bg-gray-800"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg transition-all duration-200 shadow-lg hover:shadow-red-500/50"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
