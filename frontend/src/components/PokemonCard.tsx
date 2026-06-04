import type { Pokemon } from '../types/pokemon';

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const STAT_COLORS: Record<string, string> = {
  hp: '#ef4444',
  attack: '#22c55e',
  defense: '#3b82f6',
  'special-attack': '#f59e0b',
  'special-defense': '#a855f7',
  speed: '#facc15',
};

const MAX_STAT = 255;

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  return (
    <div className="pokemon-card">
      {pokemon.imageUrl && (
        <img
          className="pokemon-image"
          src={pokemon.imageUrl}
          alt={pokemon.name}
        />
      )}
      <div className="pokemon-name-row">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <span className={`cache-badge ${pokemon.fromCache ? 'cache-badge--hit' : 'cache-badge--fresh'}`}>
          {pokemon.fromCache ? 'From cache' : 'Cached'}
        </span>
      </div>

      <div className="info-grid">
        <div className="info-cell">
          <span className="info-label">Weight</span>
          <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="info-cell">
          <span className="info-label">Height</span>
          <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div className="info-cell">
          <span className="info-label">Base XP</span>
          <span className="info-value">{pokemon.baseExperience}</span>
        </div>
      </div>

      {pokemon.stats.length > 0 && (
        <div className="base-stats">
          <h3 className="base-stats-title">Base Stats</h3>
          {pokemon.stats.map((stat) => (
            <div key={stat.name} className="stat-row">
              <span className="stat-row-label">
                {STAT_LABELS[stat.name] ?? stat.name}
              </span>
              <span className="stat-row-value">{stat.value}</span>
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${(stat.value / MAX_STAT) * 100}%`,
                    background: STAT_COLORS[stat.name] ?? 'var(--color-primary)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
