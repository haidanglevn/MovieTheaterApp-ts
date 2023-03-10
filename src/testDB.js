const axios = require('axios');
const seatMapArray = require('./seatMap.json')
const movieObject = {
  adult: false,
  backdrop_path: "/dOGgJb7eDW623UzeBaSjPwq5EJO.jpg",
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 18,
      name: "Drama",
    },
  ],
  homepage: "",
  id: 840789,
  imdb_id: "tt12390388",
  original_language: "es",
  original_title: "Matadero",
  overview:
    "An American filmmaker arrives in the Argentinian pampa to film Matadero: a founding narrative of class struggle where a group of laborers slaughter their bosses like cattle. It is 1974, the violent persecution of the left has just begun in Argentina, and the young actors in the film are on the verge of taking a leap into full time clandestine militancy.",
  popularity: 537.034,
  poster_path: "/8YHXvW1GWEcXAZXXSHfTsaGi4i2.jpg",
  production_companies: [
    {
      id: 54807,
      logo_path: null,
      name: "El Viaje Films",
      origin_country: "ES",
    },
    {
      id: 58747,
      logo_path: null,
      name: "4 à 4 Productions",
      origin_country: "",
    },
    {
      id: 155911,
      logo_path: null,
      name: "Prisma Cine",
      origin_country: "",
    },
    {
      id: 63474,
      logo_path: null,
      name: "Magoya Films",
      origin_country: "",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "AR",
      name: "Argentina",
    },
    {
      iso_3166_1: "ES",
      name: "Spain",
    },
    {
      iso_3166_1: "FR",
      name: "France",
    },
  ],
  release_date: "2022-12-09",
  revenue: 0,
  runtime: 106,
  spoken_languages: [
    {
      english_name: "Spanish",
      iso_639_1: "es",
      name: "Español",
    },
  ],
  status: "Released",
  tagline: "",
  title: "Matadero",
  video: false,
  vote_average: 3,
  vote_count: 1,
};
const database = {
  movie: [],
};
array.push(movieObject);
array[0].ticket = seatMapArray;
console.log(array)