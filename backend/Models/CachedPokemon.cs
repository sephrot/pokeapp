namespace backend.Models;

public class CachedPokemon
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Weight { get; set; }
    public int Height { get; set; }
    public int BaseExperience { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string StatsJson { get; set; } = "[]";
    public string TypesJson { get; set; } = "[]";
    public string Description { get; set; } = string.Empty;
    public DateTime CachedAt { get; set; }
}
