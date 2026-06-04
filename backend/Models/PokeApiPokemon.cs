using System.Text.Json.Serialization;

namespace backend.Models;

public class PokeApiPokemon
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("weight")]
    public int Weight { get; set; }

    [JsonPropertyName("height")]
    public int Height { get; set; }

    [JsonPropertyName("base_experience")]
    public int BaseExperience { get; set; }
}
