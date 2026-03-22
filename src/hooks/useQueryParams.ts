import { useSearchParams } from 'react-router-dom';
import { Filters } from '../types';

const DEFAULT_FILTERS: Filters = {
  genres: [],
  rating: [0, 10],
  year: [1990, new Date().getFullYear()],
};

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilters = (): Filters => {
    const genres = searchParams.get('genres')?.split(',') || DEFAULT_FILTERS.genres;
    const ratingMin = Number(searchParams.get('ratingMin')) || DEFAULT_FILTERS.rating[0];
    const ratingMax = Number(searchParams.get('ratingMax')) || DEFAULT_FILTERS.rating[1];
    const yearMin = Number(searchParams.get('yearMin')) || DEFAULT_FILTERS.year[0];
    const yearMax = Number(searchParams.get('yearMax')) || DEFAULT_FILTERS.year[1];

    return {
      genres,
      rating: [ratingMin, ratingMax],
      year: [yearMin, yearMax],
    };
  };

  const setFilters = (filters: Filters) => {
    const params: Record<string, string> = {};
    if (filters.genres.length) params.genres = filters.genres.join(',');
    if (filters.rating[0] !== DEFAULT_FILTERS.rating[0]) params.ratingMin = String(filters.rating[0]);
    if (filters.rating[1] !== DEFAULT_FILTERS.rating[1]) params.ratingMax = String(filters.rating[1]);
    if (filters.year[0] !== DEFAULT_FILTERS.year[0]) params.yearMin = String(filters.year[0]);
    if (filters.year[1] !== DEFAULT_FILTERS.year[1]) params.yearMax = String(filters.year[1]);
    setSearchParams(params);
  };

  return { getFilters, setFilters };
};
