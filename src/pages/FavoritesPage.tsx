import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../contexts/FavoritesContext';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Список избранного пуст
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        Избранные фильмы
      </Typography>
      <Grid container spacing={2}>
        {favorites.map(movie => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
