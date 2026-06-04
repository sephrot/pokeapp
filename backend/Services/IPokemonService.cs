using backend.Models;

namespace backend.Services;

public interface IPokemonService
{
    Task<PokemonResponse?> GetPokemonAsync(string name);
}
