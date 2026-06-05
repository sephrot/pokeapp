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

### Start frontend

```bash
cd frontend
npm install
npm run dev
```

Åpne `http://localhost:5173` i nettleseren.

---

## Antakelser

- Søk fungerer både på navn og ID — PokéAPI støtter begge på samme endepunkt
- Cache lagres permanent uten utløpstid, da Pokémon-data er statisk og ikke endrer seg
- Første tilgjengelige engelske Pokédex-beskrivelse brukes

---

## Hva jeg ville lagt til med mer tid

- **Sammenlign to Pokémon** — vise stats side ved side for å sammenligne to Pokémon mot hverandre
- **Evolusjonsrekke** — hente og vise hele evolusjonsrekken, f.eks. Charmander → Charmeleon → Charizard
- **Søkehistorikk** — liste over tidligere søk i UI-et

