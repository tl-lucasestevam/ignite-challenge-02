import React, { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieProviderProps {
  children: ReactNode
}

interface MovieContext {
  selectedGenreId: number;
  genres: GenreResponseProps[];
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  handleClickButton: (id: number) => void;
}

export const MoviesContext = createContext<MovieContext>({} as MovieContext)

export function MoviesContextProvider({children}: MovieProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider value={{genres, movies, selectedGenre, handleClickButton, selectedGenreId}}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const content = useContext(MoviesContext);
  return content
}