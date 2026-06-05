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

    [JsonPropertyName("sprites")]
    public PokeApiSprites? Sprites { get; set; }

    [JsonPropertyName("stats")]
    public List<PokeApiStat>? Stats { get; set; }

    [JsonPropertyName("types")]
    public List<PokeApiType>? Types { get; set; }
}

public class PokeApiType
{
    [JsonPropertyName("type")]
    public PokeApiTypeName? Type { get; set; }
}

public class PokeApiTypeName
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}

public class PokeApiSprites
{
    [JsonPropertyName("front_default")]
    public string? FrontDefault { get; set; }

    [JsonPropertyName("other")]
    public PokeApiSpritesOther? Other { get; set; }
}

public class PokeApiSpritesOther
{
    [JsonPropertyName("official-artwork")]
    public PokeApiOfficialArtwork? OfficialArtwork { get; set; }
}

public class PokeApiOfficialArtwork
{
    [JsonPropertyName("front_default")]
    public string? FrontDefault { get; set; }
}

public class PokeApiStat
{
    [JsonPropertyName("base_stat")]
    public int BaseStat { get; set; }

    [JsonPropertyName("stat")]
    public PokeApiStatName? Stat { get; set; }
}

public class PokeApiStatName
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}
