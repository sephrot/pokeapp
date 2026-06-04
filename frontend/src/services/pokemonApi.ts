import { Pokemon } from '../types/pokemon';

const API_BASE = 'http://localhost:5081/api';

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`${API_BASE}/pokemon/${name.trim().toLowerCase()}`);

  if (response.status === 404) {
    throw new Error(`Pokemon "${name}" not found.`);
  }

  if (!response.ok) {
    throw new Error('Something went wrong. Please try again.');
  }

  return response.json();
}
