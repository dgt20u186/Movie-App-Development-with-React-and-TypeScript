import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Box } from '@mui/material';
import { useCompare } from '../contexts/CompareContext';

export const ComparePanel: React.FC = () => {
  const { compareList, clearCompare, removeFromCompare } = useCompare();

  if (compareList.length === 0) {
    return null;
  }

  const movie1 = compareList[0];
  const movie2 = compareList[1];

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Сравнение фильмов</Typography>
        <Button onClick={clearCompare} size="small" color="error">
          Очистить
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Название</TableCell>
              <TableCell>{movie1.name}</TableCell>
              {movie2 && <TableCell>{movie2.name}</TableCell>}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Год</TableCell>
              <TableCell>{movie1.year}</TableCell>
              {movie2 && <TableCell>{movie2.year}</TableCell>}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Рейтинг</TableCell>
              <TableCell>{movie1.rating?.kp ?? 'Н/Д'}</TableCell>
              {movie2 && <TableCell>{movie2.rating?.kp ?? 'Н/Д'}</TableCell>}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Жанры</TableCell>
              <TableCell>{movie1.genres?.map(g => g.name).join(', ') || '—'}</TableCell>
              {movie2 && <TableCell>{movie2.genres?.map(g => g.name).join(', ') || '—'}</TableCell>}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Длительность</TableCell>
              <TableCell>{movie1.movieLength ? `${movie1.movieLength} мин` : '—'}</TableCell>
              {movie2 && <TableCell>{movie2.movieLength ? `${movie2.movieLength} мин` : '—'}</TableCell>}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
        <Button size="small" onClick={() => removeFromCompare(movie1.id)}>Убрать первый</Button>
        {movie2 && <Button size="small" onClick={() => removeFromCompare(movie2.id)}>Убрать второй</Button>}
      </Box>
    </Paper>
  );
};
