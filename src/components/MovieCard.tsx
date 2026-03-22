import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Box } from '@mui/material';
import { Movie } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCompare } from '../contexts/CompareContext';
import { ConfirmModal } from './ConfirmModal';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCompare, compareList } = useCompare();
  const [modalOpen, setModalOpen] = useState(false);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      setModalOpen(true);
    }
  };

  const handleConfirmFavorite = () => {
    addToFavorites(movie);
    setModalOpen(false);
  };

  const isCompared = compareList.some(m => m.id === movie.id);

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="300"
          image={movie.poster?.url || 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" noWrap>
            {movie.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Год: {movie.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Рейтинг: {movie.rating?.kp ?? 'Н/Д'}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {movie.genres?.slice(0, 3).map(genre => (
              <Chip key={genre.name} label={genre.name} size="small" />
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/movie/${movie.id}`} size="small">
            Подробнее
          </Button>
          <Button size="small" onClick={handleFavoriteClick} color={isFavorite(movie.id) ? 'secondary' : 'primary'}>
            {isFavorite(movie.id) ? 'В избранном' : 'В избранное'}
          </Button>
          <Button
            size="small"
            onClick={() => addToCompare(movie)}
            disabled={isCompared}
            color={isCompared ? 'success' : 'primary'}
          >
            {isCompared ? 'В сравнении' : 'Сравнить'}
          </Button>
        </CardActions>
      </Card>
      <ConfirmModal
        open={modalOpen}
        title="Добавление в избранное"
        message={`Вы уверены, что хотите добавить фильм "${movie.name}" в избранное?`}
        onConfirm={handleConfirmFavorite}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};
