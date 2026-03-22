import axios from 'axios';

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
const BASE_URL = import.meta.env.VITE_KINOPOISK_BASE_URL;

export const kinopoiskApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-API-KEY': API_KEY,
  },
});

interface GetMoviesParams {
  page?: number;
  limit?: number;
  genres?: string[];
  rating?: [number, number];
  year?: [number, number];
}

export const getMovies = async (params: GetMoviesParams) => {
  const { page = 1, limit = 50, genres, rating, year } = params;
  const queryParams: Record<string, any> = {
    page,
    limit,
    selectFields: 'id name year rating poster genres description movieLength',
    notNullFields: 'name',
  };

  if (genres?.length) {
    queryParams['genres.name'] = genres.join(',');
  }
  if (rating) {
    queryParams['rating.kp'] = `${rating[0]}-${rating[1]}`;
  }
  if (year) {
    queryParams.year = `${year[0]}-${year[1]}`;
  }

  const response = await kinopoiskApi.get('/movie', { params: queryParams });
  return response.data;
};

export const getMovieById = async (id: number) => {
  const response = await kinopoiskApi.get(`/movie/${id}`);
  return response.data;
};
