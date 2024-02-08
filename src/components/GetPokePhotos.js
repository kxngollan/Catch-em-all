// GetPokePhotos.js
const GetPokePhotos = async (names) => {
  const pokemon = [];
  for (let i = 0; i < names.length; i++) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${names[i].name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon data");
      }
      const data = await response.json();
      const currentPoke = {
        name: data.name,
        image: data.sprites.front_default,
      };
      pokemon.push(currentPoke);
    } catch (error) {
      console.log(error);
    }
  }
  return pokemon;
};

export default GetPokePhotos;
