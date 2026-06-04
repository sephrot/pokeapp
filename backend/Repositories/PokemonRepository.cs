using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class PokemonRepository : IPokemonRepository
{
    private readonly AppDbContext _context;

    public PokemonRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CachedPokemon?> GetByNameAsync(string name)
    {
        return await _context.CachedPokemons
            .FirstOrDefaultAsync(p => p.Name == name.ToLower());
    }

    public async Task SaveAsync(CachedPokemon pokemon)
    {
        _context.CachedPokemons.Add(pokemon);
        await _context.SaveChangesAsync();
    }
}
