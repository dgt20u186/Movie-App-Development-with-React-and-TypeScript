import { useState, useEffect, useCallback } from 'react';
import { getMovies } from '../api/kinopoisk';
import { Movie, Filters } from '../types';

export const useMovies = (filters: Filters) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const currentPage = reset ? 1 : page;
      const response = await getMovies({
        page: currentPage,
        limit: 50,
        genres: filters.genres,
        rating: filters.rating,
        year: filters.year,
      });
      const newMovies = response.docs;
      if (reset) {
        setMovies(newMovies);
        setPage(2);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
        setPage(prev => prev + 1);
      }
      setHasMore(response.page < response.pages);
    } catch (err) {
      setError('Ошибка загрузки фильмов');
    } finally {
      setLoading(false);
    }
  }, [filters, page, loading]);

  // Сброс при изменении фильтров
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(true);
  }, [filters]);

  return { movies, hasMore, loading, error, fetchMore: () => fetchMovies() };
};
