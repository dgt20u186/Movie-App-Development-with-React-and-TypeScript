export interface Movie {
  id: number;
  name: string;
  alternativeName?: string;
  year: number;
  rating: {
    kp: number;
    imdb?: number;
  };
  poster?: {
    url: string;
    previewUrl?: string;
  };
  description?: string;
  genres: Genre[];
  movieLength?: number;
}

export interface Genre {
  name: string;
}

export interface MoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Filters {
  genres: string[];
  rating: [number, number];
  year: [number, number];
}
