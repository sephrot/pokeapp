using backend.Models;

namespace backend.Repositories;

public interface IPokemonRepository
{
    Task<CachedPokemon?> GetByNameAsync(string name);
    Task SaveAsync(CachedPokemon pokemon);
}
