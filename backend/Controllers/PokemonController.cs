using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PokemonController : ControllerBase
{
    private readonly IPokemonService _service;

    public PokemonController(IPokemonService service)
    {
        _service = service;
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> GetPokemon(string name)
    {
        var pokemon = await _service.GetPokemonAsync(name);
        if (pokemon == null)
            return NotFound(new { message = $"Pokemon '{name}' not found." });

        return Ok(pokemon);
    }
}
