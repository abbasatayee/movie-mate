export interface Movie {
  movie_id: number;
  title: string;
  genres: string[];
  tags: string[];
  imdb_url: string | null;
  imdb_id: number | null;
  tmdb_id: number | null;
  tmdb_url: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  trailer_url: string | null;
}

export interface Recommendation {
  item_id: number;
  score: number;
  movie: Movie;
}

export interface RecommendationsResponse {
  user_id: number;
  recommendations: Recommendation[];
  k: number;
  message: string;
}

export async function fetchRecommendations(
  userId: number,
  k: number = 20
): Promise<RecommendationsResponse> {
  try {
    // Use Next.js API route as proxy to avoid CORS issues
    const apiUrl = "/api/recommend";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        k: k,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: response.statusText }));
      throw new Error(
        errorData.error || `Failed to fetch recommendations: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the recommendation server. Please ensure the backend server is running on http://localhost:8000."
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching recommendations");
  }
}

export interface TopRatedMovieResponse {
  user_id: number;
  movie: Movie;
  message?: string;
}

export async function fetchTopRatedMovie(
  userId: number
): Promise<TopRatedMovieResponse> {
  try {
    // Use Next.js API route as proxy to avoid CORS issues
    const apiUrl = `/api/top-rated?user_id=${userId}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: response.statusText }));
      throw new Error(
        errorData.error || `Failed to fetch top-rated movie: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the recommendation server. Please ensure the backend server is running on http://localhost:8000."
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching top-rated movie");
  }
}
