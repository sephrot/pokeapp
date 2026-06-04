namespace backend.Models;

public class PokemonResponse
{
    public string Name { get; set; } = string.Empty;
    public int Weight { get; set; }
    public int Height { get; set; }
    public int BaseExperience { get; set; }
}
