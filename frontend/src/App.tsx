import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import { fetchPokemon } from './services/pokemonApi';
import { Pokemon } from './types/pokemon';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(name: string) {
    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const result = await fetchPokemon(name);
      setPokemon(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Search for a Pokémon by name</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {pokemon && <PokemonCard pokemon={pokemon} />}
      </main>
    </div>
  );
}

export default App;
