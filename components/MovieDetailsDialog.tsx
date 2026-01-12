'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Play, X } from 'lucide-react';
import { type Movie } from '@/lib/api';

interface MovieDetailsDialogProps {
  movie: Movie | null;
  score?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MovieDetailsDialog({
  movie,
  score,
  open,
  onOpenChange,
}: MovieDetailsDialogProps) {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white mb-2">
            {movie.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Movie Details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Backdrop Image */}
          {movie.backdrop_url && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img
                src={movie.backdrop_url}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Poster and Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Poster */}
            {movie.poster_url && (
              <div className="md:col-span-1">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/400x600?text=No+Poster';
                  }}
                />
              </div>
            )}

            {/* Movie Info */}
            <div className="md:col-span-2 space-y-4">
              {/* Score */}
              {score !== undefined && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold text-white">
                    Recommendation Score: {score.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-red-600/20 text-red-400 border-red-600/50"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {movie.tags && movie.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Movie IDs */}
              <div className="space-y-2">
                {movie.movie_id && (
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Movie ID:</span>{' '}
                    {movie.movie_id}
                  </p>
                )}
                {movie.imdb_id && (
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">IMDB ID:</span>{' '}
                    {movie.imdb_id}
                  </p>
                )}
                {movie.tmdb_id && (
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">TMDB ID:</span>{' '}
                    {movie.tmdb_id}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
            {movie.trailer_url && (
              <Button
                onClick={() => window.open(movie.trailer_url!, '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/50 transition-all duration-200 hover:scale-105"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Trailer
              </Button>
            )}
            {movie.imdb_url && (
              <Button
                onClick={() => window.open(movie.imdb_url!, '_blank')}
                className="bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold shadow-lg hover:shadow-yellow-500/50 transition-all duration-200 hover:scale-105 border-0 px-6 py-2.5 flex items-center gap-2.5"
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* IMDb Icon - Film camera/clapperboard style */}
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H6l2 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-1l-2-4h-1z" fill="currentColor" opacity="0.9"/>
                  <circle cx="12" cy="13" r="3" fill="black"/>
                  <path d="M4 8h16v10H4V8z" fill="black" opacity="0.3"/>
                </svg>
                <span className="font-extrabold tracking-tight text-base">IMDb</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-75 flex-shrink-0" />
              </Button>
            )}
            {movie.tmdb_url && (
              <Button
                onClick={() => window.open(movie.tmdb_url!, '_blank')}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold shadow-lg hover:shadow-blue-500/50 transition-all duration-200 hover:scale-105 border-0 px-6 py-2.5 flex items-center gap-2.5"
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* TMDB Icon - Database/Info circle style */}
                  <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 9h6v1.5H9V9zm0 3h6v1.5H9V12zm0 3h4.5v1.5H9V15z" fill="currentColor"/>
                  <circle cx="12" cy="8" r="1" fill="currentColor"/>
                </svg>
                <span className="font-extrabold tracking-tight text-base">TMDB</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-75 flex-shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
