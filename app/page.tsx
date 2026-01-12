"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <nav className="absolute top-0 left-0 right-0 z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo variant="homepage" size="md" href="/" />
          <div className="flex items-center gap-4">
            <Link href="/login" passHref legacyBehavior>
              <a>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  Sign in
                </Button>
              </a>
            </Link>
            <Link href="/signup" passHref legacyBehavior>
              <a>
                <Button className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                  Get Started
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-20 flex-1 flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight">
              Discover Movies You'll
              <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
                Love
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Get personalized movie recommendations based on your taste. Save
              your favorites and never run out of great movies to watch.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 shadow-2xl"
              asChild
            >
              <Link href="/signup">
                Start Watching
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray border-white/30 hover:bg-white/10 text-lg px-8 py-6"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Star className="h-8 w-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Curated Picks
              </h3>
              <p className="text-purple-100">
                Handpicked recommendations based on ratings and reviews
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Personalized
              </h3>
              <p className="text-purple-100">
                Movies tailored to your unique preferences and tastes
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Trending Now
              </h3>
              <p className="text-purple-100">
                Stay updated with the latest and most popular movies
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 container mx-auto px-4 py-8 mt-auto">
        <p className="text-center text-purple-200">
          © {new Date().getFullYear()} MovieMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
