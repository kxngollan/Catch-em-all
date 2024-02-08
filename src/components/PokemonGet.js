// PokemonGet.js
const PokemonGet = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
    );
    const data = await response.json();
    const results = data.results;
    const pokemonNames = results.map((result) => ({
      name: result.name,
    }));
    return pokemonNames;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Pokemon names");
  }
};

export default PokemonGet;
