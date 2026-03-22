import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { Filters } from '../components/Filters';
import { MovieList } from '../components/MovieList';
import { ComparePanel } from '../components/ComparePanel';
import { useMovies } from '../hooks/useMovies';
import { useQueryParams } from '../hooks/useQueryParams';
import { Filters as FiltersType } from '../types';

export const HomePage: React.FC = () => {
  const { getFilters, setFilters } = useQueryParams();
  const [filters, setFiltersState] = useState<FiltersType>(getFilters());
  const { movies, hasMore, loading, error, fetchMore } = useMovies(filters);

  // Синхронизация фильтров с URL
  useEffect(() => {
    setFilters(filters);
  }, [filters]);

  // При изменении фильтров в URL (например, при переходе по прямой ссылке)
  useEffect(() => {
    setFiltersState(getFilters());
  }, [window.location.search]);

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFiltersState(newFilters);
  };

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Filters filters={filters} onChange={handleFiltersChange} />
        <MovieList movies={movies} hasMore={hasMore} loading={loading} error={error} onLoadMore={fetchMore} />
        <ComparePanel />
      </Box>
    </Container>
  );
};
