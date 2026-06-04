using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class PokemonService : IPokemonService
{
    private readonly IPokemonRepository _repository;
    private readonly HttpClient _httpClient;

    public PokemonService(IPokemonRepository repository, HttpClient httpClient)
    {
        _repository = repository;
        _httpClient = httpClient;
    }

    public async Task<PokemonResponse?> GetPokemonAsync(string name)
    {
        var nameLower = name.ToLower().Trim();

        var cached = await _repository.GetByNameAsync(nameLower);
        if (cached != null)
        {
            return new PokemonResponse
            {
                Name = cached.Name,
                Weight = cached.Weight,
                Height = cached.Height,
                BaseExperience = cached.BaseExperience
            };
        }

        var response = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{nameLower}");
        if (!response.IsSuccessStatusCode)
            return null;

        var apiPokemon = await response.Content.ReadFromJsonAsync<PokeApiPokemon>();
        if (apiPokemon == null)
            return null;

        await _repository.SaveAsync(new CachedPokemon
        {
            Name = apiPokemon.Name,
            Weight = apiPokemon.Weight,
            Height = apiPokemon.Height,
            BaseExperience = apiPokemon.BaseExperience,
            CachedAt = DateTime.UtcNow
        });

        return new PokemonResponse
        {
            Name = apiPokemon.Name,
            Weight = apiPokemon.Weight,
            Height = apiPokemon.Height,
            BaseExperience = apiPokemon.BaseExperience
        };
    }
}
