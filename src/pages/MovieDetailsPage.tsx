import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Chip, Button, Box, CircularProgress } from '@mui/material';
import { getMovieById } from '../api/kinopoisk';
import { Movie } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCompare } from '../contexts/CompareContext';
import { ConfirmModal } from '../components/ConfirmModal';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCompare, compareList } = useCompare();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch (err) {
        setError('Не удалось загрузить фильм');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (movie) {
      if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id);
      } else {
        setModalOpen(true);
      }
    }
  };

  const handleConfirmFavorite = () => {
    if (movie) {
      addToFavorites(movie);
      setModalOpen(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container>
        <Typography color="error">{error || 'Фильм не найден'}</Typography>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </Container>
    );
  }

  const isCompared = compareList.some(m => m.id === movie.id);

  return (
    <Container>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Назад
      </Button>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={movie.poster?.url || 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.name}
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {movie.name}
              {movie.alternativeName && <Typography variant="subtitle1">({movie.alternativeName})</Typography>}
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.description || 'Описание отсутствует'}
            </Typography>
            <Typography variant="body2">Год: {movie.year}</Typography>
            <Typography variant="body2">Рейтинг Кинопоиска: {movie.rating?.kp ?? 'Н/Д'}</Typography>
            <Typography variant="body2">Дата выхода: {movie.year} (полная дата не указана в API)</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {movie.genres?.map(genre => (
                <Chip key={genre.name} label={genre.name} />
              ))}
            </Box>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleFavoriteClick}>
                {isFavorite(movie.id) ? 'Удалить из избранного' : 'В избранное'}
              </Button>
              <Button variant="outlined" onClick={() => addToCompare(movie)} disabled={isCompared}>
                {isCompared ? 'В сравнении' : 'Сравнить'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <ConfirmModal
        open={modalOpen}
        title="Добавление в избранное"
        message={`Вы уверены, что хотите добавить фильм "${movie.name}" в избранное?`}
        onConfirm={handleConfirmFavorite}
        onCancel={() => setModalOpen(false)}
      />
    </Container>
  );
};
