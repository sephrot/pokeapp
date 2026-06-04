using System.Text.Json.Serialization;

namespace backend.Models;

public class PokeApiSpecies
{
    [JsonPropertyName("flavor_text_entries")]
    public List<PokeApiFlavorText>? FlavorTextEntries { get; set; }
}

public class PokeApiFlavorText
{
    [JsonPropertyName("flavor_text")]
    public string FlavorText { get; set; } = string.Empty;

    [JsonPropertyName("language")]
    public PokeApiLanguage? Language { get; set; }
}

public class PokeApiLanguage
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}
