# PokePedia

En fullstack webapplikasjon for å søke opp Pokémon-data fra [PokéAPI](https://pokeapi.co/).

---

## Tech stack

| Lag | Teknologi |
|---|---|
| Frontend | React 19 + TypeScript (Vite) |
| Backend | .NET 8 Web API (C#) |
| Database | SQLite via Entity Framework Core |

---

## Kom i gang

### Forutsetninger

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)

### Start backend

```bash
cd backend
dotnet run
```

API kjører på `http://localhost:5081`  
Swagger UI: `http://localhost:5081/swagger`

### Start frontend

```bash
cd frontend
npm install
npm run dev
```

Åpne `http://localhost:5173` i nettleseren.

---

## Funksjonalitet

**Minimumskrav**
- Søk på Pokémon-navn (pikachu, charizard, bulbasaur osv.)
- Viser navn, vekt, høyde og base experience
- Feilmelding hvis Pokémon ikke finnes

**Bonus**
- Server-side caching i SQLite — samme Pokémon hentes kun én gang fra PokéAPI
- Badge ved Pokémon-navnet viser om data kom fra cache eller ble hentet fra API
- Base stats (HP, Attack, Defense m.fl.) hentet fra `/pokemon/{name}`
- Pokédex-beskrivelse hentet fra `/pokemon-species/{name}`
- Dynamisk fargetema basert på Pokémon-bildet

---

## Antakelser

- **Vekt og høyde**: PokéAPI returnerer vekt i hektogram og høyde i desimeter. Disse konverteres til kg og meter ved visning.
- **Cache utløper ikke**: Pokémon som er cachet lagres permanent. En TTL (utløpstid) ville vært naturlig i et produksjonssystem.
- **Første engelske beskrivelse brukes**: Species-endepunktet returnerer mange Pokédex-tekster på tvers av spillversjoner. Jeg bruker den første engelske.
- **CORS er åpen**: Tillater alle origins — akseptabelt lokalt, ville vært låst ned i produksjon.
- **SQLite er tilstrekkelig**: Perfekt for lokal kjøring. I produksjon ville jeg byttet til PostgreSQL eller SQL Server.

---

## Hva jeg ville forbedret med mer tid

- **Cache-utløp (TTL)**: Forkaste oppføringer eldre enn f.eks. 24 timer
- **EF Core migrations**: Istedenfor `EnsureCreated()`, for tryggere håndtering av skjemaendringer
- **Enhetstester**: Spesielt for `PokemonService` med mockede avhengigheter
- **Pokémon-typer**: Vise type-badges (fire, water osv.) med tilhørende farger
- **Evolusjonsrekke**: Hente og vise evolusjonsrekken via `/evolution-chain`
- **Søkehistorikk**: Liste over tidligere søk i UI-et
- **Docker Compose**: Én kommando for å starte hele applikasjonen
- **Miljøvariabler**: API-URL og connection string som konfigurasjon fremfor hardkodet
