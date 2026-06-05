export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  baseExperience: number;
  imageUrl: string;
  stats: PokemonStat[];
  description: string;
  fromCache: boolean;
  types: string[];
}
