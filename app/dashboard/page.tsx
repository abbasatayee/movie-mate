"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchRecommendations, type Recommendation } from "@/lib/api";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Recommendation[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && (user.userId || user.id)) {
      const userId = user.userId || user.id;
      setIsLoadingRecommendations(true);
      setError(null);
      fetchRecommendations(userId, 20)
        .then((data) => {
          setRecommendations(data.recommendations);
          setFilteredMovies(data.recommendations);
        })
        .catch((err) => {
          setError(err.message || "Failed to load recommendations");
          console.error("Error fetching recommendations:", err);
        })
        .finally(() => {
          setIsLoadingRecommendations(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = recommendations.filter(
        (rec) =>
          rec.movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.movie.genres.some((g) =>
            g.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(recommendations);
    }
  }, [searchQuery, recommendations]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-lg text-white">Loading...</div>
      </div>
    );
  }

  // Don't return early - show skeleton in the main layout

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Group movies by genre for Netflix-style rows
  const moviesByGenre =
    recommendations.length > 0
      ? recommendations.reduce((acc, rec) => {
          const genres =
            rec.movie.genres.length > 0 ? rec.movie.genres : ["Other"];
          genres.forEach((genre) => {
            if (!acc[genre]) {
              acc[genre] = [];
            }
            acc[genre].push(rec);
          });
          return acc;
        }, {} as Record<string, Recommendation[]>)
      : {};

  const genreRows = Object.entries(moviesByGenre);
  const featuredMovie = recommendations[0];

  const scroll = (direction: "left" | "right", container: HTMLDivElement) => {
    const scrollAmount = 1200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Movie Row Component
  const MovieRow = ({
    genre,
    movies,
  }: {
    genre: string;
    movies: Recommendation[];
  }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    return (
      <div className="relative group mb-12">
        <div className="container mx-auto px-4 lg:px-12 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {genre}
          </h2>
        </div>
        <div className="relative">
          <div
            ref={rowRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-4 lg:px-12 scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies.map((rec) => (
              <div
                key={rec.item_id}
                className="flex-shrink-0 w-[320px] md:w-[360px]"
              >
                <MovieCard
                  title={rec.movie.title}
                  genres={rec.movie.genres}
                  score={rec.score}
                  poster_url={rec.movie.poster_url}
                  movie_id={rec.movie.movie_id}
                />
              </div>
            ))}
          </div>
          {/* Scroll Buttons */}
          <button
            onClick={() => rowRef.current && scroll("left", rowRef.current)}
            className="absolute left-0 top-0 bottom-2 w-20 bg-gradient-to-r from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-start pl-4 z-10 hover:bg-gradient-to-r hover:from-black hover:via-black/90"
          >
            <ChevronLeft className="h-10 w-10 text-white drop-shadow-lg" />
          </button>
          <button
            onClick={() => rowRef.current && scroll("right", rowRef.current)}
            className="absolute right-0 top-0 bottom-2 w-20 bg-gradient-to-l from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-end pr-4 z-10 hover:bg-gradient-to-l hover:from-black hover:via-black/90"
          >
            <ChevronRight className="h-10 w-10 text-white drop-shadow-lg" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black shadow-lg"
            : "bg-gradient-to-b from-black via-black/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Logo
                variant="dashboard"
                size="md"
                href="/dashboard"
                className="cursor-pointer"
              />
              <nav className="hidden lg:flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="text-white font-medium hover:text-gray-200 transition-colors"
                >
                  Home
                </Link>
                <button className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  TV Shows
                </button>
                <button className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Movies
                </button>
                <button className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  New & Popular
                </button>
                <button className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  My List
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
                <Input
                  type="text"
                  placeholder="Titles, people, genres"
                  className="pl-10 bg-black/70 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:bg-black/90 w-64 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-md border-2 border-red-600 hover:border-red-500 transition-colors p-0"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarFallback className="bg-red-600 text-white font-semibold">
                        {user?.userId ? user.userId.toString().charAt(0) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-gray-900 border-gray-800"
                >
                  <DropdownMenuLabel className="text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        User ID: {user?.userId || "N/A"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-white hover:bg-gray-800 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-0">
        {/* Hero Section - Featured Movie */}
        {isLoadingRecommendations ? (
          <div className="relative h-[85vh] min-h-[700px] flex items-end overflow-hidden bg-gray-900">
            <div className="relative z-10 container mx-auto px-4 lg:px-12 pb-20 w-full">
              <div className="max-w-3xl space-y-6">
                <Skeleton className="h-24 w-3/4 bg-gray-800 rounded" />
                <div className="flex items-center gap-6 flex-wrap">
                  <Skeleton className="h-10 w-24 bg-gray-800 rounded-full" />
                  <Skeleton className="h-10 w-32 bg-gray-800 rounded-full" />
                  <Skeleton className="h-10 w-32 bg-gray-800 rounded-full" />
                </div>
                <Skeleton className="h-6 w-full bg-gray-800 rounded" />
                <Skeleton className="h-6 w-4/5 bg-gray-800 rounded" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-32 bg-gray-800 rounded-md" />
                  <Skeleton className="h-14 w-32 bg-gray-800 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ) : featuredMovie ? (
          <div className="relative h-[85vh] min-h-[700px] flex items-end overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] ease-out"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.2) 100%), url(${
                  featuredMovie.movie.backdrop_url ||
                  featuredMovie.movie.poster_url ||
                  ""
                })`,
              }}
            />
            {/* Additional gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

            <div className="relative z-10 container mx-auto px-4 lg:px-12 pb-20 w-full">
              <div className="max-w-3xl">
                <h1 className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl leading-tight tracking-tight">
                  {featuredMovie.movie.title}
                </h1>
                <div className="flex items-center gap-6 mb-8 flex-wrap">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-white">
                      {featuredMovie.score.toFixed(1)}
                    </span>
                  </div>
                  {featuredMovie.movie.genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="bg-white/20 text-white border-0 backdrop-blur-sm px-4 py-2 text-sm font-semibold"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed max-w-2xl">
                  Experience the ultimate cinematic journey with this
                  recommended movie. A story that will captivate you from start
                  to finish.
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 text-lg px-10 py-7 gap-3 font-semibold rounded-md shadow-2xl hover:scale-105 transition-transform"
                  >
                    <Play className="h-7 w-7 fill-black" />
                    Play
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-black/40 backdrop-blur-sm text-white border-white/40 hover:bg-white/20 text-lg px-10 py-7 font-semibold rounded-md hover:scale-105 transition-transform"
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Movie Rows */}
        <div className="relative -mt-40 z-20 pb-20">
          {isLoadingRecommendations ? (
            <div className="pt-32 space-y-2">
              {/* Show skeleton rows for loading */}
              {[1, 2, 3].map((rowIndex) => (
                <div key={rowIndex} className="relative group mb-12">
                  <div className="container mx-auto px-4 lg:px-12 mb-6">
                    <Skeleton className="h-8 w-48 bg-gray-800 rounded" />
                  </div>
                  <div className="relative">
                    <div className="flex gap-5 overflow-x-auto scrollbar-hide px-4 lg:px-12 scroll-smooth pb-2">
                      {[1, 2, 3, 4, 5, 6].map((cardIndex) => (
                        <div
                          key={cardIndex}
                          className="flex-shrink-0 w-[320px] md:w-[360px]"
                        >
                          <MovieCardSkeleton />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="container mx-auto px-4 lg:px-12 pt-32">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Search Results
              </h2>
              {filteredMovies.length === 0 ? (
                <div className="text-center py-20">
                  <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-300 text-xl">
                    No movies found matching "{searchQuery}"
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredMovies.map((rec) => (
                    <MovieCard
                      key={rec.item_id}
                      title={rec.movie.title}
                      genres={rec.movie.genres}
                      score={rec.score}
                      poster_url={rec.movie.poster_url}
                      movie_id={rec.movie.movie_id}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="pt-32 space-y-2">
              {genreRows.map(([genre, movies]) => (
                <MovieRow key={genre} genre={genre} movies={movies} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
