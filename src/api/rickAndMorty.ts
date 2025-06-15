import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
}

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const fetchCharacters = async (page: number): Promise<CharacterResponse> => {
  const res = await api.get(`/character?page=${page}`);
  return res.data;
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const res = await api.get(`/character/${id}`);
  return res.data;
};
