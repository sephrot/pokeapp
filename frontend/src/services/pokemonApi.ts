import type { Pokemon } from '../types/pokemon';

const API_BASE = 'http://localhost:5081/api';

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`${API_BASE}/pokemon/${name.trim().toLowerCase()}`);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? 'Something went wrong. Please try again.');
  }

  return response.json();
}
