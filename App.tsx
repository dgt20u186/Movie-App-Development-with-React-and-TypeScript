import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CompareProvider } from './contexts/CompareContext';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <CompareProvider>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">Главная</Button>
              <Button color="inherit" component={Link} to="/favorites">Избранное</Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ mt: 2 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Container>
        </CompareProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
