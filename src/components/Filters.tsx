import React from 'react';
import { Paper, Typography, Slider, Box, Chip, Autocomplete, TextField } from '@mui/material';
import { Filters as FiltersType } from '../types';

// Список жанров можно получить из API, но для простоты зададим статически
const availableGenres = [
  'драма', 'комедия', 'боевик', 'триллер', 'фантастика', 'мелодрама', 'приключения', 'ужасы',
];

interface FiltersProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onChange }) => {
  const handleGenresChange = (_: any, newValue: string[]) => {
    onChange({ ...filters, genres: newValue });
  };

  const handleRatingChange = (_: Event, newValue: number | number[]) => {
    onChange({ ...filters, rating: newValue as [number, number] });
  };

  const handleYearChange = (_: Event, newValue: number | number[]) => {
    onChange({ ...filters, year: newValue as [number, number] });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Жанры</Typography>
        <Autocomplete
          multiple
          options={availableGenres}
          value={filters.genres}
          onChange={handleGenresChange}
          renderInput={params => <TextField {...params} variant="outlined" placeholder="Выберите жанры" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
          }
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Рейтинг Кинопоиска: {filters.rating[0]} – {filters.rating[1]}</Typography>
        <Slider
          value={filters.rating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.5}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Год выпуска: {filters.year[0]} – {filters.year[1]}</Typography>
        <Slider
          value={filters.year}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={1990}
          max={new Date().getFullYear()}
          step={1}
        />
      </Box>
    </Paper>
  );
};
