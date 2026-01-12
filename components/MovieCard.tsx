'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { type Movie } from '@/lib/api';

interface MovieCardProps {
  id?: string;
  title: string;
  genre?: string;
  genres?: string[];
  rating?: number;
  score?: number;
  posterUrl?: string;
  poster_url?: string | null;
  movie_id?: number;
  movie?: Movie;
  onCardClick?: () => void;
}

export function MovieCard({ 
  id, 
  title, 
  genre, 
  genres, 
  rating, 
  score,
  posterUrl, 
  poster_url,
  movie_id,
  movie,
  onCardClick
}: MovieCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Format rating as views (YouTube style)
  const formatViews = (rating: number) => {
    const views = Math.floor(rating * 1000000);
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const displayGenre = genre || (genres && genres.length > 0 ? genres.join(', ') : 'Movie');
  const displayRating = rating || (score ? score.toFixed(1) : 'N/A');
  const displayPoster = posterUrl || poster_url || 'https://via.placeholder.com/400x600?text=No+Poster';
  const displayId = id || (movie_id ? movie_id.toString() : '');

  return (
    <div 
      className="group w-full cursor-pointer transform transition-all duration-200 hover:scale-[1.02]"
      onClick={onCardClick}
    >
      {/* Thumbnail - YouTube style 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800 mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-200">
        <img
          src={displayPoster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=No+Poster';
          }}
        />
        
        {/* Score badge (YouTube style) */}
        {score && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {score.toFixed(1)}
          </div>
        )}

        {/* Hover overlay with play button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Video Info - YouTube style */}
      <div className="flex gap-3">
        {/* Channel/Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
            {title.charAt(0)}
          </div>
        </div>

        {/* Title and metadata */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white line-clamp-2 mb-1 group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-300 mb-1">{displayGenre}</p>
          {rating && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="text-gray-300">{formatViews(rating)}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">2 days ago</span>
            </div>
          )}
          {score && !rating && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="text-gray-300">Score: {score.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Menu button (YouTube style) */}
        <div className="relative flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreVertical className="h-5 w-5 text-gray-300 hover:text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
