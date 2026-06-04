import { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Weight</span>
          <span className="stat-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="stat">
          <span className="stat-label">Height</span>
          <span className="stat-value">{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div className="stat">
          <span className="stat-label">Base XP</span>
          <span className="stat-value">{pokemon.baseExperience}</span>
        </div>
      </div>
    </div>
  );
}
