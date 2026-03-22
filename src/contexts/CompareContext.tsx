import React, { createContext, useContext, useState } from 'react';
import { Movie } from '../types';

interface CompareContextType {
  compareList: Movie[];
  addToCompare: (movie: Movie) => void;
  removeFromCompare: (movieId: number) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Movie[]>([]);

  const addToCompare = (movie: Movie) => {
    setCompareList(prev => {
      if (prev.some(m => m.id === movie.id)) return prev;
      if (prev.length >= 2) {
        return [prev[1], movie]; // удаляем первый, добавляем новый
      }
      return [...prev, movie];
    });
  };

  const removeFromCompare = (movieId: number) => {
    setCompareList(prev => prev.filter(m => m.id !== movieId));
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within CompareProvider');
  return context;
};
