"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Star, Sparkles, Film, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Check localStorage directly for immediate redirect
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-lg text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 container mx-auto px-4 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          <Logo variant="homepage" size="md" href="/" />
          <Link href="/login">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 shadow-lg transition-all duration-200">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 lg:px-12 pt-20 pb-32">
          <div className="max-w-6xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-600/30 mb-8">
                <Sparkles className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">AI-Powered Recommendations</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
                Discover Your Next
                <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  Favorite Movie
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Get personalized movie recommendations powered by advanced AI. 
                Find films you'll love based on your unique taste and preferences.
              </p>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-7 font-bold shadow-xl hover:shadow-red-500/50 transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href="/login">
                    <Play className="mr-2 h-5 w-5" />
                    Start Watching
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-900 text-lg px-10 py-7 font-semibold transition-all duration-200 hover:scale-105"
                  asChild
                >
                  <Link href="/login">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <div className="group p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Star className="h-7 w-7 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Top Rated
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Discover highly-rated movies that match your preferences and are likely to become your favorites.
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Personalized
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced recommendation algorithms tailor suggestions specifically to your viewing history and taste.
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Film className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Curated Collection
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Explore a carefully curated selection of movies organized by genre, rating, and your preferences.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              <div className="text-center p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                <div className="text-4xl font-black text-red-600 mb-2">30+</div>
                <div className="text-sm text-gray-400">Recommendations</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                <div className="text-4xl font-black text-red-600 mb-2">AI</div>
                <div className="text-sm text-gray-400">Powered</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                <div className="text-4xl font-black text-red-600 mb-2">100%</div>
                <div className="text-sm text-gray-400">Personalized</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                <div className="text-4xl font-black text-red-600 mb-2">∞</div>
                <div className="text-sm text-gray-400">Discoveries</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MovieMate. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sign In
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
