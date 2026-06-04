import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import { fetchPokemon } from './services/pokemonApi';
import { extractDominantColor, applyTheme } from './utils/colorExtractor';
import type { Pokemon } from './types/pokemon';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  async function handleSearch(name: string) {
    setLoading(true);
    setError(null);
    setPokemon(null);
    setShowInfo(false);

    try {
      const result = await fetchPokemon(name);
      setPokemon(result);

      if (result.imageUrl) {
        const [r, g, b] = await extractDominantColor(result.imageUrl);
        applyTheme(r, g, b);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="brand-title">
          <span className="brand-fill">Poke</span>
          <span className="brand-outline">Pedia</span>
        </h1>
      </header>

      <div className="boxes">
        <div className="box search-box">
          <p className="search-box-label">Search for any Pokémon</p>
          <SearchBar onSearch={handleSearch} loading={loading} />
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="box result-box">
          {pokemon && (
            <button
              className={`info-btn ${showInfo ? 'info-btn--active' : ''}`}
              onClick={() => setShowInfo(v => !v)}
              aria-label="Toggle Pokédex description"
            >
              i
            </button>
          )}

          {pokemon ? (
            <>
              <PokemonCard pokemon={pokemon} />
              {showInfo && (
                <div className="info-popup">
                  <p className="info-popup-text">{pokemon.description}</p>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">?</span>
              <p>Your Pokémon will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
