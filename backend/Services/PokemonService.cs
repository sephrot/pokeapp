using System.Text.Json;
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
                BaseExperience = cached.BaseExperience,
                ImageUrl = cached.ImageUrl,
                Stats = JsonSerializer.Deserialize<List<PokemonStat>>(cached.StatsJson) ?? new(),
                Description = cached.Description,
                FromCache = true
            };
        }

        try
        {
            var response = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{nameLower}");
            if (!response.IsSuccessStatusCode)
                return null;

            var apiPokemon = await response.Content.ReadFromJsonAsync<PokeApiPokemon>();
            if (apiPokemon == null)
                return null;

            // søkte på tall (f.eks "4") men API returnerer faktisk navn ("charmander")
            // sjekk om det faktiske navnet allerede er cachet
            if (apiPokemon.Name != nameLower)
            {
                var cachedByRealName = await _repository.GetByNameAsync(apiPokemon.Name);
                if (cachedByRealName != null)
                {
                    return new PokemonResponse
                    {
                        Name = cachedByRealName.Name,
                        Weight = cachedByRealName.Weight,
                        Height = cachedByRealName.Height,
                        BaseExperience = cachedByRealName.BaseExperience,
                        ImageUrl = cachedByRealName.ImageUrl,
                        Stats = JsonSerializer.Deserialize<List<PokemonStat>>(cachedByRealName.StatsJson) ?? new(),
                        Description = cachedByRealName.Description,
                        FromCache = true
                    };
                }
            }

            var imageUrl = apiPokemon.Sprites?.Other?.OfficialArtwork?.FrontDefault
                        ?? apiPokemon.Sprites?.FrontDefault
                        ?? string.Empty;

            var stats = apiPokemon.Stats?.Select(s => new PokemonStat
            {
                Name = s.Stat?.Name ?? string.Empty,
                Value = s.BaseStat
            }).ToList() ?? new();

            var description = string.Empty;
            try
            {
                var speciesResponse = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon-species/{nameLower}");
                if (speciesResponse.IsSuccessStatusCode)
                {
                    var species = await speciesResponse.Content.ReadFromJsonAsync<PokeApiSpecies>();
                    description = species?.FlavorTextEntries?
                        .FirstOrDefault(f => f.Language?.Name == "en")?.FlavorText
                        .Replace("\f", " ").Replace("\n", " ").Replace("\r", " ") ?? string.Empty;
                }
            }
            catch
            {
                // description forblir tom hvis species-kallet feiler
            }

            await _repository.SaveAsync(new CachedPokemon
            {
                Name = apiPokemon.Name,
                Weight = apiPokemon.Weight,
                Height = apiPokemon.Height,
                BaseExperience = apiPokemon.BaseExperience,
                ImageUrl = imageUrl,
                StatsJson = JsonSerializer.Serialize(stats),
                Description = description,
                CachedAt = DateTime.UtcNow
            });

            return new PokemonResponse
            {
                Name = apiPokemon.Name,
                Weight = apiPokemon.Weight,
                Height = apiPokemon.Height,
                BaseExperience = apiPokemon.BaseExperience,
                ImageUrl = imageUrl,
                Stats = stats,
                Description = description,
                FromCache = false
            };
        }
        catch (TaskCanceledException)
        {
            throw new Exception("PokéAPI svarte ikke i tide. Prøv igjen.");
        }
        catch (HttpRequestException)
        {
            throw new Exception("Kunne ikke nå PokéAPI. Sjekk internettilkoblingen.");
        }
    }
}
