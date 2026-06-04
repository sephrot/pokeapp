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
        if (string.IsNullOrWhiteSpace(name) || name.Length > 100)
            return BadRequest(new { message = "Invalid Pokémon name." });

        try
        {
            var pokemon = await _service.GetPokemonAsync(name);
            if (pokemon == null)
                return NotFound(new { message = $"Pokemon '{name}' not found." });

            return Ok(pokemon);
        }
        catch (Exception ex)
        {
            return StatusCode(503, new { message = ex.Message });
        }
    }
}
