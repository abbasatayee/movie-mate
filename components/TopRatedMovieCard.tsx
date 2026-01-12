'use client';

import { type Movie } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Play } from 'lucide-react';
import { MovieDetailsDialog } from './MovieDetailsDialog';
import { useState } from 'react';

interface TopRatedMovieCardProps {
  movie: Movie;
}

export function TopRatedMovieCard({ movie }: TopRatedMovieCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group">
        {/* Backdrop Image */}
        {movie.backdrop_url && (
          <div className="absolute inset-0">
            <img
              src={movie.backdrop_url}
              alt={movie.title}
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>
        )}

        <div className="relative z-10 p-8 md:p-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-4">
              <Badge className="bg-red-600 text-white border-0 px-4 py-1.5 text-sm font-semibold">
                <Star className="h-3.5 w-3.5 mr-1.5 fill-white" />
                Top Rated For You
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
              {movie.title}
            </h2>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
              Discover this highly-rated movie that matches your taste. A perfect
              pick you're likely to enjoy!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setIsDialogOpen(true)}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-red-500/50 transition-all duration-200 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                View Details
              </Button>
              {movie.trailer_url && (
                <Button
                  onClick={() => window.open(movie.trailer_url!, '_blank')}
                  size="lg"
                  variant="outline"
                  className="bg-black/40 backdrop-blur-sm text-white border-white/40 hover:bg-white/20 px-8 py-6 text-lg font-semibold transition-all duration-200 hover:scale-105"
                >
                  Watch Trailer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Dialog */}
      <MovieDetailsDialog
        movie={movie}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
