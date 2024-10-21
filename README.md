# Käymäni avoimen yliopiston Fullstack Open kurssin tehtävien palautuksia

Kurssilla tutustutaan JavaScriptilla tapahtuvaan moderniin websovelluskehitykseen ja otetaan haltuun React, Redux, Node.js, MongoDB, GraphQL ja TypeScript. Pääpaino on React-kirjaston avulla toteutettavissa single page -sovelluksissa, ja niitä tukevissa Node.js:llä toteutetuissa REST-rajapinnoissa.

OSA 1:

- Reactin perusteet

OSA 2:

Frontendissä:

- Palvelimen kanssa kommunikointi
- Moduulit
- Lomakkeiden käsittely

Pienet esittelytekstit ja kuvat lisätty näihin:

- 2.6-2.15 (Phonebook) (Julkaistu Fly.io:n kautta osoitteessa https://express-wispy-wind-7618.fly.dev/)
- 2.16-2.20 (Eri maiden tietojen hakua ja niiden säätiedot kahden eri REST API:n avulla)

OSA 3:

Backendissä:

- Node.js ja Express
- Sovellus internetiin
- Tietojen tallentaminen MongoDB-tietokantaan
- Validointi ja ESlint

Oma repo tälle: https://github.com/janikasavela/Fullstack-kurssin-Backend

Avoimen yliopiston Fullstack Open kurssilla tehty backend Node express-teknologialla toteutettuna. Frontend on React + Vite. Tietokantana toimii MongoDB.

Julkaistu sovellus: https://express-wispy-wind-7618.fly.dev/

Requests: GET https://express-wispy-wind-7618.fly.dev/api/persons DELETE https://express-wispy-wind-7618.fly.dev/api/persons/:id POST https://express-wispy-wind-7618.fly.dev/api/persons Content-Type: application/json

{ "name": "new name", "number": "040-1234556" }

OSA 4:

Node express ympäristöön:

- Backendin yksikkö- ja integraatiotestaus
- Backendin logiikka käyttäjienhallintaan ja kirjautumiseen
- Token-perustainen kirjautuminen

OSA 5:

- Kirjautuminen frontendissä
- React-sovellusten testaaminen
- props.children ja proptypet

OSA 6:

- Flux-arkkitehtuuri ja Redux
- Redux-sovelluksen kommunikointi palvelimen kanssa
- React Query, useReducer ja context
