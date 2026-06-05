namespace backend.Models;

public class PokemonResponse
{
    public string Name { get; set; } = string.Empty;
    public int Weight { get; set; }
    public int Height { get; set; }
    public int BaseExperience { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public List<PokemonStat> Stats { get; set; } = new();
    public string Description { get; set; } = string.Empty;
    public bool FromCache { get; set; }
    public List<string> Types { get; set; } = new();
}

public class PokemonStat
{
    public string Name { get; set; } = string.Empty;
    public int Value { get; set; }
}
