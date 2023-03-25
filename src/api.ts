import pokemon from '../pokemon.json'
import { Pokemon } from './types';

export const fetchPokemon = () => new Promise<Pokemon[]>(resolve => setTimeout(() => resolve(pokemon), 300));
